
import React, { useState, useEffect } from 'react';
import { blogPosts } from '../data';
import { BlogPost } from '../types';
import { Calendar, ChevronRight, X, User } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

/**
 * Componente Blog
 * Muestra una lista de artículos y permite abrirlos en un modal.
 */
const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Manejar tecla Escape y bloqueo de scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPost(null);
      }
    };

    if (selectedPost) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedPost]);

  return (
    <section id="blog" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <ScrollReveal width="100%">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Blog Personal</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500">
              Compartiendo mis aprendizajes y experiencias en el mundo de la tecnología.
            </p>
          </div>
        </ScrollReveal>

        {/* Grid de Artículos */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <ScrollReveal key={post.id} width="100%" delay={index * 100}>
              <article 
                className="flex flex-col h-full bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition-all duration-300 cursor-pointer group focus-within:ring-4 focus-within:ring-primary-300"
                onClick={() => setSelectedPost(post)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedPost(post);
                  }
                }}
                aria-label={`Leer artículo: ${post.title}`}
              >
                {/* Imagen del Post */}
                <div className="h-48 overflow-hidden relative">
                   <img 
                     src={post.image} 
                     alt="" 
                     className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                   />
                   <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary-600 shadow-sm">
                      {post.tags[0]}
                   </div>
                </div>

                {/* Contenido Card */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center text-sm text-slate-400 mb-3">
                    <Calendar size={14} className="mr-2" aria-hidden="true" />
                    {post.date}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-1">
                    {post.summary}
                  </p>
                  
                  <div className="mt-auto flex items-center text-primary-600 font-medium text-sm group-hover:underline">
                    Leer artículo completo <ChevronRight size={16} className="ml-1" aria-hidden="true" />
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* ============================================================
          MODAL DE LECTURA DE BLOG
      ============================================================ */}
      {selectedPost && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-modal-title"
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col animate-in zoom-in-95 duration-200">
            
            {/* Header Imagen */}
            <div className="relative h-64 w-full flex-shrink-0">
               <img 
                 src={selectedPost.image} 
                 alt="" 
                 className="w-full h-full object-cover"
               />
               <button 
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Cerrar artículo"
                >
                  <X size={20} />
                </button>
            </div>

            {/* Contenido Artículo */}
            <div className="p-8">
              <div className="flex items-center gap-4 text-sm text-slate-500 mb-6 border-b border-slate-100 pb-4">
                <span className="flex items-center"><Calendar size={16} className="mr-2 text-primary-500" aria-hidden="true"/> {selectedPost.date}</span>
                <span className="flex items-center"><User size={16} className="mr-2 text-primary-500" aria-hidden="true"/> Leonardo Glez.</span>
              </div>

              <h2 id="blog-modal-title" className="text-3xl font-bold text-slate-900 mb-6">{selectedPost.title}</h2>
              
              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed whitespace-pre-line">
                {selectedPost.content}
              </div>

              {/* Tags Footer */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-2">
                 {selectedPost.tags.map(tag => (
                   <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium">
                     #{tag}
                   </span>
                 ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;
