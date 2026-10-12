import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  ArrowRight,
  ChevronRight,
  Flame,
  Armchair,
  UtensilsCrossed,
  Bed,
  Bath,
  Wine,
  Monitor,
  Leaf,
  LayoutGrid,
  Heart,
} from 'lucide-react';
import { EXPLORE_CATEGORIES, COMMUNITY_DESIGNS } from '../data/mockData';
import { Project } from '../types';

interface ExploreScreenProps {
  onSelectCategory: (catName: string) => void;
  onViewProject: (project: Project) => void;
  favoritesMap?: Record<string, boolean>;
  onToggleFavorite?: (project: Project) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  onSelectCategory,
  onViewProject,
  favoritesMap = {},
  onToggleFavorite,
}) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = ['All', 'Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Outdoor'];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'couch':
        return <Armchair className="w-4 h-4" />;
      case 'utensils':
        return <UtensilsCrossed className="w-4 h-4" />;
      case 'bed':
        return <Bed className="w-4 h-4" />;
      case 'bath':
        return <Bath className="w-4 h-4" />;
      case 'dining':
        return <Wine className="w-4 h-4" />;
      case 'laptop':
        return <Monitor className="w-4 h-4" />;
      case 'leaf':
        return <Leaf className="w-4 h-4" />;
      default:
        return <LayoutGrid className="w-4 h-4" />;
    }
  };

  const trendingProjects = COMMUNITY_DESIGNS;

  return (
    <div className="flex flex-col gap-6 px-4 pb-12 animate-in fade-in duration-300">
      {/* HERO BANNER CARD */}
      <div className="relative rounded-[26px] overflow-hidden border border-blue-500/20 shadow-[0_12px_40px_rgba(5,15,45,0.8)]">
        {/* Penthouse background */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050b1a] via-[#050b1a]/70 to-[#050b1a]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050b1a]/90 via-[#050b1a]/70 to-transparent" />

        {/* Content */}
        <div className="relative z-10 p-5 pt-6 flex flex-col items-start">
          <div className="w-full flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold tracking-wider text-[#7dd3fc] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Turn Your Ideas Into</span>
            </span>

            {/* Script calligraphy watermark badge */}
            <span className="font-serif italic text-xs text-white/70 tracking-wide hidden sm:inline">
              Better Spaces Brighter Days
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-white">
            Beautiful Home <br />
            <span className="bg-gradient-to-r from-[#00d2ff] via-[#60a5fa] to-[#c084fc] bg-clip-text text-transparent">
              Designs
            </span>
          </h1>

          <p className="text-xs text-slate-300/90 mt-2 max-w-[260px] leading-relaxed">
            Get AI-powered designs for every room, style and space — in seconds.
          </p>

          {/* Search bar inside banner */}
          <div className="w-full mt-4 flex items-center bg-[#09142e]/90 border border-blue-400/30 rounded-2xl p-1.5 pl-3.5 shadow-lg">
            <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by room, style, or design idea..."
              className="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-hidden"
            />
            <button
              onClick={() => onSelectCategory('Living Room')}
              className="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white shrink-0 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* CATEGORY FILTER PILLS */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {filterTabs.map((tab) => {
          const isSelected = activeFilter === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-[#00b4d8] via-[#4361ee] to-[#8b5cf6] text-white shadow-[0_0_15px_rgba(67,97,238,0.4)]'
                  : 'bg-[#091329] text-slate-300 border border-blue-500/15 hover:border-blue-400/30'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* POPULAR CATEGORIES (8 Grid Tiles) */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#38bdf8]" />
            <h2 className="text-base font-bold text-white tracking-tight">Popular Categories</h2>
          </div>
          <button
            onClick={() => onSelectCategory('All')}
            className="text-xs font-medium text-[#38bdf8] hover:text-[#7dd3fc] flex items-center gap-0.5 transition-colors cursor-pointer"
          >
            <span>See all</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 2 rows × 4 columns grid on desktop, 4 columns on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {EXPLORE_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className="group relative h-36 rounded-2xl overflow-hidden bg-[#0a1329] border border-blue-500/15 hover:border-blue-400/40 transition-all cursor-pointer shadow-md"
            >
              {/* Background photo */}
              <img
                src={cat.img}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050b1a] via-[#050b1a]/60 to-transparent" />

              {/* Bottom info */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10">
                <div className="w-6 h-6 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-1.5 shadow-xs">
                  {getCategoryIcon(cat.icon)}
                </div>
                <h3 className="text-xs font-bold text-white leading-tight">{cat.name}</h3>
                <span className="text-[10px] text-slate-300 font-medium block mt-0.5">
                  {cat.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TRENDING THIS WEEK */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#c084fc]" />
              <h2 className="text-base font-bold text-white tracking-tight">Trending This Week</h2>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Fresh ideas, real spaces, endless inspiration
            </p>
          </div>
          <button
            onClick={() => onSelectCategory('Trending')}
            className="text-xs font-medium text-[#38bdf8] hover:text-[#7dd3fc] flex items-center gap-0.5 transition-colors cursor-pointer"
          >
            <span>See all</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Responsive grid expanding across display */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {trendingProjects.map((p) => {
            const isFav = !!favoritesMap[p.id];
            return (
              <div
                key={p.id}
                onClick={() => onViewProject(p)}
                className="group relative rounded-2xl overflow-hidden bg-[#0a1329] border border-blue-500/15 hover:border-blue-400/40 transition-all cursor-pointer shadow-md"
              >
                <div className="relative h-28 w-full overflow-hidden">
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-indigo-600/90 backdrop-blur-md text-[9px] font-bold text-white flex items-center gap-1 shadow-md">
                    <Flame className="w-3 h-3 fill-white text-white" />
                    <span>Trending</span>
                  </div>

                  {/* Heart button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite?.(p);
                    }}
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

                <div className="p-2.5">
                  <h3 className="text-xs font-bold text-white truncate">{p.title}</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">{p.style}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
