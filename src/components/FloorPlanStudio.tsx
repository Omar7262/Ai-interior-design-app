import React, { useState } from 'react';
import { ArrowLeft, LayoutGrid, Layers, Download, Bookmark, Sparkles, Check, Eye } from 'lucide-react';
import { Project } from '../types';

interface FloorPlanStudioProps {
  onBack: () => void;
  onSaveProject: (project: Project) => void;
}

export const FloorPlanStudio: React.FC<FloorPlanStudioProps> = ({ onBack, onSaveProject }) => {
  const [viewMode, setViewMode] = useState<'blueprint' | 'photoreal' | 'isometric'>('photoreal');
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const rooms = [
    { id: 'living', name: 'Open Living Pavilion', dim: '7.8m × 5.2m', area: '40.5 m²', color: 'border-sky-500/50 bg-sky-500/10' },
    { id: 'master', name: 'Master Suite & Bath', dim: '6.4m × 4.6m', area: '29.4 m²', color: 'border-purple-500/50 bg-purple-500/10' },
    { id: 'kitchen', name: 'Chef Kitchen & Dining', dim: '5.5m × 4.2m', area: '23.1 m²', color: 'border-indigo-500/50 bg-indigo-500/10' },
    { id: 'courtyard', name: 'Atrium Zen Courtyard', dim: '4.2m × 4.2m', area: '17.6 m²', color: 'border-emerald-500/50 bg-emerald-500/10' },
    { id: 'pool', name: 'Infinity Pool & Sun Deck', dim: '12.0m × 3.8m', area: '45.6 m²', color: 'border-cyan-500/50 bg-cyan-500/10' },
  ];

  const handleGenerateNew = async () => {
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 1400));
    setIsGenerating(false);
  };

  const handleSave = () => {
    const project: Project = {
      id: `proj-${Date.now()}`,
      title: 'Modern Pavilion Floor Plan',
      type: 'floorplan',
      typeLabel: 'Floor Plan',
      timeAgo: 'Just now',
      date: 'Today',
      thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      style: 'Modern Pavilion Villa',
      roomType: '4 Bedroom + Central Courtyard',
      prompt: 'Detailed 2D/3D master floor plan blueprint with central courtyard atrium, open-plan living pavilion, kitchen island, and infinity pool deck.',
      likes: 1,
      isFavorite: true,
    };
    onSaveProject(project);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="flex flex-col gap-6 px-4 pb-14 text-white animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-300 hover:text-white p-2 -ml-2 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-semibold">Back to Home</span>
        </button>

        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#1d4ed8] text-[#bfdbfe]">
          AI FLOOR PLANNER
        </span>
      </div>

      {/* Main Floor Plan Visualizer */}
      <div className="relative rounded-3xl overflow-hidden border border-blue-500/25 bg-[#060e22] shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
        {/* Mode Selector Tabs */}
        <div className="p-3 bg-[#0a1329] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-xl">
            <button
              onClick={() => setViewMode('photoreal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'photoreal'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Photoreal 3D
            </button>
            <button
              onClick={() => setViewMode('blueprint')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'blueprint'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2D Blueprint
            </button>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Area</span>
            <span className="text-xs font-extrabold text-[#38bdf8]">262 m² (2,820 sq ft)</span>
          </div>
        </div>

        {/* Visualizer Display */}
        <div className="relative w-full h-[320px] md:h-[380px] bg-[#050b1a] flex items-center justify-center overflow-hidden">
          {viewMode === 'photoreal' ? (
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
              alt="Floor Plan Render"
              className="w-full h-full object-cover"
            />
          ) : (
            // Interactive 2D Blueprint Grid
            <div className="relative w-full h-full p-4 bg-[#0a183d] flex flex-col items-center justify-center">
              {/* Grid pattern background */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, #38bdf8 1px, transparent 1px), linear-gradient(to right, rgba(56,189,248,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.1) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Architectural Rooms Layout diagram */}
              <div className="relative w-full max-w-sm h-64 border-2 border-[#38bdf8]/60 rounded-xl p-2 grid grid-cols-2 gap-2 bg-[#06122d]/80 backdrop-blur-xs">
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoom(room.id)}
                    className={`rounded-lg border p-2 flex flex-col justify-between cursor-pointer transition-all ${
                      room.color
                    } ${selectedRoom === room.id ? 'ring-2 ring-white scale-[1.02]' : ''}`}
                  >
                    <div>
                      <span className="text-[10px] font-bold text-white block">{room.name}</span>
                      <span className="text-[9px] text-slate-300">{room.dim}</span>
                    </div>
                    <span className="text-[10px] font-extrabold text-sky-300 self-end">
                      {room.area}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isGenerating && (
            <div className="absolute inset-0 bg-[#050b1a]/85 backdrop-blur-md flex flex-col items-center justify-center p-6">
              <Sparkles className="w-8 h-8 text-[#38bdf8] animate-spin mb-3" />
              <p className="text-sm font-semibold text-white">Re-optimizing Spatial Circulation...</p>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="p-3 bg-[#0a1329] border-t border-white/10 flex items-center justify-between">
          <button
            onClick={handleGenerateNew}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold flex items-center gap-1.5 cursor-pointer text-slate-200"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Auto-Layout Variant</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className={`text-xs px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                savedSuccess ? 'bg-emerald-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {savedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Save Plan</span>
                </>
              )}
            </button>
            <a
              href="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
              download="floorplan-render.jpg"
              target="_blank"
              rel="noreferrer"
              className="text-xs px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-sky-200 border border-blue-400/30 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </a>
          </div>
        </div>
      </div>

      {/* Room Program List */}
      <div className="p-4 rounded-2xl bg-[#091329] border border-blue-500/15">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-3 flex items-center gap-2">
          <LayoutGrid className="w-4 h-4 text-sky-400" />
          <span>Architectural Program Breakdown</span>
        </h3>
        <div className="flex flex-col gap-2">
          {rooms.map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5"
            >
              <div>
                <span className="text-xs font-semibold text-white block">{r.name}</span>
                <span className="text-[10px] text-slate-400">Dimensions: {r.dim}</span>
              </div>
              <span className="text-xs font-bold text-[#38bdf8]">{r.area}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
