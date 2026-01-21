import React, { useState, useEffect } from 'react';
import { Menu, Github } from 'lucide-react';
import logo from '../../assets/logo.jpeg';

const Header = ({ onMenuClick }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress(totalScroll / windowHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-gray-200/80 sticky top-0 z-40 h-16 transition-all duration-300 supports-[backdrop-filter]:bg-white/60">
      <div className="flex items-center justify-between px-4 h-full container mx-auto max-w-7xl">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="p-2 -ml-2 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-blue-600 md:hidden transition-all active:scale-95"
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center gap-3 select-none cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={logo} alt="EESVO Logo" className="h-10 w-auto rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight hidden sm:block leading-none">
                Every Engineer Should Visit Once
              </span>
              <span className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight sm:hidden leading-none">
                EESVO
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/arya182-ui/EESVO"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-full hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
          >
            <Github size={18} className="text-white/90 group-hover:text-white transition-colors" />
            <span className="hidden sm:inline">Star on GitHub</span>
          </a>
        </div>
      </div>
      
      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-all duration-150 z-50" style={{ width: `${scrollProgress * 100}%` }} />
    </header>
  );
};

export default Header;
