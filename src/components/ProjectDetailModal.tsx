import React, { useState } from 'react';
import { X, Sliders, Download, Calendar, Layers, Palette, RefreshCw, Heart } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (project: Project) => void;
  onDownload?: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  isFavorite = false,
  onToggleFavorite,
  onDownload,
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  if (!project) return null;

  const hasBefore = !!project.beforeImage;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto no-scrollbar rounded-3xl bg-[#081127] border border-blue-500/30 shadow-2xl text-white">
        {/* Top bar */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#081127]/90 backdrop-blur-md z-30">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">{project.title}</h3>
            <span className="text-[11px] text-slate-400">{project.typeLabel} · {project.date}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onToggleFavorite?.(project)}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                isFavorite
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image View or Slider */}
        <div className="p-4">
          {hasBefore ? (
            <div
              className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden select-none border border-blue-500/20"
              onMouseMove={(e) => {
                if (isDragging) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                  setSliderPos((x / rect.width) * 100);
                }
              }}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
            >
              <img
                src={project.afterImage}
                alt="After"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src={project.beforeImage}
                  alt="Before"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ width: '100vw', maxWidth: 'none', objectFit: 'cover' }}
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 text-[10px] font-bold">
                  BEFORE
                </div>
              </div>

              <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-blue-600/80 text-[10px] font-bold">
                AFTER
              </div>

              {/* Slider Line */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-white shadow-lg cursor-ew-resize z-20 flex items-center justify-center"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="w-7 h-7 rounded-full bg-white shadow-lg flex items-center justify-center -ml-0.5">
                  <Sliders className="w-3.5 h-3.5 text-slate-900 rotate-90" />
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-72 rounded-2xl overflow-hidden border border-blue-500/20">
              <img
                src={project.afterImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {hasBefore && (
            <p className="text-center text-[11px] text-slate-400 mt-2">
              Slide handle horizontally to compare before and after
            </p>
          )}

          {/* Prompt and Metadata */}
          <div className="mt-4 flex flex-col gap-3">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] uppercase font-bold text-sky-400 block mb-1">
                AI Prompt Specifications
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-mono">
                "{project.prompt}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] uppercase font-bold text-purple-400 block mb-1">
                  Architectural Style
                </span>
                <span className="text-xs font-semibold text-white">{project.style}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">
                  Room / Space
                </span>
                <span className="text-xs font-semibold text-white">
                  {project.roomType || 'Spatial Pavilion'}
                </span>
              </div>
            </div>

            {project.materials && (
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                  Key Material Finishes
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.materials.map((mat, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-white/10 text-[11px] text-slate-200"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 flex items-center justify-end gap-2 bg-[#060e22]">
          <a
            href={project.afterImage}
            download={`${project.title.toLowerCase().replace(/\s+/g, '-')}-render.jpg`}
            target="_blank"
            rel="noreferrer"
            onClick={() => onDownload?.()}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer shadow-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download 4K Render</span>
          </a>
        </div>
      </div>
    </div>
  );
};
