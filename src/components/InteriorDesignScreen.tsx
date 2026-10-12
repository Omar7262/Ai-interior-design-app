import React, { useState } from 'react';
import {
  Home as HomeIcon,
  Sparkles,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Flame,
  Heart,
  ArrowRight,
  Armchair,
  Bed,
  UtensilsCrossed,
  Bath,
  Monitor,
} from 'lucide-react';
import { COMMUNITY_DESIGNS } from '../data/mockData';
import { Project } from '../types';

interface InteriorDesignScreenProps {
  onNewDesign: () => void;
  onViewProject: (project: Project) => void;
  favoritesMap?: Record<string, boolean>;
  onToggleFavorite?: (project: Project) => void;
}

export const InteriorDesignScreen: React.FC<InteriorDesignScreenProps> = ({
  onNewDesign,
  onViewProject,
  favoritesMap = {},
  onToggleFavorite,
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All', icon: null },
    { id: 'living', label: 'Living Room', icon: Armchair },
    { id: 'bedroom', label: 'Bedroom', icon: Bed },
    { id: 'kitchen', label: 'Kitchen', icon: UtensilsCrossed },
    { id: 'bathroom', label: 'Bathroom', icon: Bath },
    { id: 'office', label: 'Office', icon: Monitor },
  ];

  const toggleHeart = (p: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(p);
  };

  const filteredProjects = COMMUNITY_DESIGNS.filter((p) => {
    const matchCat =
      activeCategory === 'All'
        ? true
        : p.roomType?.toLowerCase().includes(activeCategory.toLowerCase());
    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.style.toLowerCase().includes(searchQuery.toLowerCase());
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
            <h1 className="text-xl font-extrabold text-white tracking-tight">Interior Design</h1>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-[250px] leading-relaxed">
            Design your dream spaces with AI. From modern minimalism to cozy classics.
          </p>
        </div>

        {/* New Design button */}
        <button
          onClick={onNewDesign}
          className="py-2.5 px-4 rounded-2xl bg-gradient-to-r from-[#00b4d8] via-[#4361ee] to-[#8b5cf6] text-white text-xs font-bold flex items-center gap-1.5 shadow-[0_4px_20px_rgba(59,130,246,0.4)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>New Design</span>
        </button>
      </div>

      {/* CATEGORY FILTER TABS */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.label;
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.label)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-[#00b4d8] via-[#4361ee] to-[#8b5cf6] text-white shadow-md'
                  : 'bg-[#091329] text-slate-300 border border-blue-500/15 hover:border-blue-400/30'
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5 text-slate-300" />}
              <span>{cat.label}</span>
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
          placeholder="Search interior designs..."
          className="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-hidden"
        />
        <SlidersHorizontal className="w-4 h-4 text-slate-400 ml-2 cursor-pointer" />
      </div>

      {/* POPULAR DESIGNS SECTION */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#38bdf8]" />
              <h2 className="text-base font-bold text-white tracking-tight">Popular Designs</h2>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Trending interior styles loved by our community
            </p>
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
          {filteredProjects.map((p, index) => {
            const isFav = !!favoritesMap[p.id];
            const badgeType =
              index === 0 || index === 1 || index === 4
                ? 'Popular'
                : index === 3
                ? 'New'
                : 'Trending';

            return (
              <div
                key={p.id}
                onClick={() => onViewProject(p)}
                className="group relative rounded-2xl overflow-hidden bg-[#091329] border border-blue-500/15 hover:border-blue-400/40 transition-all flex flex-col justify-between cursor-pointer shadow-md"
              >
                {/* Thumbnail */}
                <div className="relative h-28 w-full overflow-hidden">
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badge */}
                  <div
                    className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold text-white flex items-center gap-1 backdrop-blur-md shadow-xs ${
                      badgeType === 'Popular'
                        ? 'bg-indigo-600/90'
                        : badgeType === 'New'
                        ? 'bg-blue-600/90'
                        : 'bg-sky-600/90'
                    }`}
                  >
                    {badgeType === 'Popular' && <Flame className="w-2.5 h-2.5 fill-white" />}
                    {badgeType === 'New' && <Sparkles className="w-2.5 h-2.5" />}
                    <span>{badgeType}</span>
                  </div>

                  {/* Heart button */}
                  <button
                    onClick={(e) => toggleHeart(p, e)}
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
                      {p.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-0.5 truncate">{p.style}</p>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-white/5">
                    <span className="text-[10px] text-slate-400">
                      👁 {p.views || '8.2k'}
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
