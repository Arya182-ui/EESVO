import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { resources } from './data/resources';

import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Search, X, ArrowUp } from 'lucide-react';

function App() {
  const [activeCategory, setActiveCategory] = useState('Everything in one place');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'Everything in one place' || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = document.getElementById('main-content');
      if (scrollContainer.scrollTop > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    const scrollContainer = document.getElementById('main-content');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }
    return () => scrollContainer?.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const scrollContainer = document.getElementById('main-content');
    scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50 space-y-4">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="text-gray-500 font-medium">Loading resources...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          activeCategory={activeCategory}
          onCategorySelect={(category) => {
            setActiveCategory(category);
            setSearchQuery('');
            scrollToTop();
          }}
          disable={false}
        />
        <main id="main-content" className={`flex-1 overflow-y-auto w-full relative scroll-smooth ${isSidebarOpen ? '' : ''}`}>
          <div className="min-h-full flex flex-col">
            <div className="p-4 md:p-8 flex-1">
              <div className="max-w-7xl mx-auto">
                <div className="mb-8 p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-xl text-white relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                   <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
                   
                   <div className="relative z-10">
                     <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                       {activeCategory}
                     </h1>
                     <div className="relative max-w-xl">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-100" size={20} />
                       <input 
                          type="text" 
                          placeholder="Search resources..." 
                          className="w-full pl-12 pr-12 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all font-medium text-lg"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                       />
                       {searchQuery && (
                         <button 
                           onClick={() => setSearchQuery('')}
                           className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-100 hover:text-white transition-colors"
                         >
                           <X size={18} />
                         </button>
                       )}
                     </div>
                     <p className="mt-4 text-blue-100 text-sm md:text-base opacity-90">
                       {filteredResources.length} resources found
                     </p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                    {filteredResources.map((resource, index) => (
                      <motion.div
                        key={`${resource.title}-${index}`}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group flex flex-col h-full"
                      >
                        <div className="p-6 flex flex-col flex-1 relative">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full -mr-8 -mt-8 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                          
                          <div className="flex items-start justify-between mb-4 relative z-10">
                            <span 
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveCategory(resource.category);
                                setSearchQuery('');
                                scrollToTop();
                              }}
                              className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wide cursor-pointer hover:bg-blue-100 transition-colors"
                            >
                              {resource.category}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {resource.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-6 line-clamp-3 text-sm flex-1 leading-relaxed">
                            {resource.description}
                          </p>
                          
                          <a 
                            href={resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="mt-auto flex items-center justify-center gap-2 w-full py-3 bg-gray-50 text-gray-700 font-medium rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 group/btn"
                          >
                            <span>Visit Resource</span>
                            <ExternalLink size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {filteredResources.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                      <Search size={40} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No resources found</h3>
                    <p className="text-gray-500 max-w-sm">
                      We couldn't find matches for "{searchQuery}" in {activeCategory}. 
                      Try adjusting your search or switching categories.
                    </p>
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        setActiveCategory('Everything in one place');
                      }}
                      className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
            <Footer />
          </div>
          
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50 focus:outline-none focus:ring-4 focus:ring-blue-300"
                aria-label="Scroll to top"
              >
                <ArrowUp size={24} />
              </motion.button>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;
