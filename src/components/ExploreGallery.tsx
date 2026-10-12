import React, { useState } from 'react';
import { Sparkles, Heart, Copy, Check, Filter } from 'lucide-react';
import { EXPLORE_GALLERY } from '../data/mockData';
import { ExploreItem } from '../types';

interface ExploreGalleryProps {
  onRemixPrompt: (prompt: string, style: string) => void;
}

export const ExploreGallery: React.FC<ExploreGalleryProps> = ({ onRemixPrompt }) => {
  const [filter, setFilter] = useState<'All' | 'Interior Design' | 'Exterior Design'>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [likesState, setLikesState] = useState<Record<string, { count: number; liked: boolean }>>(() => {
    const map: Record<string, { count: number; liked: boolean }> = {};
    EXPLORE_GALLERY.forEach((item: ExploreItem) => {
      map[item.id] = { count: item.likes, liked: false };
    });
    return map;
  });

  const filteredItems = EXPLORE_GALLERY.filter((item: ExploreItem) =>
    filter === 'All' ? true : item.category === filter
  );

  const toggleLike = (id: string) => {
    setLikesState((prev) => {
      const current = prev[id] || { count: 0, liked: false };
      return {
        ...prev,
        [id]: {
          count: current.liked ? current.count - 1 : current.count + 1,
          liked: !current.liked,
        },
      };
    });
  };

  const copyPrompt = (item: ExploreItem) => {
    navigator.clipboard.writeText(item.prompt);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col gap-5 px-4 pb-14 text-white animate-in fade-in duration-200">
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-sky-400" />
          <span>Explore Community Creations</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Get inspired by trending architectural & interior prompts
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(['All', 'Interior Design', 'Exterior Design'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
              filter === cat
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'bg-[#091329] text-slate-400 border border-white/10 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item: ExploreItem) => {
          const likeInfo = likesState[item.id] || { count: item.likes, liked: false };
          return (
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden bg-[#091329] border border-blue-500/15 hover:border-blue-400/40 transition-all flex flex-col group shadow-lg"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-sky-300 border border-white/10">
                  {item.category}
                </div>
                <button
                  onClick={() => toggleLike(item.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition-colors flex items-center gap-1 text-xs"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      likeInfo.liked ? 'text-rose-500 fill-rose-500' : 'text-white'
                    }`}
                  />
                  <span>{likeInfo.count}</span>
                </button>
              </div>

              <div className="p-3.5 flex flex-col justify-between flex-1 gap-3">
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[10px] text-slate-400 block mt-0.5">by {item.designer}</span>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed bg-black/20 p-2 rounded-lg border border-white/5 font-mono text-[11px]">
                    "{item.prompt}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-white/5">
                  <button
                    onClick={() => copyPrompt(item)}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">Prompt Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onRemixPrompt(item.prompt, item.style)}
                    className="px-3 py-1 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-sky-200 border border-blue-400/30 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Remix</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
