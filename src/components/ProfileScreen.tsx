import React, { useState } from 'react';
import {
  User,
  CheckCircle,
  Camera,
  Edit3,
  LayoutGrid,
  Heart,
  Download,
  Calendar,
  Crown,
  ChevronRight,
  CreditCard,
  Bell,
  Shield,
  HelpCircle,
  Clock,
  CheckCircle2,
  Check,
  RotateCcw,
  Plus,
  Trash2,
} from 'lucide-react';
import { UserProfile, Project } from '../types';
import { EditProfileModal } from './EditProfileModal';
import { PrivacySecurityModal } from './PrivacySecurityModal';
import { DeleteAccountModal } from './DeleteAccountModal';

interface ProfileScreenProps {
  profile: UserProfile;
  projects?: Project[];
  onUpdateProfile: (updated: UserProfile) => void;
  onViewProject: (project: Project) => void;
  onOpenNotifications: () => void;
  onOpenFavorites: () => void;
  onOpenProjects: () => void;
  onNewProject?: () => void;
  onDeleteAccount?: () => void;
  onResetAccount?: () => void;
  onSwitchAuthMode?: (mode: 'gmail' | 'email', customEmail?: string) => void;
  unseenFavoritesCount?: number;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  profile,
  projects = [],
  onUpdateProfile,
  onViewProject,
  onOpenNotifications,
  onOpenFavorites,
  onOpenProjects,
  onNewProject,
  onDeleteAccount,
  onResetAccount,
  onSwitchAuthMode,
  unseenFavoritesCount = 0,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showDeleteToast, setShowDeleteToast] = useState(false);

  const handleSave = (updated: UserProfile) => {
    onUpdateProfile(updated);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDeleteConfirmed = () => {
    if (onDeleteAccount) {
      onDeleteAccount();
    } else {
      onResetAccount?.();
    }
    setShowDeleteToast(true);
    setTimeout(() => setShowDeleteToast(false), 4000);
  };

  const isEmailMode = profile.authProvider === 'email' || (!profile.avatar && !profile.email?.includes('gmail'));

  const settingsItems = [
    {
      title: 'Personal Information',
      desc: 'Name, email, handle, and designer details',
      icon: User,
      action: () => setIsEditModalOpen(true),
    },
    {
      title: 'Payment & Billing',
      desc: 'Pro subscription & payment methods',
      icon: CreditCard,
      action: () => alert('Pro plan active ($29/month). Next billing date: May 1, 2026.'),
    },
    {
      title: 'Notifications',
      desc: 'Project updates, tips and team alerts',
      icon: Bell,
      action: onOpenNotifications,
    },
    {
      title: 'Privacy & Security',
      desc: '2FA, photo metadata, data export & protection',
      icon: Shield,
      action: () => setIsPrivacyModalOpen(true),
    },
    {
      title: 'Help & Support',
      desc: '24/7 dedicated architectural support',
      icon: HelpCircle,
      action: () => alert('Support team available 24/7 at support@desingai.com'),
    },
    {
      title: 'Delete Account',
      desc: 'Permanently delete your profile and erase all account data',
      icon: Trash2,
      danger: true,
      action: () => setIsDeleteModalOpen(true),
    },
  ];

  const recentActivity = projects.slice(0, 3);

  return (
    <div className="flex flex-col gap-5 px-4 pb-12 animate-in fade-in duration-300">
      {/* Toast Notifications */}
      {showToast && (
        <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 shadow-lg animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Profile updated successfully!</span>
        </div>
      )}

      {showDeleteToast && (
        <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs font-semibold flex items-center gap-2 shadow-lg animate-in fade-in slide-in-from-top-2">
          <Trash2 className="w-4 h-4 text-rose-400" />
          <span>Account permanently deleted. All personal data and designs wiped.</span>
        </div>
      )}


      {/* PROFILE BANNER CARD */}
      <div className="relative rounded-3xl overflow-hidden border border-blue-500/25 bg-[#09142f] shadow-xl p-5">
        {/* Background ambient sunset living room */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09142f] via-[#09142f]/80 to-transparent" />

        <div className="relative z-10">
          {/* Top Row: Avatar & Edit Profile Button */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3.5">
              {/* Avatar with verified checkmark & camera icon (clickable to edit) */}
              <div
                onClick={() => setIsEditModalOpen(true)}
                className="relative w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 shadow-lg cursor-pointer group shrink-0"
                title="Click to edit profile photo"
              >
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name || 'User'}
                    className="w-full h-full rounded-full object-cover group-hover:brightness-90 transition-all"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-[#13203f] flex items-center justify-center text-slate-300 group-hover:brightness-110 transition-all">
                    <User className="w-8 h-8 text-slate-400 group-hover:scale-105 transition-transform" />
                  </div>
                )}
                <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#1e293b] border border-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Camera className="w-2.5 h-2.5" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-base font-extrabold text-white tracking-tight">
                    {profile.name || (isEmailMode ? 'Empty Person' : 'Omar Shooter')}
                  </h2>
                  {profile.isVerified && (
                    <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white shrink-0" title="Verified Gmail Designer">
                      <CheckCircle className="w-3 h-3 fill-white text-blue-500" />
                    </div>
                  )}
                </div>
                <span className="text-xs text-sky-400 font-medium block">
                  {profile.handle || (isEmailMode ? '@empty_person' : '@omarshooter')}
                </span>
                {profile.title && (
                  <span className="text-[10px] text-slate-400 block mt-0.5">{profile.title}</span>
                )}
              </div>
            </div>

            {/* EDIT PROFILE BUTTON */}
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="py-1.5 px-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold flex items-center gap-1.5 hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
          </div>

          {/* Bio */}
          <p className="text-xs text-slate-200 mt-3 leading-relaxed whitespace-pre-line">
            {profile.bio || (isEmailMode ? 'Empty person profile. No bio or profile photo set yet. You signed up with Email — tap "Edit Profile" to customize.' : 'Turning ideas into beautiful spaces ✨\nHome design lover | Dream bigger, design better.')}
          </p>

          {/* Stats Bar (Projects: 0, Favorites: 0, Downloads: 0, Joined: Today) */}
          <div className="grid grid-cols-4 gap-2 pt-4 mt-4 border-t border-white/10 text-center">
            <button
              onClick={onOpenProjects}
              className="flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer group"
            >
              <div className="flex items-center gap-1 text-slate-300 text-xs font-bold group-hover:text-sky-300">
                <LayoutGrid className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-sm font-extrabold">{profile.stats.projects}</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5">Projects</span>
            </button>

            <button
              onClick={onOpenFavorites}
              className="relative flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer group"
              title={unseenFavoritesCount > 0 ? `${unseenFavoritesCount} new favorites! Click to check out and clear badge.` : 'View favorites'}
            >
              <div className="flex items-center gap-1 text-slate-300 text-xs font-bold group-hover:text-rose-300">
                <div className="relative">
                  <Heart className={`w-3.5 h-3.5 ${profile.stats.favorites > 0 ? 'fill-rose-400 text-rose-400' : 'text-rose-400'}`} />
                  {unseenFavoritesCount > 0 && (
                    <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  )}
                </div>
                <span className="text-sm font-extrabold">{profile.stats.favorites}</span>
                {unseenFavoritesCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[9px] font-extrabold shadow-sm animate-pulse">
                    +{unseenFavoritesCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5">Favorites</span>
            </button>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-slate-300 text-xs font-bold">
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-sm font-extrabold">{profile.stats.downloads}</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5">Downloads</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-slate-300 text-xs font-bold">
                <Calendar className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-[11px] font-semibold">{profile.stats.joined || 'Joined today'}</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5">Joined</span>
            </div>
          </div>
        </div>
      </div>

      {/* PREMIUM MEMBER BANNER */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0d1e52] via-[#1a2d75] to-[#291e6b] border border-blue-400/25 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shadow-inner">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white tracking-tight">Premium Member</h3>
            <p className="text-[10px] text-slate-300 mt-0.5">
              Unlock unlimited renders, high-resolution exports and 3D walkthroughs.
            </p>
          </div>
        </div>

        <button
          onClick={() => alert('Manage plan: You are on the Pro Tier.')}
          className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[11px] font-bold flex items-center gap-1 whitespace-nowrap hover:brightness-110 cursor-pointer shadow-md"
        >
          <span>Manage Plan</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* SETTINGS MENU ROWS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {settingsItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={item.action}
              className={`p-3.5 rounded-2xl bg-[#091329] border transition-all flex items-center justify-between text-left cursor-pointer group ${
                item.danger
                  ? 'border-rose-500/20 hover:border-rose-500/40 hover:bg-rose-500/5'
                  : 'border-blue-500/15 hover:border-blue-400/30'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform ${
                    item.danger ? 'bg-rose-500/15 text-rose-400' : 'bg-blue-500/15 text-[#38bdf8]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4
                    className={`text-xs font-bold transition-colors ${
                      item.danger
                        ? 'text-rose-300 group-hover:text-rose-200'
                        : 'text-white group-hover:text-sky-300'
                    }`}
                  >
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              </div>

              <ChevronRight
                className={`w-4 h-4 transition-all group-hover:translate-x-0.5 ${
                  item.danger ? 'text-rose-400' : 'text-slate-400 group-hover:text-white'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* RECENT ACTIVITY SECTION */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-bold text-white tracking-tight">Recent Activity</h3>
          </div>
          {projects.length > 0 && (
            <button
              onClick={onOpenProjects}
              className="text-xs font-medium text-sky-400 hover:text-sky-300 flex items-center gap-0.5 cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {recentActivity.length === 0 ? (
          <div className="p-5 rounded-2xl bg-[#091329] border border-blue-500/15 text-center flex flex-col items-center justify-center py-6 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-sky-400 mb-2">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-white">No Design Activity Yet (0 Projects)</h4>
            <p className="text-[11px] text-slate-400 max-w-xs mt-1">
              Your generated interiors, floor plans, and renders will show up here as you work.
            </p>
            {onNewProject && (
              <button
                onClick={onNewProject}
                className="mt-3 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create First Design</span>
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {recentActivity.map((act) => (
              <div
                key={act.id}
                onClick={() => onViewProject(act)}
                className="p-2.5 rounded-2xl bg-[#091329] border border-blue-500/15 hover:border-blue-400/30 transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={act.thumbnail || act.afterImage}
                    alt={act.title}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors">
                      {act.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Project • {act.timeAgo || act.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold flex items-center gap-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>{act.status || 'Completed'}</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* EDIT PROFILE MODAL */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentProfile={profile}
        onSaveProfile={handleSave}
      />

      {/* PRIVACY & SECURITY MODAL */}
      <PrivacySecurityModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        projectsCount={projects.length}
        favoritesCount={profile.stats.favorites}
        onClearAllData={onDeleteAccount || onResetAccount}
      />

      {/* DELETE ACCOUNT MODAL */}
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirmDelete={handleDeleteConfirmed}
        profile={profile}
        projectsCount={projects.length}
        favoritesCount={unseenFavoritesCount || profile.stats.favorites}
      />
    </div>
  );
};
