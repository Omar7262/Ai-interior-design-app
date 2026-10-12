import React, { useState } from 'react';
import {
  Plus,
  ChevronRight,
  Sparkles,
  Folder,
  Home as HomeIcon,
  LayoutGrid,
  Building2,
  MoreVertical,
  Eye,
  Sliders,
  Trash2,
  Play,
  Film,
  Box,
  PlayCircle,
  X,
  Compass,
} from 'lucide-react';
import { Project, ToolType } from '../types';

interface HomeScreenProps {
  projects: Project[];
  onOpenNewProject: () => void;
  onSelectTool: (tool: ToolType) => void;
  onOpenExplore: () => void;
  onOpenProjects: () => void;
  onViewProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  projects,
  onOpenNewProject,
  onSelectTool,
  onOpenExplore,
  onOpenProjects,
  onViewProject,
  onDeleteProject,
}) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [isSeeAllQuickAccessOpen, setIsSeeAllQuickAccessOpen] = useState(false);

  // Take top 3 projects for the home screen
  const recentProjects = projects.slice(0, 3);

  // All design tools / features including 3D Walkthrough & Home Design Video
  const allQuickAccessTools = [
    {
      id: 'interior' as ToolType,
      title: 'Interior Design',
      tag: 'BETA',
      desc: 'AI living rooms, kitchens, bedrooms & luxury spaces',
      icon: HomeIcon,
      color: 'text-[#38bdf8]',
      bg: 'bg-blue-500/15',
      border: 'border-blue-500/20 hover:border-blue-400/50',
    },
    {
      id: 'floorplan' as ToolType,
      title: 'Floor Plan',
      tag: 'POPULAR',
      desc: 'Smart 2D blueprints, layouts & architectural schematics',
      icon: LayoutGrid,
      color: 'text-[#22d3ee]',
      bg: 'bg-cyan-500/15',
      border: 'border-cyan-500/20 hover:border-cyan-400/50',
    },
    {
      id: 'exterior' as ToolType,
      title: 'Exterior Design',
      tag: 'NEW',
      desc: 'Villas, modern facades, landscaping & outdoor dusk renders',
      icon: Building2,
      color: 'text-[#818cf8]',
      bg: 'bg-indigo-500/15',
      border: 'border-indigo-500/20 hover:border-indigo-400/50',
    },
    {
      id: '3d' as ToolType,
      title: '3D Walkthrough',
      tag: 'BETA',
      desc: 'Interactive 360° virtual camera orbit & spatial inspection',
      icon: Box,
      color: 'text-[#38bdf8]',
      bg: 'bg-sky-500/15',
      border: 'border-sky-500/25 hover:border-sky-400/50',
    },
    {
      id: 'video' as ToolType,
      title: 'Home Design Video',
      tag: '4K DEMOS',
      desc: 'Cinematic 4K architectural video tours and flythroughs',
      icon: PlayCircle,
      color: 'text-[#c084fc]',
      bg: 'bg-purple-500/15',
      border: 'border-purple-500/25 hover:border-purple-400/50',
    },
  ];

  return (
    <div className="flex flex-col gap-6 px-4 pb-8 animate-in fade-in duration-300">
      {/* HERO SECTION */}
      <div className="relative rounded-[26px] overflow-hidden border border-blue-500/20 shadow-[0_12px_40px_rgba(5,15,45,0.8)]">
        {/* Background villa image with luxury pool */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80')`,
          }}
        />
        {/* Rich dark gradient overlay for crystal clear contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050b1a] via-[#050b1a]/70 to-[#050b1a]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050b1a]/90 via-[#050b1a]/60 to-transparent" />

        {/* Content */}
        <div className="relative z-10 p-6 pt-7 flex flex-col items-start">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#7dd3fc] uppercase mb-1 drop-shadow-sm">
            WELCOME BACK
          </span>

          <h1 className="text-3xl font-extrabold tracking-tight leading-[1.15] text-white">
            Design Your <br />
            <span className="bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#c084fc] bg-clip-text text-transparent">
              Next Project
            </span>
          </h1>

          <p className="text-xs text-slate-300/90 mt-2.5 max-w-[260px] leading-relaxed">
            From simple ideas to stunning visuals — powered by AI.
          </p>

          {/* New Project Gradient Button */}
          <button
            onClick={onOpenNewProject}
            className="mt-6 w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#00b4d8] via-[#4361ee] to-[#8b5cf6] text-white font-medium flex items-center justify-between shadow-[0_4px_25px_rgba(59,130,246,0.45)] hover:shadow-[0_6px_30px_rgba(139,92,246,0.6)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <Plus className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-semibold tracking-wide">New Project</span>
            </div>
            <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* QUICK ACCESS SECTION */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#38bdf8] fill-[#38bdf8]/30" />
            <h2 className="text-base font-bold text-white tracking-tight">Quick Access</h2>
          </div>
          <button
            onClick={() => setIsSeeAllQuickAccessOpen(true)}
            className="text-xs font-medium text-[#38bdf8] hover:text-[#7dd3fc] flex items-center gap-0.5 transition-colors cursor-pointer"
          >
            <span>See all</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Primary Action Cards (Clean layout; 3D Walkthrough & Home Design Video appear when clicking See All) */}
        <div className="grid grid-cols-3 gap-2.5">
          {/* Card 1: Interior Design */}
          <button
            onClick={() => onSelectTool('interior')}
            className="group relative flex flex-col justify-between p-3.5 h-32 rounded-2xl bg-[#091329]/90 border border-blue-500/20 hover:border-blue-400/50 hover:bg-[#0c1a38] transition-all text-left shadow-lg cursor-pointer"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center text-[#38bdf8] group-hover:scale-105 transition-transform">
                <HomeIcon className="w-5 h-5" strokeWidth={2} />
              </div>
            </div>

            <div>
              <div className="text-[13px] font-semibold text-white leading-tight">
                Interior
                <br />
                Design
              </div>
              <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#4338ca] text-[#c7d2fe] tracking-wide">
                BETA
              </span>
            </div>
          </button>

          {/* Card 2: Floor Plan */}
          <button
            onClick={() => onSelectTool('floorplan')}
            className="group relative flex flex-col justify-between p-3.5 h-32 rounded-2xl bg-[#091329]/90 border border-cyan-500/20 hover:border-cyan-400/50 hover:bg-[#0c1a38] transition-all text-left shadow-lg cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/15 flex items-center justify-center text-[#22d3ee] group-hover:scale-105 transition-transform">
                <LayoutGrid className="w-5 h-5" strokeWidth={2} />
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div className="text-[13px] font-semibold text-white leading-tight">
                Floor
                <br />
                Plan
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:text-white transition-all" />
            </div>
          </button>

          {/* Card 3: Exterior Design */}
          <button
            onClick={() => onSelectTool('exterior')}
            className="group relative flex flex-col justify-between p-3.5 h-32 rounded-2xl bg-[#091329]/90 border border-indigo-500/20 hover:border-indigo-400/50 hover:bg-[#0c1a38] transition-all text-left shadow-lg cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/15 flex items-center justify-center text-[#818cf8] group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5" strokeWidth={2} />
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div className="text-[13px] font-semibold text-white leading-tight">
                Exterior
                <br />
                Design
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:text-white transition-all" />
            </div>
          </button>
        </div>
      </div>

      {/* HOME DESIGN VIDEO FEATURE BANNER (16 DEMOS) */}
      <div
        onClick={() => onSelectTool('video')}
        className="group relative rounded-2xl p-4 overflow-hidden bg-gradient-to-r from-[#0c1c4d] via-[#162a75] to-[#2b1f72] border border-blue-400/30 shadow-[0_6px_25px_rgba(26,51,139,0.45)] cursor-pointer hover:border-blue-300/50 transition-all"
      >
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <Play className="w-5 h-5 fill-white ml-0.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-tight">Home Design Video</h3>
                <span className="px-2 py-0.2 rounded-full text-[9px] font-extrabold bg-blue-500/20 text-sky-300 border border-blue-400/30">
                  16 4K Demos
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Penthouses, ocean villas, marble kitchens & 360° drone tours.
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      {/* RECENT PROJECTS SECTION */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <Folder className="w-4 h-4 text-[#818cf8]" />
            <h2 className="text-base font-bold text-white tracking-tight">Recent Projects</h2>
          </div>
          <button
            onClick={onOpenProjects}
            className="text-xs font-medium text-[#38bdf8] hover:text-[#7dd3fc] flex items-center gap-0.5 transition-colors cursor-pointer"
          >
            <span>See all</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Project Cards or Zero State */}
        {recentProjects.length === 0 ? (
          <div className="p-4 rounded-2xl bg-[#091329] border border-blue-500/15 text-center flex flex-col items-center justify-center py-6 shadow-md">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-sky-400 mb-2">
              <Folder className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-white">No projects created yet (0)</h3>
            <p className="text-[11px] text-slate-400 max-w-xs mt-1">
              Your generated rooms, blueprints, and architectural models will appear here as you create.
            </p>
            <button
              onClick={onOpenNewProject}
              className="mt-3 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create First Design</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#0a1329] border border-blue-500/15 hover:border-blue-400/40 transition-all shadow-md"
              >
                {/* Thumbnail image */}
                <div
                  onClick={() => onViewProject(project)}
                  className="relative h-24 w-full overflow-hidden cursor-pointer"
                >
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1329] via-transparent to-transparent opacity-80" />
                </div>

                {/* Card Meta & Title */}
                <div className="p-2.5 pt-1.5 flex items-start justify-between gap-1">
                  <div
                    onClick={() => onViewProject(project)}
                    className="flex-1 min-w-0 cursor-pointer"
                  >
                    <h3 className="text-xs font-semibold text-white truncate group-hover:text-[#38bdf8] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">{project.timeAgo}</p>
                  </div>

                  {/* Vertical 3 dots menu button */}
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuId(activeMenuId === project.id ? null : project.id);
                      }}
                      className="p-1 -mr-1 text-slate-400 hover:text-white transition-colors rounded-sm"
                      aria-label="Project actions"
                    >
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>

                    {/* Dropdown Popup */}
                    {activeMenuId === project.id && (
                      <div className="absolute right-0 bottom-full mb-1 z-30 w-36 rounded-xl bg-[#0e1b3d] border border-blue-400/25 shadow-2xl py-1 text-xs">
                        <button
                          onClick={() => {
                            onViewProject(project);
                            setActiveMenuId(null);
                          }}
                          className="w-full px-3 py-1.5 flex items-center gap-2 text-slate-200 hover:bg-blue-600/20 text-left"
                        >
                          <Eye className="w-3.5 h-3.5 text-sky-400" />
                          <span>Inspect / Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            onViewProject(project);
                            setActiveMenuId(null);
                          }}
                          className="w-full px-3 py-1.5 flex items-center gap-2 text-slate-200 hover:bg-blue-600/20 text-left"
                        >
                          <Sliders className="w-3.5 h-3.5 text-purple-400" />
                          <span>Before & After</span>
                        </button>
                        <button
                          onClick={() => {
                            onDeleteProject(project.id);
                            setActiveMenuId(null);
                          }}
                          className="w-full px-3 py-1.5 flex items-center gap-2 text-rose-400 hover:bg-rose-500/10 text-left"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* EXPLORE & GET INSPIRED BANNER */}
      <div
        onClick={onOpenExplore}
        className="group relative rounded-2xl p-4 overflow-hidden bg-gradient-to-r from-[#0d1f54] via-[#162a78] to-[#251f68] border border-blue-400/25 shadow-[0_8px_30px_rgba(16,42,122,0.5)] cursor-pointer hover:border-blue-300/40 transition-all"
      >
        {/* Ambient radial blur */}
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0 shadow-inner">
              <Sparkles className="w-5 h-5 text-white" />
            </div>

            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">Explore & Get Inspired</h3>
              <p className="text-[11px] text-slate-200/80 mt-0.5 max-w-[190px] leading-snug">
                Browse trending designs and see what others are creating.
              </p>
            </div>
          </div>

          {/* Stacked floating 3D glass cards artwork + chevron */}
          <div className="flex items-center gap-2">
            <div className="relative w-12 h-10 flex items-center justify-center">
              {/* Back card */}
              <div className="absolute w-8 h-8 rounded-lg bg-blue-600/40 border border-blue-300/30 rotate-12 translate-x-1" />
              {/* Front glowing card with mountain graphic */}
              <div className="absolute w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 border border-cyan-300/50 shadow-md flex items-center justify-center -rotate-6">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* QUICK ACCESS "SEE ALL" MODAL */}
      {isSeeAllQuickAccessOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-t-3xl sm:rounded-3xl bg-[#09122c] border border-blue-500/30 p-5 shadow-2xl text-white max-h-[90vh] overflow-y-auto no-scrollbar">
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-[#38bdf8]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">All Design Studios & Tools</h3>
                  <p className="text-xs text-slate-400">Launch any AI design mode or architectural tool</p>
                </div>
              </div>
              <button
                onClick={() => setIsSeeAllQuickAccessOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of tools */}
            <div className="mt-4 flex flex-col gap-2.5">
              {allQuickAccessTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    onClick={() => {
                      setIsSeeAllQuickAccessOpen(false);
                      onSelectTool(tool.id);
                    }}
                    className={`group p-3.5 rounded-2xl bg-[#0c183a]/90 border ${tool.border} transition-all flex items-center justify-between text-left cursor-pointer hover:bg-[#102252] active:scale-[0.99]`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`w-11 h-11 rounded-xl ${tool.bg} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-6 h-6 ${tool.color}`} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white tracking-tight">{tool.title}</span>
                          <span className="px-1.5 py-0.5 rounded-md text-[9px] font-extrabold bg-[#4338ca] text-[#c7d2fe]">
                            {tool.tag}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 truncate">{tool.desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </button>
                );
              })}
            </div>

            {/* Footer with quick action to explore */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span>Looking for inspiration?</span>
              <button
                onClick={() => {
                  setIsSeeAllQuickAccessOpen(false);
                  onOpenExplore();
                }}
                className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Browse Explore Gallery</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
