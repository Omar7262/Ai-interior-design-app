import React, { useState } from 'react';
import {
  Home as HomeIcon,
  Plus,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Flame,
  Heart,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { EXTERIOR_DESIGNS } from '../data/mockData';

interface ExteriorDesignScreenProps {
  onNewDesign: () => void;
  onOpenExteriorStudio: () => void;
  favoritesMap?: Record<string, boolean>;
  onToggleFavorite?: (item: any) => void;
}

export const ExteriorDesignScreen: React.FC<ExteriorDesignScreenProps> = ({
  onNewDesign,
  onOpenExteriorStudio,
  favoritesMap = {},
  onToggleFavorite,
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { label: 'All', count: '12' },
    { label: 'Modern', count: '5' },
    { label: 'Classic', count: '3' },
    { label: 'Minimalist', count: '2' },
  ];

  const toggleHeart = (ext: any, e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(ext);
  };

  const filteredDesigns = EXTERIOR_DESIGNS.filter((ext) => {
    const matchCat =
      activeCategory === 'All'
        ? true
        : ext.style.toLowerCase().includes(activeCategory.toLowerCase());
    const matchSearch =
      ext.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ext.style.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="flex flex-col gap-5 px-4 pb-12 animate-in fade-in duration-300">
      {/* HEADER SECTION */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-500/15 flex items-center justify-center text-[#38bdf8]">
              <HomeIcon className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-extrabold text-white tracking-tight">Exterior Design</h1>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-[250px] leading-relaxed">
            Design stunning exteriors with the power of AI. Modern, classic, or unique — bring your vision to life.
          </p>
        </div>

        {/* New Design button */}
        <button
          onClick={onNewDesign}
          className="py-2.5 px-4 rounded-2xl bg-gradient-to-r from-[#00b4d8] via-[#4361ee] to-[#8b5cf6] text-white text-xs font-bold flex items-center gap-1.5 shadow-[0_4px_20px_rgba(59,130,246,0.4)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Design</span>
        </button>
      </div>

      {/* CATEGORY FILTER TABS */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.label;
          return (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-[#00b4d8] via-[#4361ee] to-[#8b5cf6] text-white shadow-md'
                  : 'bg-[#091329] text-slate-300 border border-blue-500/15 hover:border-blue-400/30'
              }`}
            >
              <span>{cat.label}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/30 text-white/90">
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* SEARCH BAR */}
      <div className="flex items-center bg-[#091329] border border-blue-500/20 rounded-2xl p-2 px-3.5 shadow-sm">
        <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search exterior designs..."
          className="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-hidden"
        />
        <SlidersHorizontal className="w-4 h-4 text-slate-400 ml-2 cursor-pointer" />
      </div>

      {/* POPULAR DESIGNS SECTION */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#38bdf8]" />
            <h2 className="text-base font-bold text-white tracking-tight">Popular Designs</h2>
          </div>
          <button
            onClick={() => setActiveCategory('All')}
            className="text-xs font-medium text-[#38bdf8] hover:text-[#7dd3fc] flex items-center gap-0.5 transition-colors cursor-pointer"
          >
            <span>See all</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* RESPONSIVE GRID EXPANDING ACROSS DISPLAY */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filteredDesigns.map((ext) => {
            const isFav = !!favoritesMap[ext.id];
            return (
              <div
                key={ext.id}
                onClick={onOpenExteriorStudio}
                className="group relative rounded-2xl overflow-hidden bg-[#091329] border border-blue-500/15 hover:border-blue-400/40 transition-all flex flex-col justify-between cursor-pointer shadow-md"
              >
                {/* Thumbnail */}
                <div className="relative h-28 w-full overflow-hidden bg-black/40">
                  <img
                    src={ext.thumbnail}
                    alt={ext.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badge */}
                  <div
                    className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold text-white flex items-center gap-1 backdrop-blur-md shadow-xs ${
                      ext.badge === 'Popular'
                        ? 'bg-indigo-600/90'
                        : 'bg-sky-600/90'
                    }`}
                  >
                    {ext.badge === 'Popular' && <Flame className="w-2.5 h-2.5 fill-white" />}
                    {ext.badge === 'Trending' && <Sparkles className="w-2.5 h-2.5" />}
                    <span>{ext.badge}</span>
                  </div>

                  {/* Heart button */}
                  <button
                    onClick={(e) => toggleHeart(ext, e)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isFav ? 'text-rose-500 fill-rose-500' : 'text-white'
                      }`}
                    />
                  </button>
                </div>

                {/* Details */}
                <div className="p-2.5 pt-2 flex flex-col justify-between flex-1 gap-2">
                  <div>
                    <h3 className="text-xs font-bold text-white truncate group-hover:text-sky-300 transition-colors">
                      {ext.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                      {ext.style} • {ext.floors} • {ext.beds}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-white/5">
                    <span className="text-[10px] text-slate-400">
                      📷 {ext.views}
                    </span>

                    <span className="text-[10px] font-bold text-sky-400 group-hover:text-sky-300 flex items-center gap-0.5">
                      View <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
