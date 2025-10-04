"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Contentrix
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Transform your content for every platform with AI-powered optimization.
            </p>
            <div className="flex gap-3">
              <a href="https://github.com/Soumyajit2005" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:support@contentrix.app" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><button onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-purple-400 transition-colors">Features</button></li>
              <li><button onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-purple-400 transition-colors">How It Works</button></li>
              <li><Link href="/auth" className="hover:text-purple-400 transition-colors">Get Started</Link></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><button onClick={() => document.getElementById("help")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-purple-400 transition-colors">Help Center</button></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Tutorials</a></li>
              <li><a href="https://github.com/Soumyajit2005/Repurpose-pie" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">GitHub</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-purple-400 transition-colors">Contact</button></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} Contentrix. All rights reserved.
            </p>
            <p className="text-sm text-gray-400">
              Made with ❤️ by{" "}
              <a href="https://github.com/Soumyajit2005" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">
                Soumyajit
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
