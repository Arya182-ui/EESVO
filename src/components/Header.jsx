import React from 'react';
import { Menu } from 'lucide-react';
import logo from '../../assets/logo.jpeg';

const Header = ({ onMenuClick }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 h-16 transition-all duration-300">
      <div className="flex items-center justify-between px-4 h-full container mx-auto">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="p-2 -ml-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-blue-600 md:hidden transition-colors"
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center gap-3 select-none cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={logo} alt="EESVO Logo" className="h-12 w-auto rounded-lg shadow-sm" />
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
      </div>
    </header>
  );
};

export default Header;
