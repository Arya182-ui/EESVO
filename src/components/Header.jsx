import React from 'react';
import { Menu, Github } from 'lucide-react';
import logo from '../../assets/logo.jpeg';

const Header = ({ onMenuClick }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 h-16 transition-all duration-300">
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
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm hover:shadow group"
          >
            <Github size={18} className="group-hover:text-black transition-colors" />
            <span className="hidden sm:inline">Star on GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
