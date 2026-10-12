import React, { useState } from 'react';
import {
  Bell,
  Check,
  MoreHorizontal,
  Heart,
  Share2,
  Settings,
  Download,
  Calendar,
  Lightbulb,
  CheckCircle2,
  MessageSquare,
} from 'lucide-react';
import { NOTIFICATIONS_LIST } from '../data/mockData';
import { NotificationItem } from '../types';

export const NotificationsScreen: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS_LIST);

  // Compute dynamic category counts from the actual notifications list
  const allCount = notifications.length;
  const messagesCount = notifications.filter((n) => n.type === 'message').length;
  const projectsCount = notifications.filter((n) => n.type === 'project' || n.type === 'share').length;
  const systemCount = notifications.filter(
    (n) => n.type === 'system' || n.type === 'download' || n.type === 'reminder' || n.type === 'feature'
  ).length;

  const categories = [
    { label: 'All', count: allCount.toString() },
    { label: 'Messages', count: messagesCount.toString() },
    { label: 'Projects', count: projectsCount.toString() },
    { label: 'System', count: systemCount.toString() },
  ];

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getIcon = (item: NotificationItem) => {
    switch (item.type) {
      case 'message':
        return (
          <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
            <img src={item.avatar} alt="User" className="w-full h-full object-cover" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#c084fc] rounded-full border-2 border-[#091329]" />
          </div>
        );
      case 'project':
        return (
          <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0">
            <img src={item.thumbnail} alt="Project" className="w-full h-full object-cover" />
            <div className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
            </div>
          </div>
        );
      case 'like':
        return (
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md">
            <Heart className="w-5 h-5 fill-white" />
          </div>
        );
      case 'share':
        return (
          <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0">
            <img src={item.thumbnail} alt="Shared" className="w-full h-full object-cover" />
            <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-[9px]">
              +
            </div>
          </div>
        );
      case 'system':
        return (
          <div className="w-10 h-10 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
            <Settings className="w-5 h-5" />
          </div>
        );
      case 'download':
        return (
          <div className="w-10 h-10 rounded-full bg-emerald-600/30 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
            <Download className="w-5 h-5" />
          </div>
        );
      case 'reminder':
        return (
          <div className="w-10 h-10 rounded-full bg-indigo-600/30 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20">
            <Calendar className="w-5 h-5" />
          </div>
        );
      case 'feature':
        return (
          <div className="w-10 h-10 rounded-full bg-amber-600/30 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
            <Lightbulb className="w-5 h-5" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5" />
          </div>
        );
    }
  };

  const filteredNotifications = notifications.filter((item) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Messages') return item.type === 'message';
    if (activeCategory === 'Projects') return item.type === 'project' || item.type === 'share';
    if (activeCategory === 'System') return item.type === 'system' || item.type === 'download' || item.type === 'reminder' || item.type === 'feature';
    return true;
  });

  return (
    <div className="flex flex-col gap-5 px-4 pb-12 animate-in fade-in duration-300">
      {/* HEADER SECTION */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-[#38bdf8] shadow-inner">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-tight">Notifications</h1>
            <p className="text-xs text-slate-300 mt-0.5">Stay updated with your projects, account and latest news.</p>
          </div>
        </div>

        {/* Mark read button */}
        <button
          onClick={handleMarkAllRead}
          className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
        >
          <Check className="w-3.5 h-3.5 text-sky-400" />
          <span>Mark all as read</span>
        </button>
      </div>

      {/* FILTER TABS */}
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

      {/* NOTIFICATIONS LIST */}
      <div className="flex flex-col gap-2.5">
        {filteredNotifications.length === 0 ? (
          <div className="py-12 px-4 text-center rounded-2xl bg-[#091329] border border-blue-500/10 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-slate-400 mb-3">
              <Bell className="w-6 h-6 text-sky-400/60" />
            </div>
            <h3 className="text-sm font-semibold text-white">No notifications in {activeCategory}</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">
              When you receive updates, messages, or project activity, they'll show up here.
            </p>
          </div>
        ) : (
          filteredNotifications.map((n) => (
            <div
              key={n.id}
              className="p-3.5 rounded-2xl bg-[#091329] border border-blue-500/15 hover:border-blue-400/30 transition-all flex items-start justify-between gap-3 group"
            >
              <div className="flex items-start gap-3 min-w-0">
                {getIcon(n)}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors">
                      {n.title}
                    </h3>
                    <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-snug whitespace-pre-line">
                    {n.message}
                  </p>
                </div>
              </div>

              <button className="text-slate-500 hover:text-white p-1 rounded-md transition-colors shrink-0">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
