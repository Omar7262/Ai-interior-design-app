import React from 'react';
import { User, Sparkles, Sliders, Shield, Zap, CreditCard, ChevronRight, LogOut } from 'lucide-react';

export const ProfileView: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 px-4 pb-14 text-white animate-in fade-in duration-200">
      {/* Profile Header */}
      <div className="flex items-center gap-4 p-4 rounded-3xl bg-[#091329] border border-blue-500/20">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#00d2ff] via-[#4361ee] to-[#a855f7] p-[2px] shadow-lg">
          <div className="w-full h-full rounded-[14px] bg-[#070e22] flex items-center justify-center">
            <User className="w-7 h-7 text-sky-300" />
          </div>
        </div>

        <div>
          <h2 className="text-base font-bold text-white">Desing AI Architect</h2>
          <span className="text-xs text-sky-400 font-medium">Pro Studio Member</span>
          <div className="mt-1 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#4338ca] text-[#c7d2fe]">
              UNLIMITED 4K RENDERS
            </span>
          </div>
        </div>
      </div>

      {/* Subscription Card */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-[#0f235e] via-[#1a338b] to-[#2b1f72] border border-blue-400/30">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Desing AI Ultra Pass
            </span>
          </div>
          <span className="text-xs text-emerald-400 font-bold">Active</span>
        </div>
        <p className="text-xs text-slate-200 leading-relaxed mb-3">
          Access high-definition diffusion models, 3D spatial exports, and commercial rendering licenses.
        </p>
        <div className="w-full bg-black/30 h-2 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full w-4/5" />
        </div>
        <div className="flex justify-between items-center text-[10px] text-slate-300 mt-1.5">
          <span>84 / 100 Fast Generations used</span>
          <span>Renews in 18 days</span>
        </div>
      </div>

      {/* Settings list */}
      <div className="flex flex-col gap-1 rounded-2xl bg-[#091329] border border-blue-500/15 p-2">
        {[
          { label: 'Render Quality & Engine (v2.4 Beta)', icon: Sliders },
          { label: 'Cloud Storage & Uploads', icon: CreditCard },
          { label: 'Privacy & Commercial Licensing', icon: Shield },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={i}
              className="p-3 rounded-xl hover:bg-white/5 flex items-center justify-between text-left cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-medium text-slate-200">{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
