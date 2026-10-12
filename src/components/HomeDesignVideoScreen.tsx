import React, { useState } from 'react';
import {
  Home as HomeIcon,
  Play,
  Search,
  SlidersHorizontal,
  Flame,
  Heart,
  Sparkles,
  Camera,
  Film,
  Video,
  Layers,
} from 'lucide-react';
import { VIDEO_DESIGNS } from '../data/mockData';
import { VideoItem } from '../types';

interface HomeDesignVideoScreenProps {
  onCreateVideo: () => void;
  onPlayVideo: (video: VideoItem) => void;
  favoritesMap?: Record<string, boolean>;
  onToggleFavorite?: (item: any) => void;
}

export const HomeDesignVideoScreen: React.FC<HomeDesignVideoScreenProps> = ({
  onCreateVideo,
  onPlayVideo,
  favoritesMap = {},
  onToggleFavorite,
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Living Room',
    'Villa & Pools',
    'Penthouse',
    'Kitchen',
    'Outdoor & Patio',
    'Spa & Bath',
  ];

  const toggleHeart = (vid: any, e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(vid);
  };

  const filteredVideos = VIDEO_DESIGNS.filter((vid) => {
    const matchCat =
      activeCategory === 'All'
        ? true
        : vid.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
          vid.space.toLowerCase().includes(activeCategory.toLowerCase());
    const matchSearch =
      vid.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vid.space.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vid.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (vid.cameraMotion && vid.cameraMotion.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const featuredVideo = VIDEO_DESIGNS[0]; // Skyline Penthouse Grand Salon

  return (
    <div className="flex flex-col gap-5 px-4 pb-14 animate-in fade-in duration-300">
      {/* HEADER SECTION */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-500/15 flex items-center justify-center text-[#38bdf8]">
              <Film className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-white tracking-tight">Home Design Video</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-sky-300 border border-blue-400/30">
                16 Demos
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-[270px] leading-relaxed">
            Turn your ideas into stunning 4K architectural design video walkthroughs.
          </p>
        </div>

        {/* Create Video button */}
        <button
          onClick={onCreateVideo}
          className="py-2.5 px-4 rounded-2xl bg-gradient-to-r from-[#00b4d8] via-[#4361ee] to-[#8b5cf6] text-white text-xs font-bold flex items-center gap-1.5 shadow-[0_4px_20px_rgba(59,130,246,0.4)] hover:brightness-110 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <Play className="w-3.5 h-3.5 fill-white text-white" />
          <span>Create Video</span>
        </button>
      </div>

      {/* FEATURED SPOTLIGHT DEMO VIDEO HERO */}
      <div
        onClick={() => onPlayVideo(featuredVideo)}
        className="group relative rounded-3xl overflow-hidden border border-blue-500/30 bg-[#081229] shadow-[0_12px_40px_rgba(0,0,0,0.7)] cursor-pointer transition-all hover:border-blue-400/50"
      >
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-black">
          <img
            src={featuredVideo.thumbnail}
            alt={featuredVideo.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081229] via-[#081229]/40 to-transparent" />

          {/* Badges on Hero */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-amber-500 to-rose-500 text-white flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3" />
              <span>FEATURED DEMO</span>
            </span>
            <span className="px-2 py-1 rounded-full text-[10px] font-mono bg-black/60 backdrop-blur-md text-sky-300 border border-white/10 flex items-center gap-1">
              <Camera className="w-3 h-3" />
              <span>{featuredVideo.cameraMotion}</span>
            </span>
          </div>

          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono text-white">
            4K HDR • 0:09
          </div>

          {/* Center Play Button */}
          <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-115 group-hover:bg-blue-500 transition-all backdrop-blur-xs border border-white/20">
            <Play className="w-6 h-6 fill-white ml-0.5" />
          </div>
        </div>

        {/* Hero Details */}
        <div className="p-4 pt-2 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight group-hover:text-sky-300 transition-colors">
              {featuredVideo.title}
            </h2>
            <span className="text-[11px] font-bold text-sky-400">Play Demo →</span>
          </div>
          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {featuredVideo.description}
          </p>
        </div>
      </div>

      {/* CATEGORY FILTER TABS */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-[#00b4d8] via-[#4361ee] to-[#8b5cf6] text-white shadow-md'
                  : 'bg-[#091329] text-slate-300 border border-blue-500/15 hover:border-blue-400/30'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* SEARCH BAR */}
      <div className="flex items-center bg-[#091329] border border-blue-500/20 rounded-2xl p-2.5 px-3.5 shadow-sm">
        <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search 16 demo videos by space, camera or style..."
          className="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-hidden"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs text-slate-400 hover:text-white mr-1"
          >
            Clear
          </button>
        )}
        <SlidersHorizontal className="w-4 h-4 text-slate-400 ml-1.5" />
      </div>

      {/* ALL 16 DEMO VIDEOS SECTION */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#38bdf8]" />
            <h2 className="text-base font-bold text-white tracking-tight">
              {activeCategory === 'All' ? 'All Video Demos' : `${activeCategory} Demos`}
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {filteredVideos.length} {filteredVideos.length === 1 ? 'Video' : 'Videos'}
          </span>
        </div>

        {/* RESPONSIVE GRID EXPANDING ACROSS DISPLAY */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filteredVideos.map((vid, idx) => {
            const isFav = !!favoritesMap[vid.id];
            return (
              <div
                key={vid.id}
                onClick={() => onPlayVideo(vid)}
                className="group relative rounded-2xl overflow-hidden bg-[#091329] border border-blue-500/15 hover:border-blue-400/40 hover:bg-[#0c1a38] transition-all flex flex-col justify-between cursor-pointer shadow-md"
              >
                {/* Thumbnail */}
                <div className="relative h-28 sm:h-36 w-full overflow-hidden bg-black/40">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />

                  {/* Top-left Badge */}
                  <div
                    className={`absolute top-2 left-2 px-1.5 py-0.5 rounded-full text-[8.5px] font-bold text-white flex items-center gap-1 backdrop-blur-md shadow-xs ${
                      vid.badge === 'Popular'
                        ? 'bg-indigo-600/90'
                        : vid.badge === 'New'
                        ? 'bg-blue-600/90'
                        : 'bg-rose-600/90'
                    }`}
                  >
                    {vid.badge === 'Popular' && <Flame className="w-2.5 h-2.5 fill-white" />}
                    {vid.badge === 'New' && <Sparkles className="w-2.5 h-2.5" />}
                    <span>{vid.badge}</span>
                  </div>

                  {/* Heart button */}
                  <button
                    onClick={(e) => toggleHeart(vid, e)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/55 text-white hover:bg-black/80 transition-colors z-10"
                    title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isFav ? 'text-rose-500 fill-rose-500' : 'text-white'
                      }`}
                    />
                  </button>

                  {/* Center Play Button Overlay on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:bg-blue-600 transition-all">
                      <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Camera motion tag bottom-left */}
                  {vid.cameraMotion && (
                    <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-[8px] font-semibold text-sky-300 flex items-center gap-1 border border-white/10">
                      <Camera className="w-2.5 h-2.5" />
                      <span>{vid.cameraMotion}</span>
                    </div>
                  )}

                  {/* Duration badge bottom-right */}
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-md bg-black/75 text-[8.5px] font-mono text-white flex items-center gap-1">
                    <Play className="w-2 h-2 fill-white text-white" />
                    <span>0:09</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-2.5 pt-2 flex flex-col gap-1">
                  <h3 className="text-xs font-bold text-white truncate group-hover:text-sky-300 transition-colors">
                    {vid.title}
                  </h3>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="truncate">{vid.space}</span>
                    <span className="text-[9px] font-mono text-sky-400 shrink-0">4K HDR</span>
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
