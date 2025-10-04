"use client";

import { Mail, MessageSquare, Github, Twitter } from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Thanks for reaching out! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Get In{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Other ways to reach us</h3>
              <div className="space-y-4">
                <a href="mailto:support@contentrix.app" className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-purple-50 transition-colors group">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Email Us</div>
                    <div className="text-gray-600">support@contentrix.app</div>
                  </div>
                </a>

                <a href="https://github.com/Soumyajit2005" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-purple-50 transition-colors group">
                  <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Github className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold">GitHub</div>
                    <div className="text-gray-600">Follow our development</div>
                  </div>
                </a>

                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-purple-50 transition-colors group">
                  <div className="w-12 h-12 rounded-lg bg-blue-400 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Twitter className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Twitter</div>
                    <div className="text-gray-600">@contentrix</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Live Chat</div>
                    <div className="text-gray-600">Coming soon</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
              <h4 className="text-2xl font-bold mb-4">Quick Response Time</h4>
              <p className="mb-4">We typically respond to all inquiries within 24 hours during business days.</p>
              <p className="text-purple-100">Monday - Friday: 9AM - 6PM EST</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
