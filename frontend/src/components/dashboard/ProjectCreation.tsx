"use client";

import { useState, useCallback } from "react";
import { 
  Upload, 
  FileText, 
  Link, 
  Image, 
  Video, 
  File,
  X,
  Sparkles,
  ArrowRight,
  AlertCircle
} from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";
import type { ProjectCreationForm, ContentFile } from "@/types";
import api from "@/lib/api";

interface ProjectCreationProps {
  onProjectCreated: (projectId: string) => void;
  onCancel: () => void;
}

const ProjectCreation = ({ onProjectCreated, onCancel }: ProjectCreationProps) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ProjectCreationForm>({
    name: "",
    contentType: "text",
    smartDetect: true
  });
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);

  // File upload handling
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);
    toast.success(`${selectedFiles.length} file(s) added`);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleContentTypeChange = (type: 'text' | 'url' | 'file') => {
    setForm(prev => ({ 
      ...prev, 
      contentType: type,
      content: type !== 'text' ? undefined : prev.content,
      url: type !== 'url' ? undefined : prev.url
    }));
  };

  const analyzeContent = async () => {
    setLoading(true);
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('contentType', form.contentType);
      formData.append('smartDetect', form.smartDetect.toString());
      
      if (form.content) formData.append('content', form.content);
      if (form.url) formData.append('url', form.url);
      
      // Add files
      files.forEach(file => {
        formData.append('files', file);
      });

      const response = await api.post('/projects', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setAnalysisResults(response.data);
      toast.success("Project created successfully!");
      onProjectCreated(response.data.id);
    } catch (error) {
      console.error('Create project error:', error);
      toast.error("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    if (!form.name.trim()) return false;
    
    switch (form.contentType) {
      case 'text':
        return !!form.content?.trim();
      case 'url':
        return !!form.url?.trim();
      case 'file':
        return files.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Create New Project
            </h2>
            <p className="text-sm text-gray-600">
              Upload content and let AI suggest the best platforms
            </p>
          </div>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Project Name */}
        <Input
          label="Project Name"
          value={form.name}
          onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
          placeholder="My awesome content project"
          required
        />

        {/* Content Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How would you like to add content?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { type: 'text', icon: <FileText className="h-6 w-6" />, label: 'Write/Paste Text' },
              { type: 'url', icon: <Link className="h-6 w-6" />, label: 'From URL' },
              { type: 'file', icon: <Upload className="h-6 w-6" />, label: 'Upload Files' }
            ].map(({ type, icon, label }) => (
              <button
                key={type}
                type="button"
                onClick={() => handleContentTypeChange(type as any)}
                className={`p-6 border-2 rounded-lg text-center transition-all ${
                  form.contentType === type
                    ? 'border-brand-500 bg-brand-50 text-brand-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  {icon}
                  <span className="font-medium">{label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content Input Based on Type */}
        {form.contentType === 'text' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Content
            </label>
            <textarea
              value={form.content || ''}
              onChange={(e) => setForm(prev => ({ ...prev, content: e.target.value }))}
              className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
              placeholder="Paste your blog post, article, or any content here..."
            />
          </div>
        )}

        {form.contentType === 'url' && (
          <Input
            label="Content URL"
            type="url"
            value={form.url || ''}
            onChange={(e) => setForm(prev => ({ ...prev, url: e.target.value }))}
            placeholder="https://example.com/your-content"
          />
        )}

        {form.contentType === 'file' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Files
            </label>
            
            {/* File Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                Choose files to upload
              </p>
              <p className="text-gray-500 mb-4">Documents, images, videos supported</p>
              <input
                type="file"
                multiple
                accept=".txt,.md,.pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp,.mp4,.mov,.avi"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button as="span" variant="outline">
                  Choose Files
                </Button>
              </label>
            </div>

            {/* Uploaded Files */}
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-gray-900">Uploaded Files</h4>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <File className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="p-1 text-gray-400 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Smart Detection Toggle */}
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Smart Platform Detection</h4>
            <p className="text-sm text-gray-600">
              Let AI recommend the best platforms for your content
            </p>
          </div>
          <button
            type="button"
            onClick={() => setForm(prev => ({ ...prev, smartDetect: !prev.smartDetect }))}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              form.smartDetect ? 'bg-brand-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                form.smartDetect ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button onClick={onCancel} variant="outline" className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={analyzeContent}
            loading={loading}
            disabled={!canProceed()}
            className="flex-1 flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Create Project
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCreation;