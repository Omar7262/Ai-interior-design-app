import React, { useState } from 'react';
import {
  Plus,
  CheckCircle2,
  Clock,
  FileText,
  Heart,
  MoreVertical,
  LayoutGrid,
  List,
  ChevronDown,
  ArrowRight,
  Armchair,
  UtensilsCrossed,
  Bed,
  Bath,
} from 'lucide-react';
import { Project } from '../types';

interface MyProjectsScreenProps {
  projects: Project[];
  onNewProject: () => void;
  onViewProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
  favoritesMap?: Record<string, boolean>;
  onToggleFavorite?: (project: Project) => void;
}

export const MyProjectsScreen: React.FC<MyProjectsScreenProps> = ({
  projects,
  onNewProject,
  onViewProject,
  onDeleteProject,
  favoritesMap = {},
  onToggleFavorite,
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { label: 'All', icon: null },
    { label: 'Living Room', icon: Armchair },
    { label: 'Kitchen', icon: UtensilsCrossed },
    { label: 'Bedroom', icon: Bed },
    { label: 'Bathroom', icon: Bath },
  ];

  const toggleHeart = (p: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(p);
  };

  const filteredProjects = projects.filter((p) => {
    if (activeCategory === 'All') return true;
    return p.roomType?.toLowerCase().includes(activeCategory.toLowerCase());
  });

  return (
    <div className="flex flex-col gap-5 px-4 pb-12 animate-in fade-in duration-300">
      {/* HEADER SECTION */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white tracking-tight">My Projects</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-[250px] leading-relaxed">
            Your saved designs, ideas and ongoing projects.
          </p>
        </div>

        {/* New Project button */}
        <button
          onClick={onNewProject}
          className="py-2.5 px-4 rounded-2xl bg-gradient-to-r from-[#00b4d8] via-[#4361ee] to-[#8b5cf6] text-white text-xs font-bold flex items-center gap-1.5 shadow-[0_4px_20px_rgba(59,130,246,0.4)] hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* CATEGORY FILTER TABS */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.label;
          const Icon = cat.icon;
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
              {Icon && <Icon className="w-3.5 h-3.5 text-slate-300" />}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* SORT & LAYOUT CONTROLS */}
      <div className="flex items-center justify-between px-1">
        <button className="flex items-center gap-1 text-xs text-slate-300 bg-[#091329] px-3 py-1.5 rounded-xl border border-blue-500/15 hover:text-white cursor-pointer">
          <Clock className="w-3.5 h-3.5 text-sky-400" />
          <span>Recent</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
        </button>

        <div className="flex items-center gap-1 bg-[#091329] p-1 rounded-xl border border-blue-500/15">
          <button
            onClick={() => setLayoutMode('grid')}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              layoutMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setLayoutMode('list')}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              layoutMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Zero State or Project Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-6 rounded-2xl bg-[#091329] border border-blue-500/15 text-center flex flex-col items-center justify-center py-10 shadow-md">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-sky-400 mb-3">
            <LayoutGrid className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-white">No Projects Found (0)</h3>
          <p className="text-xs text-slate-400 max-w-xs mt-1.5 leading-relaxed">
            {projects.length === 0
              ? 'Your design portfolio starts at 0. Create your first interior design, floor plan, or exterior space using our AI generator!'
              : 'No projects match this category. Select All or create a new project.'}
          </p>
          <button
            onClick={onNewProject}
            className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white text-xs font-bold flex items-center gap-1.5 shadow hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>
      ) : (
        <div className={layoutMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3' : 'flex flex-col gap-2.5'}>
          {filteredProjects.map((p, idx) => {
            const isFav = !!favoritesMap[p.id];
            const status = p.status || (idx % 3 === 0 ? 'Completed' : idx % 3 === 1 ? 'In Progress' : 'Draft');

            return (
              <div
                key={p.id}
                onClick={() => onViewProject(p)}
                className="group relative rounded-2xl overflow-hidden bg-[#091329] border border-blue-500/15 hover:border-blue-400/40 transition-all flex flex-col justify-between cursor-pointer shadow-md"
              >
                {/* Thumbnail */}
                <div className="relative h-28 w-full overflow-hidden bg-black/40">
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Status Badge */}
                  <div
                    className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold text-white flex items-center gap-1 backdrop-blur-md shadow-xs ${
                      status === 'Completed'
                        ? 'bg-emerald-600/90'
                        : status === 'In Progress'
                        ? 'bg-blue-600/90'
                        : 'bg-slate-700/90'
                    }`}
                  >
                    {status === 'Completed' && <CheckCircle2 className="w-2.5 h-2.5 text-white" />}
                    {status === 'In Progress' && <Clock className="w-2.5 h-2.5 text-white" />}
                    {status === 'Draft' && <FileText className="w-2.5 h-2.5 text-white" />}
                    <span>{status}</span>
                  </div>

                  {/* Heart & 3-dots */}
                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    <button
                      onClick={(e) => toggleHeart(p, e)}
                      className="p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isFav ? 'text-rose-500 fill-rose-500' : 'text-white'
                        }`}
                      />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteProject(p.id);
                      }}
                      className="p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              {/* Details */}
              <div className="p-2.5 pt-2 flex flex-col justify-between flex-1 gap-2">
                <div>
                  <h3 className="text-xs font-bold text-white truncate group-hover:text-sky-300 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                    {p.roomType || 'Living Room'}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-white/5">
                  <span className="text-[9px] text-slate-400">
                    {p.date}
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
      )}
    </div>
  );
};
