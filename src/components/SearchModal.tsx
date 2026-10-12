import React, { useState } from 'react';
import { Search, X, Sparkles, Home, Building2, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  projects,
  onSelectProject,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const popularSearches = [
    'Japandi Living Room',
    'Modern Villa Infinity Pool',
    'Minimalist Kitchen Island',
    'Spa Bathroom Walk-in',
    'Parametric Facade',
  ];

  const matchedProjects = query.trim()
    ? projects.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.style.toLowerCase().includes(query.toLowerCase()) ||
          p.prompt.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl bg-[#08122c] border border-blue-500/30 p-5 shadow-2xl text-white">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 pb-3 border-b border-white/10">
          <Search className="w-5 h-5 text-sky-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search styles, spaces, colors, materials..."
            autoFocus
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-hidden"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results or Quick Suggestions */}
        <div className="mt-4">
          {query.trim() === '' ? (
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2 tracking-wider">
                Trending Design Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-200 border border-white/5 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-sky-400" />
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2 tracking-wider">
                Matching Projects ({matchedProjects.length})
              </span>
              {matchedProjects.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">
                  No matching designs found for "{query}".
                </p>
              ) : (
                <div className="flex flex-col gap-2 max-h-60 overflow-y-auto no-scrollbar">
                  {matchedProjects.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectProject(p);
                        onClose();
                      }}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-between text-left cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={p.thumbnail}
                          alt={p.title}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <div className="text-xs font-semibold text-white">{p.title}</div>
                          <div className="text-[10px] text-slate-400">{p.style} · {p.timeAgo}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
