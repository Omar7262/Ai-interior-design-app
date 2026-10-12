import React, { useState } from 'react';
import { Folder, Search, Sliders, Trash2, Eye, Calendar, Sparkles } from 'lucide-react';
import { Project } from '../types';

interface ProjectsManagerProps {
  projects: Project[];
  onViewProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
  onNewProject: () => void;
}

export const ProjectsManager: React.FC<ProjectsManagerProps> = ({
  projects,
  onViewProject,
  onDeleteProject,
  onNewProject,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = projects.filter((p) => {
    const matchesFilter = filterType === 'all' ? true : p.type === filterType;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.style.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-5 px-4 pb-14 text-white animate-in fade-in duration-200">
      {/* Title & Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Folder className="w-5 h-5 text-sky-400" />
            <span>My Design Projects</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {projects.length} project{projects.length === 1 ? '' : 's'} saved in your workspace
          </p>
        </div>

        <button
          onClick={onNewProject}
          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-xs font-semibold text-white shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
        >
          + New
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter by title, room, or style..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#091329] border border-blue-500/20 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-400"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {[
          { id: 'all', label: 'All Projects' },
          { id: 'interior', label: 'Interior' },
          { id: 'floorplan', label: 'Floor Plans' },
          { id: 'exterior', label: 'Exterior' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
              filterType === tab.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-[#091329] text-slate-400 border border-white/10 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 px-4 bg-[#091329] rounded-2xl border border-white/5">
          <Folder className="w-10 h-10 text-slate-500 mx-auto mb-2 opacity-50" />
          <h4 className="text-sm font-bold text-white mb-1">No Projects Found</h4>
          <p className="text-xs text-slate-400 max-w-xs mx-auto mb-4">
            Try adjusting your search criteria or create a brand new design project.
          </p>
          <button
            onClick={onNewProject}
            className="px-4 py-2 rounded-xl bg-blue-600 text-xs font-semibold text-white"
          >
            Create New Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className="group rounded-2xl overflow-hidden bg-[#091329] border border-blue-500/15 hover:border-blue-400/40 transition-all flex flex-col shadow-md"
            >
              <div
                onClick={() => onViewProject(proj)}
                className="relative h-40 w-full overflow-hidden cursor-pointer"
              >
                <img
                  src={proj.thumbnail}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-sky-300 border border-white/10">
                  {proj.typeLabel}
                </div>
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-slate-300">
                  {proj.timeAgo}
                </div>
              </div>

              <div className="p-3 flex items-center justify-between">
                <div>
                  <h3
                    onClick={() => onViewProject(proj)}
                    className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors cursor-pointer truncate max-w-[180px]"
                  >
                    {proj.title}
                  </h3>
                  <p className="text-[10px] text-slate-400">{proj.style}</p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onViewProject(proj)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-blue-600/20 text-sky-400 transition-colors cursor-pointer"
                    title="View Project"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteProject(proj.id)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-600/20 text-rose-400 transition-colors cursor-pointer"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
