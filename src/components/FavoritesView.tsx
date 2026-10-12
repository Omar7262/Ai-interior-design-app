import React from 'react';
import { ArrowLeft, Heart, Sparkles, Compass, Home, LayoutGrid, Building2, ChevronRight } from 'lucide-react';
import { Project } from '../types';

interface FavoritesViewProps {
  favorites: Project[];
  onBack: () => void;
  onViewProject: (project: Project) => void;
  onToggleFavorite?: (project: Project) => void;
  onExplore?: () => void;
  onSelectTool?: (tool: 'interior' | 'floorplan' | 'exterior') => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favorites,
  onBack,
  onViewProject,
  onToggleFavorite,
  onExplore,
  onSelectTool,
}) => {
  return (
    <div className="flex flex-col gap-5 px-4 pb-14 text-white animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-300 hover:text-white p-2 -ml-2 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-semibold">Back to Menu</span>
        </button>

        <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
          <Heart className={`w-3.5 h-3.5 ${favorites.length > 0 ? 'fill-rose-400 text-rose-400' : 'text-rose-400'}`} />
          <span>{favorites.length} Favorites</span>
        </span>
      </div>

      {/* When favorites is 0 (Clean Sign-up State) */}
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 px-4 rounded-3xl bg-[#09142f]/80 border border-blue-500/20 text-center shadow-xl">
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-full bg-rose-500/10 border border-rose-400/25 flex items-center justify-center text-rose-400 shadow-[0_0_25px_rgba(244,63,94,0.2)]">
              <Heart className="w-9 h-9 stroke-[1.5]" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-blue-600 text-[11px] font-extrabold text-white flex items-center justify-center border-2 border-[#09142f]">
              0
            </div>
          </div>

          <h3 className="text-base font-bold text-white tracking-tight">No Favorites Saved Yet</h3>
          <p className="text-xs text-slate-300 max-w-xs mt-1.5 leading-relaxed">
            Your collection starts at <span className="font-bold text-rose-400">0</span>. Tap the heart icon on any interior room, floor plan, or architectural exterior to save it to your personal inspiration board.
          </p>

          {/* Action button */}
          {onExplore && (
            <button
              onClick={onExplore}
              className="mt-5 py-2.5 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white text-xs font-bold flex items-center gap-2 shadow-[0_4px_20px_rgba(59,130,246,0.35)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Community Designs</span>
            </button>
          )}

          {/* Quick Categories to Explore */}
          <div className="mt-8 w-full pt-6 border-t border-white/10 text-left">
            <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block mb-3">
              Browse Categories To Favorite
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onSelectTool?.('interior')}
                className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-400/30 text-left flex flex-col justify-between h-20 transition-all cursor-pointer group"
              >
                <Home className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-semibold text-white leading-tight">Interior Design</span>
              </button>

              <button
                onClick={() => onSelectTool?.('floorplan')}
                className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-400/30 text-left flex flex-col justify-between h-20 transition-all cursor-pointer group"
              >
                <LayoutGrid className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-semibold text-white leading-tight">Floor Plans</span>
              </button>

              <button
                onClick={() => onSelectTool?.('exterior')}
                className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-400/30 text-left flex flex-col justify-between h-20 transition-all cursor-pointer group"
              >
                <Building2 className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-semibold text-white leading-tight">Exterior Villas</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Favorites Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {favorites.map((p) => (
            <div
              key={p.id}
              onClick={() => onViewProject(p)}
              className="group rounded-2xl overflow-hidden bg-[#091329] border border-blue-500/15 hover:border-blue-400/40 cursor-pointer shadow-md transition-all flex flex-col justify-between"
            >
              <div className="h-32 w-full overflow-hidden relative">
                <img
                  src={p.thumbnail || p.afterImage}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite?.(p);
                  }}
                  title="Remove from favorites"
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 backdrop-blur-md text-rose-400 hover:bg-black/80 hover:scale-110 transition-all"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                </button>

                {p.typeLabel && (
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[9px] font-bold text-sky-300">
                    {p.typeLabel}
                  </div>
                )}
              </div>

              <div className="p-3">
                <h4 className="text-xs font-bold text-white truncate group-hover:text-sky-300 transition-colors">
                  {p.title}
                </h4>
                <span className="text-[10px] text-slate-400 block mt-0.5 truncate">
                  {p.style || 'Modern Design'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
