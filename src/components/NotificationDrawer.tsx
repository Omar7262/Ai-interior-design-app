import React from 'react';
import { X, Bell, CheckCheck } from 'lucide-react';
import { NOTIFICATIONS_LIST } from '../data/mockData';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-0 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full sm:max-w-sm h-full sm:h-auto sm:max-h-[85vh] rounded-none sm:rounded-3xl bg-[#09122c] border-l sm:border border-blue-500/30 p-5 shadow-2xl text-white flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Bell className="w-5 h-5 text-sky-400" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#a855f7] rounded-full shadow-[0_0_6px_#a855f7]" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">Activity & Alerts</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of alerts */}
        <div className="mt-4 flex flex-col gap-2.5 overflow-y-auto no-scrollbar">
          {NOTIFICATIONS_LIST.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-2xl border transition-all ${
                !item.read
                  ? 'bg-blue-950/40 border-blue-400/30'
                  : 'bg-white/5 border-white/5 opacity-80'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  {!item.read && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] shadow-[0_0_5px_#a855f7]" />
                  )}
                  {item.title}
                </span>
                <span className="text-[10px] text-slate-400">{item.time}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">{item.message}</p>
            </div>
          ))}
        </div>

        {/* Mark read button */}
        <div className="mt-auto pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="text-xs font-medium text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark all as read</span>
          </button>
        </div>
      </div>
    </div>
  );
};
