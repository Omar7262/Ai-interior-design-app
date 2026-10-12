import React, { useState } from 'react';
import { Trash2, AlertTriangle, X, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
  profile: UserProfile;
  projectsCount?: number;
  favoritesCount?: number;
}

export const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
  onConfirmDelete,
  profile,
  projectsCount = 0,
  favoritesCount = 0,
}) => {
  const [confirmText, setConfirmText] = useState('');
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const isConfirmed = confirmText.trim().toUpperCase() === 'DELETE';

  const handleDelete = () => {
    if (!isConfirmed) return;
    setIsDeleting(true);
    setTimeout(() => {
      onConfirmDelete();
      setIsDeleting(false);
      setConfirmText('');
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md rounded-3xl bg-[#090d1e] border border-rose-500/30 p-6 shadow-2xl relative overflow-hidden flex flex-col gap-5 text-white animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-account-title"
      >
        {/* Ambient Danger Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-rose-900/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <Trash2 className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <h2 id="delete-account-title" className="text-lg font-bold text-white tracking-tight">
                Delete Account
              </h2>
              <p className="text-xs text-rose-300/80 mt-0.5">
                Permanently erase profile and all design data
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warning Banner */}
        <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/30 flex items-start gap-3 relative z-10">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs text-rose-200/90 leading-relaxed">
            <span className="font-semibold text-rose-200 block mb-0.5">
              Warning: This action cannot be undone.
            </span>
            Deleting your account will immediately and permanently erase all your data, designs, and personal information from this app.
          </div>
        </div>

        {/* Impact List */}
        <div className="space-y-2 relative z-10">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-1">
            What will be permanently deleted:
          </div>
          <div className="bg-[#050814]/80 rounded-2xl border border-white/5 p-3.5 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                Profile & Identity
              </span>
              <span className="font-medium text-white truncate max-w-[160px]">
                {profile.name} {profile.email ? `(${profile.email})` : ''}
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                Saved Projects & Renders
              </span>
              <span className="font-medium text-rose-300">
                {projectsCount} project{projectsCount !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                Saved Favorites
              </span>
              <span className="font-medium text-rose-300">
                {favoritesCount} item{favoritesCount !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                Custom Preferences & Bio
              </span>
              <span className="text-slate-400">All local data wiped</span>
            </div>
          </div>
        </div>

        {/* Optional reason */}
        <div className="relative z-10">
          <label className="block text-[11px] font-medium text-slate-300 mb-1.5 px-1">
            Reason for deleting (optional)
          </label>
          <select
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#050814] border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-rose-400 cursor-pointer"
          >
            <option value="">Select a reason...</option>
            <option value="fresh_start">I want to start fresh with a clean account</option>
            <option value="privacy">Privacy / removing all personal data</option>
            <option value="done_project">Finished my architectural design projects</option>
            <option value="another_account">Switching to another account</option>
            <option value="other">Other reason</option>
          </select>
        </div>

        {/* Confirmation Input */}
        <div className="relative z-10 space-y-1.5">
          <label className="block text-[11px] font-medium text-slate-300 px-1">
            To confirm deletion, type <span className="font-bold text-rose-400 tracking-wider">DELETE</span> below:
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Type DELETE to confirm"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#050814] border border-rose-500/30 text-white placeholder-slate-500 text-xs font-mono uppercase tracking-wider focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400/50"
          />
        </div>

        {/* Footer Actions */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-end gap-3 relative z-10">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={!isConfirmed || isDeleting}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
              isConfirmed && !isDeleting
                ? 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-rose-900/40 cursor-pointer active:scale-95'
                : 'bg-rose-950/40 text-rose-400/50 border border-rose-900/30 cursor-not-allowed'
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isDeleting ? 'Deleting Account...' : 'Permanently Delete Account'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
