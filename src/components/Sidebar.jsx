import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Sparkles, Search, X } from 'lucide-react';
import { categories } from '../data/categories';

const Sidebar = ({ isOpen, onClose, activeCategory, onCategorySelect, disable }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelect = (category) => {
    if (disable) return;
    onCategorySelect(category);
    if (isMobile) onClose();
  };

  const filteredCategories = categories.filter(category => 
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-sm transform transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1) shadow-2xl md:shadow-none overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static border-r border-gray-200 ${disable ? 'pointer-events-none opacity-50' : ''}`}
      >
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Browse Categories
            </h2>
          </div>

          <div className="relative mb-6 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              className="block w-full pl-10 pr-8 py-2.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 sm:text-sm transition-all duration-200"
              placeholder="Find a category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            {!searchTerm && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <kbd className="hidden md:inline-flex items-center h-5 px-1.5 text-[10px] font-medium text-gray-400 bg-white border border-gray-200 rounded shadow-sm font-sans">
                  Ctrl K
                </kbd>
              </div>
            )}
          </div>

          <nav className="space-y-1">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
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
            ))
            ) : (
              <div className="text-center py-8 px-4">
                <p className="text-sm text-gray-500">No categories found matching "{searchTerm}"</p>
              </div>
            )}
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
