"use client";

import { Mail, MessageSquare } from "lucide-react";
import { SiInstagram, SiLinkedin, SiFacebook, SiWhatsapp } from "react-icons/si";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const ContactSection = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Thanks for reaching out! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
      theme === "dark" ? "bg-gray-950" : "bg-white"
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-4 transition-colors duration-500 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            Get In{" "}
            <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
              theme === "dark"
                ? "from-purple-400 to-blue-400"
                : "from-purple-600 to-blue-600"
            }`}>
              Touch
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-500 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Contact Form */}
          <div className={`rounded-2xl p-8 transition-colors duration-500 h-full flex flex-col ${
            theme === "dark"
              ? "bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700"
              : "bg-gradient-to-br from-purple-50 to-blue-50"
          }`}>
            <h3 className={`text-2xl font-bold mb-6 transition-colors duration-500 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">
              <div>
                <label className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-600 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                      : "bg-white border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  }`}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-600 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                      : "bg-white border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  }`}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-600 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                      : "bg-white border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  }`}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <label className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>Message</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border outline-none transition-all resize-none flex-1 min-h-[120px] ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-600 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                      : "bg-white border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  }`}
                  placeholder="Tell us how we can help..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-xl hover:shadow-purple-500/50 transition-all mt-auto cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 flex flex-col">
            <div>
              <h3 className={`text-2xl font-bold mb-6 transition-colors duration-500 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>Other ways to reach us</h3>
              <div className="space-y-4">
                <a href="mailto:soumyajitparia02@gmail.com" className={`flex items-center gap-4 p-4 rounded-xl transition-all group ${
                  theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-700 border border-gray-700"
                    : "bg-gray-50 hover:bg-purple-50"
                }`}>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform ${
                    theme === "dark"
                      ? "bg-purple-900/50 text-purple-400 border border-purple-500/30"
                      : "bg-purple-100 text-purple-600"
                  }`}>
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <div className={`font-semibold transition-colors duration-500 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>Email Us</div>
                    <div className={`transition-colors duration-500 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>soumyajitparia02@gmail.com</div>
                  </div>
                </a>

                <a href="https://www.instagram.com/soumya.sp_" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-4 p-4 rounded-xl transition-all group ${
                  theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-700 border border-gray-700"
                    : "bg-gray-50 hover:bg-purple-50"
                }`}>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <SiInstagram className="h-6 w-6" />
                  </div>
                  <div>
                    <div className={`font-semibold transition-colors duration-500 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>Instagram</div>
                    <div className={`transition-colors duration-500 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>@soumya.sp_</div>
                  </div>
                </a>

                <a href="https://www.linkedin.com/in/soumyajit-paria-785b60229" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-4 p-4 rounded-xl transition-all group ${
                  theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-700 border border-gray-700"
                    : "bg-gray-50 hover:bg-purple-50"
                }`}>
                  <div className="w-12 h-12 rounded-lg bg-[#0A66C2] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <SiLinkedin className="h-6 w-6" />
                  </div>
                  <div>
                    <div className={`font-semibold transition-colors duration-500 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>LinkedIn</div>
                    <div className={`transition-colors duration-500 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>Connect with me</div>
                  </div>
                </a>

                <a href="https://www.facebook.com/soumyajit.paria.71" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-4 p-4 rounded-xl transition-all group ${
                  theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-700 border border-gray-700"
                    : "bg-gray-50 hover:bg-purple-50"
                }`}>
                  <div className="w-12 h-12 rounded-lg bg-[#1877F2] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <SiFacebook className="h-6 w-6" />
                  </div>
                  <div>
                    <div className={`font-semibold transition-colors duration-500 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>Facebook</div>
                    <div className={`transition-colors duration-500 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>Follow us</div>
                  </div>
                </a>

                <a href="https://wa.me/919062435655" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-4 p-4 rounded-xl transition-all group ${
                  theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-700 border border-gray-700"
                    : "bg-gray-50 hover:bg-purple-50"
                }`}>
                  <div className="w-12 h-12 rounded-lg bg-[#25D366] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <SiWhatsapp className="h-6 w-6" />
                  </div>
                  <div>
                    <div className={`font-semibold transition-colors duration-500 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>WhatsApp</div>
                    <div className={`transition-colors duration-500 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>Chat with me</div>
                  </div>
                </a>

                <div className={`flex items-center gap-4 p-4 rounded-xl ${
                  theme === "dark"
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-gray-50"
                }`}>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    theme === "dark"
                      ? "bg-green-900/50 text-green-400 border border-green-500/30"
                      : "bg-green-100 text-green-600"
                  }`}>
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <div className={`font-semibold transition-colors duration-500 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>Live Chat</div>
                    <div className={`transition-colors duration-500 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>Coming soon</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Response Time - Full Width */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white shadow-lg shadow-purple-500/30">
          <h4 className="text-2xl font-bold mb-4">Quick Response Time</h4>
          <p className="mb-4">We typically respond to all inquiries within 24 hours during business days.</p>
          <p className={`${theme === "dark" ? "text-purple-200" : "text-purple-100"}`}>Monday - Friday: 9AM - 6PM EST</p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
