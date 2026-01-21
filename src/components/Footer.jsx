import React from 'react';
import { Github, Heart, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-gray-500 text-sm font-medium">
          © {new Date().getFullYear()} EESVO. All rights reserved.
        </div>
        
        <div className="flex items-center gap-6">
          <a 
            href="#" 
            className="text-gray-400 hover:text-blue-400 transition-all transform hover:scale-110"
            aria-label="Twitter"
          >
            <Twitter size={20} />
          </a>
          <a 
            href="https://github.com/arya182-ui/EESVO" 
            className="text-gray-400 hover:text-gray-900 transition-all transform hover:scale-110"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
          <span>Made with</span>
          <Heart size={16} className="fill-red-500 text-red-500 animate-pulse" />
          <span>for engineers</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
