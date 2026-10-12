import React, { useState } from 'react';
import { ArrowLeft, Building2, Sun, CloudRain, Moon, Download, Bookmark, Sparkles, Check } from 'lucide-react';
import { Project } from '../types';

interface ExteriorDesignStudioProps {
  onBack: () => void;
  onSaveProject: (project: Project) => void;
}

export const ExteriorDesignStudio: React.FC<ExteriorDesignStudioProps> = ({
  onBack,
  onSaveProject,
}) => {
  const [selectedStyle, setSelectedStyle] = useState('Modern Architectural Villa');
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState('Dusk Twilight');
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const styles = [
    { id: 'cubic', name: 'Modern Architectural Villa', img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80' },
    { id: 'cliff', name: 'Infinity Pool Pavilion', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80' },
    { id: 'scandi', name: 'Scandinavian Timber House', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80' },
  ];

  const activeImage = styles.find((s) => s.name === selectedStyle)?.img || styles[0].img;

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsGenerating(false);
  };

  const handleSave = () => {
    const project: Project = {
      id: `proj-${Date.now()}`,
      title: selectedStyle,
      type: 'exterior',
      typeLabel: 'Exterior Design',
      timeAgo: 'Just now',
      date: 'Today',
      thumbnail: activeImage,
      afterImage: activeImage,
      style: selectedStyle,
      roomType: 'Exterior Facade',
      prompt: `Contemporary ${selectedStyle} at ${selectedTimeOfDay}, featuring floor-to-ceiling glass pavilions, integrated architectural lights, and landscape surroundings.`,
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

        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#4338ca] text-[#c7d2fe]">
          AI EXTERIOR STUDIO
        </span>
      </div>

      {/* Main Image View */}
      <div className="relative rounded-3xl overflow-hidden border border-blue-500/25 bg-[#060e22] shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
        <div className="relative w-full h-[320px] md:h-[380px]">
          <img
            src={activeImage}
            alt={selectedStyle}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-bold text-white border border-white/20">
            {selectedTimeOfDay.toUpperCase()}
          </div>

          {isGenerating && (
            <div className="absolute inset-0 bg-[#050b1a]/85 backdrop-blur-md flex flex-col items-center justify-center p-6">
              <Sparkles className="w-8 h-8 text-[#38bdf8] animate-spin mb-3" />
              <p className="text-sm font-semibold text-white">Rendering Facade Geometry & Materials...</p>
            </div>
          )}
        </div>

        {/* Action bar */}
        <div className="p-3 bg-[#0a1329] border-t border-white/10 flex items-center justify-between">
          <button
            onClick={handleGenerate}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold flex items-center gap-1.5 cursor-pointer text-slate-200"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Generate Exterior Iteration</span>
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
                  <span>Save</span>
                </>
              )}
            </button>
            <a
              href={activeImage}
              download="exterior-render.jpg"
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

      {/* Style Options */}
      <div>
        <label className="block text-xs font-bold text-slate-300 tracking-wide uppercase mb-2 flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-sky-400" />
          <span>Architectural Facade Typology</span>
        </label>
        <div className="grid grid-cols-3 gap-2.5">
          {styles.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedStyle(s.name)}
              className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                selectedStyle === s.name
                  ? 'border-[#38bdf8] bg-blue-900/30 shadow-md'
                  : 'border-white/10 bg-[#091329] hover:border-white/20'
              }`}
            >
              <div className="h-16 w-full rounded-lg overflow-hidden mb-1.5">
                <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-[11px] font-semibold text-white block truncate">
                {s.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lighting Time of Day */}
      <div>
        <label className="block text-xs font-bold text-slate-300 tracking-wide uppercase mb-2">
          Environment & Atmospheric Sky
        </label>
        <div className="flex gap-2">
          {['Dusk Twilight', 'Sunny Noon', 'Golden Sunset', 'Moody Night'].map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTimeOfDay(time)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all ${
                selectedTimeOfDay === time
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-[#091329] text-slate-300 border border-white/10'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
