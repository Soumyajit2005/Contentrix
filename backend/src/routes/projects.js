const express = require('express');
const multer = require('multer');
const { authenticateUser } = require('../middleware/auth');
const { 
  createProject,
  generateContent,
  getProject,
  getUserProjects,
  updateGeneratedContent,
  approveContent
} = require('../services/contentService');

const router = express.Router();

// Configure multer for file uploads (memory storage for Supabase)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
    files: 10
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'text/plain',
      'text/markdown',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'video/mp4',
      'video/mov',
      'video/avi'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  }
});

// Create a new project
router.post('/', authenticateUser, upload.array('files', 10), async (req, res) => {
  try {
    const userId = req.user.id;
    const projectData = {
      name: req.body.name,
      contentType: req.body.contentType,
      content: req.body.content,
      url: req.body.url,
      smartDetect: req.body.smartDetect === 'true',
      files: req.files || []
    };

    if (!projectData.name?.trim()) {
      return res.status(400).json({ error: 'Project name is required' });
    }

    const result = await createProject(projectData, userId);
    res.json(result);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Get user's projects
router.get('/', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      page = 1,
      limit = 10,
      status = 'all',
      search = ''
    } = req.query;

    const filters = {
      status: status !== 'all' ? status : undefined,
      search: search.trim() || undefined
    };

    const result = await getUserProjects(
      userId,
      parseInt(page),
      parseInt(limit),
      filters
    );

    res.json(result);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get a specific project
router.get('/:id', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const projectId = req.params.id;

    const project = await getProject(projectId, userId);
    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Generate content for selected platforms
router.post('/:id/generate', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const projectId = req.params.id;
    const { platforms } = req.body;

    if (!platforms || !Array.isArray(platforms) || platforms.length === 0) {
      return res.status(400).json({ error: 'Platforms array is required' });
    }

    const result = await generateContent(projectId, platforms, userId);
    res.json(result);
  } catch (error) {
    console.error('Generate content error:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

// Update generated content
router.put('/content/:id', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const contentId = req.params.id;
    const { title, content, hashtags } = req.body;

    const updates = {};
    if (title !== undefined) updates.title = title;
    if (content !== undefined) updates.content = content;
    if (hashtags !== undefined) updates.hashtags = hashtags;

    const result = await updateGeneratedContent(contentId, updates, userId);
    res.json(result);
  } catch (error) {
    console.error('Update content error:', error);
    res.status(500).json({ error: 'Failed to update content' });
  }
});

// Approve/unapprove content
router.post('/content/:id/approve', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const contentId = req.params.id;
    const { approved } = req.body;

    if (typeof approved !== 'boolean') {
      return res.status(400).json({ error: 'Approved must be a boolean' });
    }

    const result = await approveContent(contentId, approved, userId);
    res.json(result);
  } catch (error) {
    console.error('Approve content error:', error);
    res.status(500).json({ error: 'Failed to update approval status' });
  }
});

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 100MB.' });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'Too many files. Maximum is 10 files.' });
    }
  }
  
  if (error.message === 'Unsupported file type') {
    return res.status(400).json({ error: 'Unsupported file type.' });
  }
  
  next(error);
});

module.exports = router;