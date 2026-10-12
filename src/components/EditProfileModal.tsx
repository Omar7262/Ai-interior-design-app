import React, { useState } from 'react';
import {
  X,
  Camera,
  Upload,
  Check,
  User,
  Sparkles,
  Mail,
  MapPin,
  Briefcase,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { UserProfile } from '../types';
import { USER_PROFILE, GMAIL_USER_PROFILE, EMPTY_EMAIL_USER_PROFILE } from '../data/mockData';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: UserProfile;
  onSaveProfile: (updatedProfile: UserProfile) => void;
}

export const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80',
];

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile,
}) => {
  const [formData, setFormData] = useState<UserProfile>(currentProfile);
  const [isSaved, setIsSaved] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setFormData(currentProfile);
    }
  }, [isOpen, currentProfile]);

  if (!isOpen) return null;

  const handleAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prev) => ({
            ...prev,
            avatar: event.target?.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 600);
  };

  const handleReset = () => {
    setFormData(currentProfile.authProvider === 'email' ? EMPTY_EMAIL_USER_PROFILE : GMAIL_USER_PROFILE);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto no-scrollbar rounded-3xl bg-[#09142e] border border-blue-500/30 p-5 sm:p-6 shadow-2xl text-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/10 sticky top-0 bg-[#09142e]/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center text-[#38bdf8]">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Edit Profile</h3>
              <p className="text-[11px] text-slate-400">Update your public designer persona and details</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          {/* Avatar Section */}
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="relative w-20 h-20 rounded-full p-[3px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 shadow-xl mb-3">
              {formData.avatar ? (
                <img
                  src={formData.avatar}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-[#13203f] flex items-center justify-center text-slate-400">
                  <User className="w-9 h-9 text-slate-400" />
                </div>
              )}
              <label className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-blue-600 hover:bg-blue-500 border-2 border-[#09142e] flex items-center justify-center text-white cursor-pointer shadow-lg transition-transform active:scale-95" title="Upload custom photo">
                <Camera className="w-3.5 h-3.5" />
                <input type="file" accept="image/*" onChange={handleAvatarFile} className="hidden" />
              </label>
            </div>

            <span className="text-xs font-semibold text-slate-200 mb-2">Profile Photo</span>

            {/* Quick avatar preset picks + Empty Silhouette option */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {/* Empty Silhouette button */}
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, avatar: '' }))}
                className={`w-9 h-9 rounded-full bg-[#13203f] flex items-center justify-center border-2 transition-all cursor-pointer shrink-0 ${
                  !formData.avatar
                    ? 'border-teal-400 ring-2 ring-teal-400/50 scale-105 text-teal-300'
                    : 'border-white/20 hover:border-white/60 text-slate-400 hover:text-white'
                }`}
                title="Empty Person Silhouette (No Photo)"
              >
                <User className="w-4 h-4" />
              </button>

              {AVATAR_PRESETS.map((preset, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setFormData((prev) => ({ ...prev, avatar: preset }))}
                  className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    formData.avatar === preset
                      ? 'border-sky-400 ring-2 ring-sky-400/50 scale-105'
                      : 'border-white/20 hover:border-white/60 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={preset} alt={`Preset ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}

              <label className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-dashed border-white/40 flex items-center justify-center text-sky-400 cursor-pointer shrink-0 transition-colors" title="Upload from Device">
                <Upload className="w-3.5 h-3.5" />
                <input type="file" accept="image/*" onChange={handleAvatarFile} className="hidden" />
              </label>
            </div>
          </div>

          {/* Name & Handle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wide mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#060d21] border border-blue-500/25 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-400"
                placeholder="e.g. Omar Shooter (or leave blank)"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wide mb-1">
                Username / Handle
              </label>
              <input
                type="text"
                value={formData.handle}
                onChange={(e) => {
                  let val = e.target.value;
                  if (val.length > 0 && !val.startsWith('@')) val = '@' + val;
                  setFormData({ ...formData, handle: val });
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#060d21] border border-blue-500/25 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-400"
                placeholder="e.g. @empty_person"
              />
            </div>
          </div>

          {/* Title & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wide mb-1 flex items-center gap-1">
                <Briefcase className="w-3 h-3 text-sky-400" />
                <span>Designer Title / Specialty</span>
              </label>
              <input
                type="text"
                value={formData.title || 'Architectural Designer & Spatial Creator'}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#060d21] border border-blue-500/25 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-400"
                placeholder="e.g. Senior Interior Architect"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wide mb-1 flex items-center gap-1">
                <Mail className="w-3 h-3 text-purple-400" />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                value={formData.email || 'omar@desingai.com'}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#060d21] border border-blue-500/25 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-400"
                placeholder="e.g. you@example.com"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wide mb-1">
              Bio & Tagline
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-3 rounded-xl bg-[#060d21] border border-blue-500/25 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-400 leading-relaxed"
              placeholder="Tell other designers about your design style and philosophy..."
            />
          </div>

          {/* Verification & Pro Toggles */}
          <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={formData.isVerified ?? true}
                onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
              />
              <span className="text-slate-200 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Verified Badge</span>
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={formData.isPremium}
                onChange={(e) => setFormData({ ...formData, isPremium: e.target.checked })}
                className="w-4 h-4 rounded text-purple-600 focus:ring-0 cursor-pointer"
              />
              <span className="text-slate-200 font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Premium Member</span>
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setFormData({ ...EMPTY_EMAIL_USER_PROFILE, stats: formData.stats })}
                className="px-2.5 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-400/25 text-[11px] font-semibold transition-colors cursor-pointer"
                title="Reset to clean Empty Person profile (Email mode)"
              >
                Empty Person
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...GMAIL_USER_PROFILE, stats: formData.stats })}
                className="px-2.5 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-sky-300 border border-blue-400/25 text-[11px] font-semibold transition-colors cursor-pointer"
                title="Restore Gmail Profile (Omar Shooter)"
              >
                Gmail Profile
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#00b4d8] via-[#4361ee] to-[#8b5cf6] text-xs font-bold text-white flex items-center gap-1.5 shadow-[0_4px_15px_rgba(59,130,246,0.5)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                {isSaved ? <Check className="w-3.5 h-3.5" /> : null}
                <span>{isSaved ? 'Saved!' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
