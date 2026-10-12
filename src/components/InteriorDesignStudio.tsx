import React, { useState } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Upload,
  Sliders,
  Download,
  Share2,
  Bookmark,
  Check,
  RefreshCw,
  Layers,
  Palette,
  Sun,
  Maximize2,
} from 'lucide-react';
import { DESIGN_STYLES, LIGHTING_PRESETS, ROOM_PRESETS } from '../data/mockData';
import { Project } from '../types';

interface InteriorDesignStudioProps {
  onBack: () => void;
  onSaveProject: (project: Project) => void;
}

export const InteriorDesignStudio: React.FC<InteriorDesignStudioProps> = ({
  onBack,
  onSaveProject,
}) => {
  const [selectedPreset, setSelectedPreset] = useState(ROOM_PRESETS[0]);
  const [roomType, setRoomType] = useState('Living Room');
  const [selectedStyle, setSelectedStyle] = useState(DESIGN_STYLES[0].label);
  const [selectedLighting, setSelectedLighting] = useState(LIGHTING_PRESETS[0].label);
  const [customPrompt, setCustomPrompt] = useState(
    'Panoramic floor-to-ceiling garden windows, warm recessed LED lighting, custom low-profile sofa, natural oak and travertine marble'
  );
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [sliderPos, setSliderPos] = useState(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [customImage, setCustomImage] = useState<string | null>(null);

  // Active images
  const beforeImage = customImage || selectedPreset.beforeImage;
  const afterImage = selectedPreset.afterImage;

  const handleEnhancePrompt = async () => {
    setIsEnhancing(true);
    try {
      const res = await fetch('/api/ai/enhance-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPrompt: customPrompt,
          style: selectedStyle,
          roomType,
        }),
      });
      const data = await res.json();
      if (data.enhancedPrompt) {
        setCustomPrompt(data.enhancedPrompt);
      }
    } catch {
      setCustomPrompt(
        `Architectural 8k redesign of ${roomType} in ${selectedStyle} style, soft ${selectedLighting}, acoustic fluted timber panels, Italian bouclé lounge chairs, recessed ambient illumination, hyper-realistic interior photography.`
      );
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationStep('Analyzing room geometry & perspective...');
    await new Promise((r) => setTimeout(r, 600));

    setGenerationStep(`Synthesizing ${selectedStyle} architectural elements...`);
    await new Promise((r) => setTimeout(r, 800));

    setGenerationStep(`Simulating ${selectedLighting} illumination physics...`);
    await new Promise((r) => setTimeout(r, 700));

    setGenerationStep('Refining 4K textures & material shaders...');
    await new Promise((r) => setTimeout(r, 600));

    // Optional call to backend for data enrichments
    try {
      await fetch('/api/ai/redesign-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: customPrompt,
          roomType,
          style: selectedStyle,
          lighting: selectedLighting,
        }),
      });
    } catch (e) {
      console.log('Using local synthesis render', e);
    }

    setIsGenerating(false);
    setGenerationStep('');
    setSliderPos(50);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title: `${selectedStyle} ${roomType}`,
      type: 'interior',
      typeLabel: 'Interior Design',
      timeAgo: 'Just now',
      date: 'Today',
      thumbnail: afterImage,
      beforeImage,
      afterImage,
      style: selectedStyle,
      roomType,
      prompt: customPrompt,
      colorPalette: ['#E5E0D8', '#4A3E3D', '#2B2D42', '#8D99AE'],
      materials: ['Natural White Oak', 'Calacatta Honed Marble', 'Acoustic Wood Slats', 'Belgian Linen'],
      likes: 1,
      isFavorite: true,
    };
    onSaveProject(newProject);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="flex flex-col gap-6 px-4 pb-14 text-white animate-in fade-in duration-200">
      {/* Top Bar */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-300 hover:text-white p-2 -ml-2 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-semibold">Back to Home</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#4338ca] text-[#c7d2fe]">
            BETA AI STUDIO
          </span>
        </div>
      </div>

      {/* Main Preview Container with Before & After Slider */}
      <div className="relative rounded-3xl overflow-hidden border border-blue-500/25 bg-[#070e22] shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
        <div
          className="relative w-full h-[320px] md:h-[400px] select-none overflow-hidden"
          onMouseMove={(e) => {
            if (isDraggingSlider) {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
              setSliderPos((x / rect.width) * 100);
            }
          }}
          onTouchMove={(e) => {
            if (e.touches[0]) {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
              setSliderPos((x / rect.width) * 100);
            }
          }}
          onMouseDown={() => setIsDraggingSlider(true)}
          onMouseUp={() => setIsDraggingSlider(false)}
          onMouseLeave={() => setIsDraggingSlider(false)}
        >
          {/* AFTER Image (Full background) */}
          <img
            src={afterImage}
            alt="AI Redesign"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* BEFORE Image (Clipped by slider position) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <img
              src={beforeImage}
              alt="Original Room"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ width: '100vw', maxWidth: 'none', objectFit: 'cover' }}
            />
            {/* Dark indicator pill */}
            <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-semibold text-slate-200 border border-white/10">
              ORIGINAL
            </div>
          </div>

          {/* After pill label */}
          <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-md text-[10px] font-bold text-white border border-white/20 shadow-md">
            AI REDESIGN
          </div>

          {/* Vertical Slider Divider Line */}
          <div
            className="absolute top-0 bottom-0 w-[3px] bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] cursor-ew-resize z-20 flex items-center justify-center"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="w-8 h-8 rounded-full bg-white text-slate-900 shadow-xl flex items-center justify-center -ml-0.5 border-2 border-blue-600">
              <Sliders className="w-4 h-4 text-slate-800 rotate-90" />
            </div>
          </div>

          {/* Loading Overlay */}
          {isGenerating && (
            <div className="absolute inset-0 bg-[#050b1a]/85 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 text-center">
              <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 animate-ping" />
                <div className="w-16 h-16 rounded-full border-4 border-t-[#38bdf8] border-r-[#818cf8] border-b-[#c084fc] border-l-transparent animate-spin flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
              <h4 className="text-base font-bold text-white mb-1">Generating AI Architecture</h4>
              <p className="text-xs text-[#7dd3fc] animate-pulse">{generationStep}</p>
            </div>
          )}
        </div>

        {/* Toolbar below preview */}
        <div className="p-3.5 bg-[#091329] border-t border-blue-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSliderPos(sliderPos === 0 ? 100 : sliderPos === 100 ? 50 : 0)}
              className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Toggle View</span>
            </button>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Drag slider to compare transformation
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className={`text-xs px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                savedSuccess
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {savedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Save</span>
                </>
              )}
            </button>

            <a
              href={afterImage}
              download="desing-ai-interior-render.jpg"
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

      {/* Preset Starters OR Upload Your Own Room */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-bold text-slate-300 tracking-wide uppercase flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span>Select Room Template or Upload</span>
          </label>

          <label className="text-xs font-semibold text-[#38bdf8] hover:text-[#7dd3fc] cursor-pointer flex items-center gap-1">
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Photo</span>
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {ROOM_PRESETS.map((preset) => {
            const isSelected = selectedPreset.id === preset.id && !customImage;
            return (
              <button
                key={preset.id}
                onClick={() => {
                  setSelectedPreset(preset);
                  setRoomType(preset.type);
                  setCustomImage(null);
                }}
                className={`group relative rounded-xl overflow-hidden p-1.5 border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#38bdf8] bg-blue-900/30 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                    : 'border-white/10 bg-[#091329] hover:border-white/25'
                }`}
              >
                <div className="h-16 w-full rounded-lg overflow-hidden mb-1.5">
                  <img
                    src={preset.afterImage}
                    alt={preset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="text-[11px] font-semibold text-white truncate">{preset.name}</div>
                <div className="text-[9px] text-slate-400">{preset.style}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Style Selector */}
      <div>
        <label className="block text-xs font-bold text-slate-300 tracking-wide uppercase mb-2 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-purple-400" />
          <span>Architectural Design Style</span>
        </label>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {DESIGN_STYLES.map((style) => {
            const isSelected = selectedStyle === style.label;
            return (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.label)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-[0_0_15px_rgba(79,70,229,0.4)] border border-blue-400/50'
                    : 'bg-[#091329] text-slate-300 border border-white/10 hover:border-white/20'
                }`}
              >
                {style.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lighting Mood */}
      <div>
        <label className="block text-xs font-bold text-slate-300 tracking-wide uppercase mb-2 flex items-center gap-1.5">
          <Sun className="w-3.5 h-3.5 text-amber-400" />
          <span>Lighting & Mood Atmosphere</span>
        </label>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {LIGHTING_PRESETS.map((light) => {
            const isSelected = selectedLighting === light.label;
            return (
              <button
                key={light.id}
                onClick={() => setSelectedLighting(light.label)}
                className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-600/70 to-indigo-600/70 text-white font-semibold border border-amber-400/50'
                    : 'bg-[#091329] text-slate-300 border border-white/10 hover:border-white/20'
                }`}
              >
                {light.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom AI Prompt & Enhancer */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-bold text-slate-300 tracking-wide uppercase">
            Prompt Customization
          </label>
          <button
            onClick={handleEnhancePrompt}
            disabled={isEnhancing}
            className="text-[11px] font-semibold text-[#c084fc] hover:text-[#d8b4fe] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isEnhancing ? 'animate-spin' : ''}`} />
            <span>{isEnhancing ? 'Enhancing...' : 'Enhance with AI'}</span>
          </button>
        </div>

        <div className="relative">
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            rows={3}
            className="w-full rounded-2xl bg-[#091329] border border-blue-500/20 p-3.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-400/60 leading-relaxed"
            placeholder="Describe specific furniture, layout, materials, or lighting requirements..."
          />
        </div>
      </div>

      {/* Primary Action Button: Generate Redesign */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00b4d8] via-[#4361ee] to-[#8b5cf6] text-white font-bold flex items-center justify-center gap-2.5 shadow-[0_4px_30px_rgba(67,97,238,0.5)] hover:shadow-[0_6px_35px_rgba(139,92,246,0.7)] hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer text-sm"
      >
        <Sparkles className="w-5 h-5 text-white" />
        <span>Generate AI Interior Redesign</span>
      </button>

      {/* Material & Color Specs */}
      <div className="p-4 rounded-2xl bg-[#091329] border border-blue-500/15">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-3">
          Design Specifications & Materials
        </h4>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">
              Color Palette
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-[#E5E0D8] border border-white/20 shadow-xs" title="#E5E0D8" />
              <div className="w-5 h-5 rounded-md bg-[#4A3E3D] border border-white/20 shadow-xs" title="#4A3E3D" />
              <div className="w-5 h-5 rounded-md bg-[#2B2D42] border border-white/20 shadow-xs" title="#2B2D42" />
              <div className="w-5 h-5 rounded-md bg-[#8D99AE] border border-white/20 shadow-xs" title="#8D99AE" />
            </div>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">
              Curated Materials
            </span>
            <p className="text-[11px] text-slate-200">
              Natural White Oak · Belgian Bouclé · Calacatta Marble
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
