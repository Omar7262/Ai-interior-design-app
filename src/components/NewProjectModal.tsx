import React from 'react';
import { X, Home, LayoutGrid, Building2, PlayCircle, Box, Sparkles, ChevronRight } from 'lucide-react';
import { ToolType } from '../types';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (tool: ToolType) => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({ isOpen, onClose, onSelectTool }) => {
  if (!isOpen) return null;

  const toolOptions = [
    {
      id: 'interior' as ToolType,
      title: 'Interior Design',
      tag: 'BETA',
      desc: 'Redesign living rooms, bedrooms, kitchens with photoreal AI styles',
      icon: Home,
      gradient: 'from-blue-600/30 to-indigo-600/30 border-blue-500/40',
      iconColor: 'text-sky-400',
    },
    {
      id: 'floorplan' as ToolType,
      title: 'Floor Plan Planner',
      tag: 'POPULAR',
      desc: 'Generate 2D spatial layouts, dimensioned blueprints & 3D zones',
      icon: LayoutGrid,
      gradient: 'from-cyan-600/30 to-blue-600/30 border-cyan-500/40',
      iconColor: 'text-cyan-400',
    },
    {
      id: 'exterior' as ToolType,
      title: 'Exterior Architecture',
      tag: 'NEW',
      desc: 'Create modern villas, facades, landscaping, and dusk lighting',
      icon: Building2,
      gradient: 'from-indigo-600/30 to-purple-600/30 border-indigo-500/40',
      iconColor: 'text-indigo-400',
    },
    {
      id: 'video' as ToolType,
      title: 'Home Design Video',
      tag: 'BETA',
      desc: 'Generate cinematic camera pans and 4K video flythroughs',
      icon: PlayCircle,
      gradient: 'from-purple-600/30 to-pink-600/30 border-purple-500/40',
      iconColor: 'text-purple-400',
    },
    {
      id: '3d' as ToolType,
      title: '3D Walkthrough',
      tag: 'BETA',
      desc: 'Interactive 360° orbit and spatial perspective inspection',
      icon: Box,
      gradient: 'from-sky-600/30 to-teal-600/30 border-sky-500/40',
      iconColor: 'text-sky-400',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-t-3xl sm:rounded-3xl bg-[#09122c] border border-blue-500/30 p-5 shadow-2xl text-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-400" />
            <h3 className="text-base font-bold text-white tracking-tight">Create New Project</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of tools */}
        <div className="mt-4 flex flex-col gap-2.5">
          {toolOptions.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => {
                  onSelectTool(tool.id);
                  onClose();
                }}
                className={`group p-3.5 rounded-2xl bg-gradient-to-r ${tool.gradient} border hover:border-white/40 transition-all flex items-center justify-between text-left cursor-pointer active:scale-[0.99]`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center shrink-0">
                    <Icon className={`w-5 h-5 ${tool.iconColor}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{tool.title}</span>
                      <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-[#4338ca] text-[#c7d2fe]">
                        {tool.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5 leading-snug line-clamp-1">
                      {tool.desc}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
