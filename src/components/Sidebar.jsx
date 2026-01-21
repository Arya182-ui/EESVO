import React, { useState, useEffect } from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { categories } from '../data/categories';

const Sidebar = ({ isOpen, onClose, activeCategory, onCategorySelect, disable }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelect = (category) => {
    if (disable) return;
    onCategorySelect(category);
    if (isMobile) onClose();
  };

  return (
    <>
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-sm transform transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1) shadow-2xl md:shadow-none overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static border-r border-gray-200 ${disable ? 'pointer-events-none opacity-50' : ''}`}
      >
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Browse Categories
            </h2>
          </div>
          <nav className="space-y-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleSelect(category)}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group relative overflow-hidden hover:shadow-sm ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm ring-1 ring-blue-100'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } ${disable ? 'pointer-events-none opacity-50' : ''}`}
                disabled={disable}
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full transition-opacity duration-200 ${activeCategory === category ? 'opacity-100' : 'opacity-0'}`} />
                <span className="relative z-10">{category}</span>
                {activeCategory === category && (
                  <ChevronRight size={16} className="text-blue-600 relative z-10" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </aside>
      {/* Overlay */}
      {isMobile && isOpen && (
        <div 
          className={`fixed inset-0 bg-gray-900/10 backdrop-blur-sm z-40 transition-opacity ${disable ? 'pointer-events-none' : ''}`}
          onClick={disable ? undefined : onClose}
        />
      )}
    </>
  );
};

export default Sidebar;
