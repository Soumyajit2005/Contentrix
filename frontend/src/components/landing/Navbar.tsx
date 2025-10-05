"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

interface NavbarProps {
  onNavigate: (section: string) => void;
}

const Navbar = ({ onNavigate }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: "Features", id: "features" },
    { name: "How It Works", id: "how-it-works" },
    { name: "Contact", id: "contact" },
    { name: "Help", id: "help" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-all duration-500 ${
        theme === "dark"
          ? "bg-gray-950/90 border-gray-800/30"
          : "bg-white/90 border-gray-200/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => onNavigate("hero")}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div
                className={`w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg transition-shadow duration-500 ${
                  theme === "dark"
                    ? "shadow-purple-500/30"
                    : "shadow-purple-500/20"
                }`}
              >
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Contentrix
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`font-medium transition-colors duration-300 cursor-pointer ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-purple-400"
                    : "text-gray-700 hover:text-purple-600"
                }`}
              >
                {item.name}
              </button>
            ))}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-500 cursor-pointer ${
                theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700 text-yellow-400"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
              aria-label="Toggle theme"
            >
              <div className="relative w-6 h-6">
                <Sun
                  className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${
                    theme === "dark"
                      ? "rotate-90 scale-0 opacity-0"
                      : "rotate-0 scale-100 opacity-100"
                  }`}
                />
                <Moon
                  className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${
                    theme === "dark"
                      ? "rotate-0 scale-100 opacity-100"
                      : "-rotate-90 scale-0 opacity-0"
                  }`}
                />
              </div>
            </button>

            <Link
              href="/auth"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105 cursor-pointer"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-500 cursor-pointer ${
                theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700 text-yellow-400"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
              aria-label="Toggle theme"
            >
              <div className="relative w-5 h-5">
                <Sun
                  className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
                    theme === "dark"
                      ? "rotate-90 scale-0 opacity-0"
                      : "rotate-0 scale-100 opacity-100"
                  }`}
                />
                <Moon
                  className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
                    theme === "dark"
                      ? "rotate-0 scale-100 opacity-100"
                      : "-rotate-90 scale-0 opacity-0"
                  }`}
                />
              </div>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 transition-colors duration-300 cursor-pointer ${
                theme === "dark"
                  ? "text-gray-300 hover:text-purple-400"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div
            className={`md:hidden py-4 border-t transition-colors duration-300 ${
              theme === "dark" ? "border-gray-800" : "border-gray-200"
            }`}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 transition-colors rounded-lg cursor-pointer ${
                  theme === "dark"
                    ? "text-gray-300 hover:bg-gray-800 hover:text-purple-400"
                    : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                }`}
              >
                {item.name}
              </button>
            ))}
            <Link
              href="/auth"
              className="block w-full text-center mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
