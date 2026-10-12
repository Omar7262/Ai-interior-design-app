import React, { useState } from 'react';
import {
  ArrowLeft,
  UploadCloud,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Download,
  Copy,
  MoreVertical,
  ChevronDown,
  Check,
} from 'lucide-react';
import { UPLOADS_LIST } from '../data/mockData';
import { UploadItem } from '../types';

interface UploadsScreenProps {
  onBack: () => void;
  onSelectUploadForStudio: (item: UploadItem) => void;
}

export const UploadsScreen: React.FC<UploadsScreenProps> = ({
  onBack,
  onSelectUploadForStudio,
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploads, setUploads] = useState<UploadItem[]>(UPLOADS_LIST);

  const categories = [
    { label: 'All', count: '12' },
    { label: 'Images', count: '8' },
    { label: 'Videos', count: '3' },
    { label: 'Documents', count: '1' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newItem: UploadItem = {
            id: `up-${Date.now()}`,
            name: file.name,
            type: file.type.startsWith('video') ? 'video' : 'image',
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            date: 'Today ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            thumbnail: event.target.result as string,
          };
          setUploads((prev) => [newItem, ...prev]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopy = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredUploads = uploads.filter((item) => {
    const matchCat =
      activeCategory === 'All'
        ? true
        : activeCategory === 'Images'
        ? item.type === 'image'
        : activeCategory === 'Videos'
        ? item.type === 'video'
        : item.type === 'document';
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="flex flex-col gap-5 px-4 pb-12 animate-in fade-in duration-300">
      {/* HEADER SECTION */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-2.5">
          <button
            onClick={onBack}
            className="p-1 -ml-1 text-slate-300 hover:text-white transition-colors cursor-pointer mt-1"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-tight">Uploads</h1>
            <p className="text-xs text-slate-300 mt-0.5">Manage your uploaded files and assets.</p>
          </div>
        </div>

        {/* Upload New Button */}
        <label className="py-2.5 px-4 rounded-2xl bg-gradient-to-r from-[#00b4d8] via-[#4361ee] to-[#8b5cf6] text-white text-xs font-bold flex items-center gap-1.5 shadow-[0_4px_20px_rgba(59,130,246,0.4)] hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap">
          <UploadCloud className="w-4 h-4" />
          <span>Upload New</span>
          <input type="file" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {/* CATEGORY FILTER TABS */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.label;
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
              <span>{cat.label}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/30 text-white/90">
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* SEARCH BAR */}
      <div className="flex items-center bg-[#091329] border border-blue-500/20 rounded-2xl p-2 px-3.5 shadow-sm">
        <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search uploads..."
          className="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-hidden"
        />
        <SlidersHorizontal className="w-4 h-4 text-slate-400 ml-2 cursor-pointer" />
      </div>

      {/* STORAGE USAGE CARD */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#091636] via-[#10245a] to-[#1a1c4a] border border-blue-400/20 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-[#38bdf8]">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Storage Usage</span>
              <span className="text-[11px] text-slate-300">
                {uploads.length === 0 ? '0 MB of 50 GB used' : `${uploads.length * 2.5} MB of 50 GB used`}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-sky-400">
            <span>{uploads.length === 0 ? '0%' : `${Math.min(100, uploads.length * 2)}%`}</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden mt-1">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full transition-all"
            style={{ width: `${uploads.length === 0 ? 0 : Math.min(100, uploads.length * 2)}%` }}
          />
        </div>
      </div>

      {/* RECENT UPLOADS SECTION */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-sm font-bold text-white tracking-tight">Recent Uploads</h2>
          <span className="text-xs text-slate-400">{uploads.length} files</span>
        </div>

        {/* List of Files or Zero State */}
        {filteredUploads.length === 0 ? (
          <div className="p-6 rounded-2xl bg-[#091329] border border-blue-500/15 text-center flex flex-col items-center justify-center py-8 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-sky-400 mb-2">
              <UploadCloud className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-white">No Files Uploaded Yet (0)</h4>
            <p className="text-[11px] text-slate-400 max-w-xs mt-1">
              Upload room photos or floor plan images above to style them in the studio.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {filteredUploads.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectUploadForStudio(item)}
                className="group p-2.5 rounded-2xl bg-[#091329] border border-blue-500/15 hover:border-blue-400/35 transition-all flex items-center justify-between cursor-pointer"
              >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-12 h-12 rounded-xl object-cover shrink-0 border border-white/5"
                />
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-white truncate group-hover:text-sky-300 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5 capitalize">
                    {item.type} • {item.size} • {item.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-slate-400">
                <a
                  href={item.thumbnail}
                  download={item.name}
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Download className="w-4 h-4" />
                </a>

                <button
                  onClick={(e) => handleCopy(item.id, e)}
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                >
                  {copiedId === item.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>

                <button
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};
