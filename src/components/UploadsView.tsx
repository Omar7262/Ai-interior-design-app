import React, { useState } from 'react';
import { ArrowLeft, UploadCloud, Plus, Image as ImageIcon } from 'lucide-react';

interface UploadsViewProps {
  onBack: () => void;
  onSelectImageForStudio: (imageUrl: string) => void;
}

export const UploadsView: React.FC<UploadsViewProps> = ({ onBack, onSelectImageForStudio }) => {
  const [userUploads, setUserUploads] = useState<string[]>([
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1540518614846-7ede433c4b13?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
  ]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUserUploads((prev) => [event.target?.result as string, ...prev]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-6 px-4 pb-14 text-white animate-in fade-in duration-200">
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-300 hover:text-white p-2 -ml-2 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-semibold">Back to Menu</span>
        </button>

        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#4338ca] text-[#c7d2fe]">
          BETA CLOUD SYNC
        </span>
      </div>

      {/* Upload Zone */}
      <label className="border-2 border-dashed border-blue-500/30 hover:border-blue-400/60 rounded-3xl p-6 flex flex-col items-center justify-center text-center bg-[#091329]/60 cursor-pointer transition-all hover:bg-blue-950/20">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/15 flex items-center justify-center text-[#38bdf8] mb-3">
          <UploadCloud className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-white mb-1">Upload New Room Photo</h3>
        <p className="text-xs text-slate-400 max-w-xs">
          Take a photo of your living room, kitchen, or empty floor plan to redesign with AI
        </p>
        <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </label>

      {/* Gallery of uploaded spaces */}
      <div>
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-3">
          Your Uploaded Spaces ({userUploads.length})
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {userUploads.map((img, i) => (
            <div
              key={i}
              className="group relative rounded-2xl overflow-hidden bg-[#091329] border border-white/10"
            >
              <div className="h-32 w-full overflow-hidden">
                <img
                  src={img}
                  alt={`Upload ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-300 font-medium">Room Source #{i + 1}</span>
                <button
                  onClick={() => onSelectImageForStudio(img)}
                  className="px-2 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-[10px] font-bold text-white cursor-pointer"
                >
                  Redesign
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
