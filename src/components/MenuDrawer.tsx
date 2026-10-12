import React from 'react';
import {
  Plus,
  ChevronRight,
  Compass,
  UploadCloud,
  Folder,
  Heart,
  Home as HomeIcon,
  LayoutGrid,
  Building2,
  PlayCircle,
  Box,
  Sparkles,
  ArrowLeft,
  X,
} from 'lucide-react';
import { ScreenType, ToolType } from '../types';
import { Logo } from './Logo';

interface MenuDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  onNavigate: (screen: ScreenType) => void;
  onOpenNewProject: () => void;
  onSelectTool: (tool: ToolType) => void;
  favoritesCount?: number;
  unseenFavoritesCount?: number;
  projectsCount?: number;
  onOpenPrivacy?: () => void;
  onResetAccount?: () => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen = true,
  onClose,
  onNavigate,
  onOpenNewProject,
  onSelectTool,
  favoritesCount = 0,
  unseenFavoritesCount = 0,
  projectsCount = 0,
  onOpenPrivacy,
  onResetAccount,
}) => {
  if (!isOpen) return null;

  const handleAction = (cb: () => void) => {
    cb();
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex overflow-hidden animate-in fade-in duration-200">
      {/* Dimmed Backdrop (Covers the remaining half/part of the screen, tap to close) */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-xs cursor-pointer z-0 transition-opacity"
        title="Tap outside to close (Back)"
        aria-label="Close menu backdrop"
      />

      {/* Floating helper chip on backdrop */}
      <div className="absolute top-4 right-4 z-20 pointer-events-auto">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white/90 hover:text-white border border-white/20 text-[11px] font-semibold backdrop-blur-md cursor-pointer transition-all shadow-lg active:scale-95"
          title="Back to app"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-sky-400" />
          <span>Back</span>
        </button>
      </div>

      {/* HALF-WAY SLIDING DRAWER PANEL */}
      <div className="relative h-full w-[82%] sm:w-[50%] md:w-[380px] bg-[#060e24] border-r border-blue-500/30 shadow-[15px_0_50px_rgba(0,0,0,0.9)] flex flex-col z-10 animate-in slide-in-from-left duration-300">
        {/* TOP DRAWER HEADER WITH PROMINENT BACK BUTTON */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-3.5 py-3 bg-[#060e24]/95 backdrop-blur-md border-b border-white/10 shrink-0">
          {/* Back button to close the 3 dashes */}
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/35 active:scale-95 text-sky-300 hover:text-white border border-blue-400/35 text-xs font-bold transition-all cursor-pointer group shadow-xs"
            title="Close 3-dash menu (Back)"
            aria-label="Back to close menu"
          >
            <ArrowLeft className="w-4 h-4 text-sky-400 group-hover:-translate-x-1 transition-transform" strokeWidth={2.4} />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-1.5">
            <Logo size="sm" />
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Close menu"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* SCROLLABLE DRAWER CONTENT */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-3.5 flex flex-col gap-4 text-white">
          {/* BANNER CARD */}
          <div
            onClick={() => handleAction(onOpenNewProject)}
            className="group relative rounded-2xl p-3.5 overflow-hidden bg-gradient-to-r from-[#0e215e] via-[#1a338b] to-[#2b1f72] border border-blue-400/30 shadow-[0_8px_30px_rgba(26,51,139,0.55)] cursor-pointer hover:border-blue-300/50 transition-all shrink-0"
          >
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-start gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0 shadow-inner">
                  <Sparkles className="w-4 h-4 text-sky-300 fill-sky-300/30" />
                </div>

                <div>
                  <h2 className="text-xs font-bold text-white tracking-tight leading-snug">
                    Turn Your Ideas
                    <br />
                    Into Stunning Designs
                  </h2>
                  <p className="text-[10px] text-slate-200/80 mt-0.5 leading-snug">
                    Powered by spatial AI
                  </p>
                </div>
              </div>

              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <ChevronRight className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
          </div>

          {/* NEW PROJECT BUTTON */}
          <button
            onClick={() => handleAction(onOpenNewProject)}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#00b4d8] via-[#4361ee] to-[#8b5cf6] text-white font-medium flex items-center justify-between shadow-[0_4px_25px_rgba(59,130,246,0.45)] hover:shadow-[0_6px_30px_rgba(139,92,246,0.6)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer group shrink-0"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <Plus className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xs font-semibold tracking-wide">New Project</span>
            </div>
            <ChevronRight className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* SECTION 1: EXPLORE */}
          <div className="flex flex-col gap-1">
            <h3 className="text-[11px] font-semibold text-slate-400 px-2 mb-0.5 tracking-wide uppercase">Explore</h3>

            {/* Explore */}
            <button
              onClick={() => handleAction(() => onNavigate('explore'))}
              className="w-full px-3 py-2.5 rounded-xl hover:bg-white/5 active:bg-white/10 flex items-center justify-between text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <Compass className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition-colors" strokeWidth={1.8} />
                <span className="text-xs font-medium text-slate-200 group-hover:text-white">Explore</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* Uploads (BETA) */}
            <button
              onClick={() => handleAction(() => onNavigate('uploads'))}
              className="w-full px-3 py-2.5 rounded-xl hover:bg-white/5 active:bg-white/10 flex items-center justify-between text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <UploadCloud className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition-colors" strokeWidth={1.8} />
                <span className="text-xs font-medium text-slate-200 group-hover:text-white">Uploads</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.2 rounded-full text-[8px] font-bold bg-[#4338ca] text-[#c7d2fe] tracking-wide">
                  BETA
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </div>
            </button>

            {/* Projects */}
            <button
              onClick={() => handleAction(() => onNavigate('projects'))}
              className="w-full px-3 py-2.5 rounded-xl hover:bg-white/5 active:bg-white/10 flex items-center justify-between text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <Folder className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition-colors" strokeWidth={1.8} />
                <span className="text-xs font-medium text-slate-200 group-hover:text-white">Projects</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-blue-500/15 text-sky-300 border border-blue-400/20">
                  {projectsCount}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </div>
            </button>

            {/* Favorites */}
            <button
              onClick={() => handleAction(() => onNavigate('favorites'))}
              className="w-full px-3 py-2.5 rounded-xl hover:bg-white/5 active:bg-white/10 flex items-center justify-between text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Heart className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition-colors" strokeWidth={1.8} />
                  {unseenFavoritesCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full shadow-[0_0_8px_#f43f5e] animate-ping" />
                  )}
                </div>
                <span className="text-xs font-medium text-slate-200 group-hover:text-white">Favorites</span>
              </div>
              <div className="flex items-center gap-1.5">
                {unseenFavoritesCount > 0 ? (
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-rose-500 text-white shadow-sm flex items-center gap-1 animate-pulse">
                    <span>+{unseenFavoritesCount} new</span>
                  </span>
                ) : (
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-rose-500/15 text-rose-300 border border-rose-400/20">
                    {favoritesCount}
                  </span>
                )}
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </div>
            </button>
          </div>

          {/* SECTION 2: DESIGN TOOLS */}
          <div className="flex flex-col gap-1">
            <h3 className="text-[11px] font-semibold text-slate-400 px-2 mb-0.5 tracking-wide uppercase">Design Tools</h3>

            {/* Interior Design */}
            <button
              onClick={() => handleAction(() => onSelectTool('interior'))}
              className="w-full px-3 py-2.5 rounded-xl hover:bg-white/5 active:bg-white/10 flex items-center justify-between text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <HomeIcon className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition-colors" strokeWidth={1.8} />
                <span className="text-xs font-medium text-slate-200 group-hover:text-white">Interior Design</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.2 rounded-full text-[8px] font-bold bg-[#4338ca] text-[#c7d2fe] tracking-wide">
                  BETA
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </div>
            </button>

            {/* Floor Plan */}
            <button
              onClick={() => handleAction(() => onSelectTool('floorplan'))}
              className="w-full px-3 py-2.5 rounded-xl hover:bg-white/5 active:bg-white/10 flex items-center justify-between text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <LayoutGrid className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition-colors" strokeWidth={1.8} />
                <span className="text-xs font-medium text-slate-200 group-hover:text-white">Floor Plan</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* Exterior Design */}
            <button
              onClick={() => handleAction(() => onSelectTool('exterior'))}
              className="w-full px-3 py-2.5 rounded-xl hover:bg-white/5 active:bg-white/10 flex items-center justify-between text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition-colors" strokeWidth={1.8} />
                <span className="text-xs font-medium text-slate-200 group-hover:text-white">Exterior Design</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>

          {/* SECTION 3: VISUAL CREATION */}
          <div className="flex flex-col gap-1">
            <h3 className="text-[11px] font-semibold text-slate-400 px-2 mb-0.5 tracking-wide uppercase">Visual Creation</h3>

            {/* Home Design Video */}
            <button
              onClick={() => handleAction(() => onSelectTool('video'))}
              className="w-full px-3 py-2.5 rounded-xl hover:bg-white/5 active:bg-white/10 flex items-center justify-between text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <PlayCircle className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition-colors" strokeWidth={1.8} />
                <span className="text-xs font-medium text-slate-200 group-hover:text-white">Home Design Video</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.2 rounded-full text-[8px] font-bold bg-[#4338ca] text-[#c7d2fe] tracking-wide">
                  BETA
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </div>
            </button>

            {/* 3D Walkthrough */}
            <button
              onClick={() => handleAction(() => onSelectTool('3d'))}
              className="w-full px-3 py-2.5 rounded-xl hover:bg-white/5 active:bg-white/10 flex items-center justify-between text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <Box className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition-colors" strokeWidth={1.8} />
                <span className="text-xs font-medium text-slate-200 group-hover:text-white">3D Walkthrough</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.2 rounded-full text-[8px] font-bold bg-[#4338ca] text-[#c7d2fe] tracking-wide">
                  BETA
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </div>
            </button>
          </div>
        </div>

        {/* BOTTOM BACK BUTTON */}
        <div className="p-3 border-t border-white/10 bg-[#04091a]/90 shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 active:scale-98 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 border border-white/10 transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-sky-400 group-hover:-translate-x-1 transition-transform" strokeWidth={2.2} />
            <span>Back to App</span>
          </button>
        </div>
      </div>
    </div>
  );
};
