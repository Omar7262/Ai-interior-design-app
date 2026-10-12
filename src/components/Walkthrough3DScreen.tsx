import React, { useState } from 'react';
import {
  Box,
  Play,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  Home as HomeIcon,
  Armchair,
  Building2,
} from 'lucide-react';
import { WALKTHROUGH_ITEMS } from '../data/mockData';
import { WalkthroughItem } from '../types';

interface Walkthrough3DScreenProps {
  onCreateWalkthrough: () => void;
  onOpenWalkthrough: (item: WalkthroughItem) => void;
}

export const Walkthrough3DScreen: React.FC<Walkthrough3DScreenProps> = ({
  onCreateWalkthrough,
  onOpenWalkthrough,
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { label: 'All', count: '' },
    { label: 'Homes', count: '12' },
    { label: 'Interiors', count: '10' },
    { label: 'Exteriors', count: '8' },
    { label: 'Luxury', count: '6' },
  ];

  const filteredItems = WALKTHROUGH_ITEMS.filter((item) => {
    const matchCat =
      activeCategory === 'All'
        ? true
        : activeCategory === 'Homes'
        ? item.type === 'Home'
        : activeCategory === 'Interiors'
        ? item.type === 'Interior'
        : activeCategory === 'Exteriors'
        ? item.type === 'Exterior'
        : item.type === 'Luxury';
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="flex flex-col gap-5 px-4 pb-12 animate-in fade-in duration-300">
      {/* HEADER SECTION */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-500/15 flex items-center justify-center text-[#38bdf8]">
              <Box className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-extrabold text-white tracking-tight">3D Walkthrough</h1>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-[250px] leading-relaxed">
            Take a virtual tour of your dream spaces. Explore homes, interiors and exteriors in stunning 3D.
          </p>
        </div>

        {/* Create button */}
        <button
          onClick={onCreateWalkthrough}
          className="py-2.5 px-4 rounded-2xl bg-gradient-to-r from-[#00b4d8] via-[#4361ee] to-[#8b5cf6] text-white text-xs font-bold flex items-center gap-1.5 shadow-[0_4px_20px_rgba(59,130,246,0.4)] hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
        >
          <Play className="w-3.5 h-3.5 fill-white text-white" />
          <span>+ Create 3D Walkthrough</span>
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
              {cat.count && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/30 text-white/90">
                  {cat.count}
                </span>
              )}
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
          placeholder="Search 3D walkthroughs..."
          className="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-hidden"
        />
        <SlidersHorizontal className="w-4 h-4 text-slate-400 ml-2 cursor-pointer" />
      </div>

      {/* POPULAR 3D WALKTHROUGHS SECTION */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#38bdf8]" />
            <h2 className="text-base font-bold text-white tracking-tight">Popular 3D Walkthroughs</h2>
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
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenWalkthrough(item)}
              className="group relative rounded-2xl overflow-hidden bg-[#091329] border border-blue-500/15 hover:border-blue-400/40 transition-all flex flex-col justify-between cursor-pointer shadow-md"
            >
              {/* Thumbnail with 3D badge and play overlay */}
              <div className="relative h-28 w-full overflow-hidden bg-black/40">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* 3D badge */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold text-white flex items-center gap-1 bg-blue-600/90 backdrop-blur-md shadow-xs">
                  <Box className="w-2.5 h-2.5" />
                  <span>3D</span>
                </div>

                {/* Center play circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                  </div>
                </div>

                {/* Duration bottom-right */}
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-md bg-black/70 text-[9px] font-mono text-white">
                  {item.duration}
                </div>
              </div>

              {/* Details */}
              <div className="p-2.5 pt-2 flex flex-col gap-1">
                <h3 className="text-xs font-bold text-white truncate group-hover:text-sky-300 transition-colors">
                  {item.title}
                </h3>
                <div className="text-[10px] text-slate-400 truncate">
                  {item.category} • {item.rooms} • {item.floors}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
