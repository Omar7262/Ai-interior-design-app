import React, { useState } from 'react';
import {
  X,
  Mail,
  User,
  CheckCircle2,
  Lock,
  ArrowRight,
  Shield,
  Sparkles,
  Check,
} from 'lucide-react';
import { UserProfile } from '../types';
import { GMAIL_USER_PROFILE, EMPTY_EMAIL_USER_PROFILE } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: UserProfile;
  onSelectAuthMode: (mode: 'gmail' | 'email', customEmail?: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSelectAuthMode,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectGmail = () => {
    onSelectAuthMode('gmail');
    setSuccessToast('Signed in with Google (Gmail)! Profile synced with photo & credentials.');
    setTimeout(() => {
      setSuccessToast(null);
      onClose();
    }, 700);
  };

  const handleSelectEmail = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalEmail = emailInput.trim() || 'designer@email.com';
    onSelectAuthMode('email', finalEmail);
    setSuccessToast(`Signed up with Email (${finalEmail})! Profile is a clean empty person.`);
    setTimeout(() => {
      setSuccessToast(null);
      onClose();
    }, 700);
  };

  const isCurrentGmail = currentProfile.authProvider === 'gmail' || (!!currentProfile.email && currentProfile.email.includes('gmail'));
  const isCurrentEmail = currentProfile.authProvider === 'email' && !isCurrentGmail;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md max-h-[92vh] overflow-y-auto no-scrollbar rounded-3xl bg-[#08132e] border border-blue-500/30 p-5 sm:p-6 shadow-2xl text-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/10 sticky top-0 bg-[#08132e]/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Account & Sign Up Mode</h3>
              <p className="text-[11px] text-slate-400">Choose between Gmail or Email registration</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Toast */}
        {successToast && (
          <div className="mt-4 p-3 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 shadow-lg animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successToast}</span>
          </div>
        )}

        <div className="mt-4 flex flex-col gap-4">
          <p className="text-xs text-slate-300 leading-relaxed">
            Specify how your designer identity is configured in Desing AI:
          </p>

          {/* OPTION 1: SIGN UP WITH GOOGLE (GMAIL) */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              isCurrentGmail
                ? 'bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/40 border-blue-400/60 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                : 'bg-white/5 border-white/10 hover:border-blue-400/30'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {/* Google Icon SVG */}
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-md">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">Sign up with Gmail</h4>
                    {isCurrentGmail && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-500 text-white">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Syncs Google photo, verified badge, & Gmail profile
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-white/10 text-[11px] text-slate-300 flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Pre-fills Google Profile photo & name: <b>Omar Shooter</b></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Includes verified designer checkmark & <b>@omarshooter</b></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Stats start at 0 (Projects: 0, Favorites: 0, Downloads: 0)</span>
              </div>
            </div>

            <button
              onClick={handleSelectGmail}
              className="mt-3.5 w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <span>{isCurrentGmail ? 'Keep Gmail Profile Active' : 'Switch to Gmail Profile'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-900" />
            </button>
          </div>

          {/* OPTION 2: SIGN UP WITH EMAIL (EMPTY PERSON PROFILE) */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              isCurrentEmail
                ? 'bg-gradient-to-r from-emerald-950/40 via-teal-900/30 to-blue-950/40 border-teal-400/60 shadow-[0_0_20px_rgba(20,184,166,0.3)]'
                : 'bg-white/5 border-white/10 hover:border-teal-400/30'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shrink-0 shadow-inner">
                  <Mail className="w-5 h-5" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">Sign up with Email</h4>
                    {isCurrentEmail && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-teal-500 text-white">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-teal-300 font-medium mt-0.5">
                    Empty Person Profile (No Photo, Empty Bio, 0 Stats)
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-white/10 text-[11px] text-slate-300 flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span><b>Empty person silhouette</b> (no profile picture prefilled)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Empty bio, blank name, & blank handle ready for custom setup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Clean stats: 0 Projects, 0 Favorites, 0 Downloads</span>
              </div>
            </div>

            {/* Quick Email Form */}
            <form onSubmit={handleSelectEmail} className="mt-3.5 flex flex-col gap-2">
              <div className="flex items-center bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs">
                <Mail className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter email (e.g. user@email.com)"
                  className="w-full bg-transparent text-white placeholder-slate-400 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign Up as Empty Person (Email)</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
