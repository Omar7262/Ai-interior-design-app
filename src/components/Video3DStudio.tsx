import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Play,
  Pause,
  Box,
  RotateCw,
  Sparkles,
  Volume2,
  VolumeX,
  Maximize2,
  Heart,
  Download,
  Share2,
  SkipBack,
  SkipForward,
  Film,
  Camera,
  Check,
  Flame,
} from 'lucide-react';
import { VideoItem } from '../types';
import { VIDEO_DESIGNS } from '../data/mockData';

interface Video3DStudioProps {
  mode: 'video' | '3d';
  onBack: () => void;
  selectedVideo?: VideoItem | null;
  onSelectVideo?: (video: VideoItem) => void;
  favoritesMap?: Record<string, boolean>;
  onToggleFavorite?: (item: any) => void;
  onDownloadRender?: () => void;
}

export const Video3DStudio: React.FC<Video3DStudioProps> = ({
  mode,
  onBack,
  selectedVideo,
  onSelectVideo,
  favoritesMap = {},
  onToggleFavorite,
  onDownloadRender,
}) => {
  // Current active video
  const [activeVideo, setActiveVideo] = useState<VideoItem>(
    selectedVideo || VIDEO_DESIGNS[0]
  );

  useEffect(() => {
    if (selectedVideo) {
      setActiveVideo(selectedVideo);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  }, [selectedVideo]);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(15);
  const [isOrbiting, setIsOrbiting] = useState(false);
  const [quality, setQuality] = useState<'1080p' | '4K' | '8K'>('4K');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const totalDuration = 9; // 9 seconds clip matching uploaded demos

  // Progress timer for realistic 9-second clip simulation
  useEffect(() => {
    let interval: any = null;
    if (isPlaying && mode === 'video') {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.1 * playbackSpeed;
          if (next >= totalDuration) {
            return 0; // loop clip
          }
          return next;
        });
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, playbackSpeed, mode]);

  const currentIndex = VIDEO_DESIGNS.findIndex((v) => v.id === activeVideo.id);

  const handlePrevVideo = () => {
    const prevIdx = (currentIndex - 1 + VIDEO_DESIGNS.length) % VIDEO_DESIGNS.length;
    const nextVid = VIDEO_DESIGNS[prevIdx];
    setActiveVideo(nextVid);
    onSelectVideo?.(nextVid);
    setCurrentTime(0);
  };

  const handleNextVideo = () => {
    const nextIdx = (currentIndex + 1) % VIDEO_DESIGNS.length;
    const nextVid = VIDEO_DESIGNS[nextIdx];
    setActiveVideo(nextVid);
    onSelectVideo?.(nextVid);
    setCurrentTime(0);
  };

  const handleDownload = () => {
    onDownloadRender?.();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handleShare = () => {
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2500);
  };

  const isFavorite = !!favoritesMap[activeVideo.id];

  // Dynamic Camera Animation Effect matching the camera movement of each demo
  const getCameraAnimationClass = (motion?: string) => {
    if (!isPlaying) return 'scale-100 translate-x-0 translate-y-0';
    switch (motion) {
      case 'Cinematic Pan':
        return 'scale-115 translate-x-6 duration-[9000ms] ease-in-out';
      case 'Crane Pull-Back':
      case 'Slow Zoom-Out':
        return 'scale-100 duration-[9000ms] ease-out';
      case 'Tracking Shot':
      case 'Tracking Glide':
        return 'scale-110 -translate-x-6 duration-[9000ms] ease-in-out';
      case 'Crane Pan':
        return 'scale-115 translate-x-4 -translate-y-2 duration-[9000ms] ease-in-out';
      case 'Drone Ascent':
      case 'Aerial Reveal':
        return 'scale-105 -translate-y-5 duration-[9000ms] ease-out';
      case 'Steady Glide':
        return 'scale-110 translate-x-3 translate-y-2 duration-[9000ms] ease-in-out';
      case 'Dolly Back':
        return 'scale-100 duration-[9000ms] ease-in-out';
      case 'Slow Zoom':
        return 'scale-120 duration-[9000ms] ease-in-out';
      case 'Cinematic Tilt':
        return 'scale-115 -translate-y-4 duration-[9000ms] ease-in-out';
      case 'Aerial Descent':
      case 'Pedestal Descent':
        return 'scale-115 translate-y-5 duration-[9000ms] ease-in-out';
      case 'Aerial Orbit':
        return 'scale-110 rotate-1 duration-[9000ms] ease-in-out';
      case 'Aerial Sweep':
      default:
        return 'scale-115 translate-x-5 duration-[9000ms] ease-in-out';
    }
  };

  const formattedTime = `00:0${Math.floor(currentTime)}`;
  const progressPercent = (currentTime / totalDuration) * 100;

  return (
    <div className="flex flex-col gap-5 px-4 pb-14 text-white animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-300 hover:text-white p-2 -ml-2 rounded-xl transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-5 h-5 text-sky-400 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-sm font-semibold">Back to Videos</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#4338ca] text-[#c7d2fe] border border-indigo-400/30 flex items-center gap-1">
            <Film className="w-3 h-3" />
            <span>{mode === 'video' ? 'AI VIDEO RENDER • 4K 60FPS' : '3D SPATIAL WALKTHROUGH'}</span>
          </span>
        </div>
      </div>

      {/* Main Interactive Canvas / Video Player */}
      <div
        ref={containerRef}
        className="relative rounded-3xl overflow-hidden border border-blue-500/25 bg-[#050b1a] shadow-[0_12px_45px_rgba(0,0,0,0.8)]"
      >
        {mode === 'video' ? (
          // Video simulation
          <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] overflow-hidden bg-black select-none">
            <img
              src={activeVideo.thumbnail}
              alt={activeVideo.title}
              key={activeVideo.id}
              className={`w-full h-full object-cover transition-all ${getCameraAnimationClass(
                activeVideo.cameraMotion
              )}`}
            />
            {/* Cinematic subtle ambient lighting overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none" />

            {/* Top HUD: Camera details & motion tracker */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-mono text-red-400 border border-white/10 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="font-bold">REC {formattedTime} / 00:09</span>
                <span className="text-slate-400">[{quality} 60FPS]</span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-semibold text-sky-300 border border-white/10 shadow-lg">
                <Camera className="w-3 h-3 text-sky-400" />
                <span>{activeVideo.cameraMotion || 'Cinematic Pan'}</span>
              </div>
            </div>

            {/* Center Quick Play Overlay Button when paused */}
            {!isPlaying && (
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer backdrop-blur-xs border border-white/20"
                title="Play Video"
              >
                <Play className="w-7 h-7 fill-white ml-1" />
              </button>
            )}

            {/* Bottom Controls Area */}
            <div className="absolute bottom-0 left-0 right-0 p-3 pt-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col gap-2.5">
              {/* Scrubber Timeline Bar */}
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  setCurrentTime(Math.max(0, Math.min(totalDuration, pos * totalDuration)));
                }}
                className="relative w-full h-1.5 bg-white/20 hover:h-2 rounded-full cursor-pointer transition-all overflow-hidden group"
              >
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 rounded-full transition-all duration-100"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Bottom Control Buttons */}
              <div className="flex items-center justify-between gap-2">
                {/* Left: Play/Pause, Previous, Next, Time */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-slate-900" /> : <Play className="w-4 h-4 fill-slate-900 ml-0.5" />}
                  </button>

                  <button
                    onClick={handlePrevVideo}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    title="Previous Demo Video"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleNextVideo}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    title="Next Demo Video"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>

                  <span className="text-[11px] font-mono text-slate-300 ml-1">
                    {formattedTime} / 00:09
                  </span>
                </div>

                {/* Right: Audio, Speed, Quality, Fullscreen */}
                <div className="flex items-center gap-2">
                  {/* Speed toggle */}
                  <button
                    onClick={() => setPlaybackSpeed((s) => (s === 1 ? 1.5 : s === 1.5 ? 0.5 : 1))}
                    className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[10px] font-mono text-slate-300 transition-colors cursor-pointer"
                    title="Playback Speed"
                  >
                    {playbackSpeed}x
                  </button>

                  {/* Audio Mute toggle */}
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    title={isMuted ? 'Unmute Ambient Sound' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-sky-400" />}
                  </button>

                  <span className="px-2 py-0.5 rounded bg-blue-600/40 border border-blue-400/30 text-[10px] font-mono text-sky-200">
                    {quality}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // 3D Walkthrough Orbit Canvas
          <div
            className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] bg-[#030712] overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center"
            onMouseMove={(e) => {
              if (isOrbiting) {
                setRotationAngle((prev) => (prev + e.movementX * 0.4) % 360);
              }
            }}
            onMouseDown={() => setIsOrbiting(true)}
            onMouseUp={() => setIsOrbiting(false)}
            onMouseLeave={() => setIsOrbiting(false)}
          >
            <div
              className="relative w-full h-full transition-transform duration-75"
              style={{
                transform: `perspective(1000px) rotateY(${rotationAngle}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                alt="3D Space"
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>

            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-xs font-medium text-slate-200 border border-white/10 flex items-center gap-2 pointer-events-none">
              <Box className="w-4 h-4 text-sky-400" />
              <span>Drag to Pan & Orbit 360° Space</span>
            </div>

            <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-md bg-black/60 text-[10px] font-mono text-slate-400">
              Yaw: {Math.round(rotationAngle)}°
            </div>
          </div>
        )}

        {/* Studio Action Strip */}
        <div className="p-3.5 bg-[#0a1329] border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-300 font-medium">Resolution:</span>
            <div className="flex gap-1">
              {(['1080p', '4K', '8K'] as const).map((q) => (
                <button
                  key={q}
                  onClick={() => setQuality(q)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    quality === q
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (mode === '3d') setRotationAngle((a) => (a + 45) % 360);
                else {
                  setCurrentTime(0);
                  setIsPlaying(true);
                }
              }}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <RotateCw className="w-3.5 h-3.5 text-sky-400" />
              <span>Replay</span>
            </button>

            <button
              onClick={() => onToggleFavorite?.(activeVideo)}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isFavorite
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
              title={isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-400' : ''}`} />
            </button>

            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 active:scale-95 text-xs font-bold text-white flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
            >
              {downloadSuccess ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Download className="w-3.5 h-3.5" />}
              <span>{downloadSuccess ? 'Downloaded!' : 'Export Clip'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Video Details Card */}
      <div className="p-4 rounded-2xl bg-[#09142f]/90 border border-blue-500/20 shadow-xl flex flex-col gap-2.5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white tracking-tight">
                {activeVideo.title}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-500/20 text-sky-300 border border-blue-400/30">
                {activeVideo.badge}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {activeVideo.description ||
                'High-fidelity architectural animation with realistic lighting, volumetric rays, and ultra-smooth cinematic camera movement.'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10 text-[11px] text-slate-400">
          <span className="px-2.5 py-1 rounded-lg bg-white/5 text-slate-200 font-medium">
            Category: <strong className="text-white">{activeVideo.category}</strong>
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white/5 text-slate-200 font-medium">
            Space: <strong className="text-white">{activeVideo.space}</strong>
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-sky-300 font-medium border border-blue-500/20">
            Camera: <strong className="text-sky-200">{activeVideo.cameraMotion || 'Cinematic Pan'}</strong>
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 font-medium border border-emerald-500/20">
            Duration: <strong>0:09</strong>
          </span>
        </div>
      </div>

      {/* SELECT FROM ALL 16 DEMO VIDEOS */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#38bdf8]" />
            <h3 className="text-sm font-bold text-white tracking-tight">
              All 16 Architectural Video Demos
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Demo {currentIndex + 1} of {VIDEO_DESIGNS.length}
          </span>
        </div>

        {/* Horizontal scroll thumbnails list */}
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {VIDEO_DESIGNS.map((vid, idx) => {
            const isSelected = vid.id === activeVideo.id;
            return (
              <button
                key={vid.id}
                onClick={() => {
                  setActiveVideo(vid);
                  onSelectVideo?.(vid);
                  setCurrentTime(0);
                  setIsPlaying(true);
                }}
                className={`relative flex-shrink-0 w-36 rounded-xl overflow-hidden border transition-all text-left group cursor-pointer ${
                  isSelected
                    ? 'border-sky-400 ring-2 ring-sky-400/50 scale-102 shadow-lg'
                    : 'border-white/10 hover:border-white/30 opacity-75 hover:opacity-100'
                }`}
              >
                <div className="relative h-20 w-full overflow-hidden bg-black">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute top-1 left-1 px-1.5 py-0.2 rounded bg-black/70 text-[8px] font-bold text-white">
                    #{idx + 1}
                  </div>
                  <div className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/70 text-[8px] font-mono text-white flex items-center gap-0.5">
                    <Play className="w-2 h-2 fill-white" />
                    <span>0:09</span>
                  </div>
                </div>

                <div className="p-2 bg-[#081226]">
                  <h4 className="text-[11px] font-bold text-white truncate">{vid.title}</h4>
                  <p className="text-[9px] text-slate-400 truncate mt-0.5">{vid.category}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
