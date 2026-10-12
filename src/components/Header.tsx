import React from 'react';
import { Menu, Search, Bell, ArrowLeft, User } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  onToggleMenu: () => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenProfile?: () => void;
  avatarUrl?: string;
  onBack?: () => void;
  unreadCount?: number;
  variant?: 'home' | 'drawer' | 'inner';
  title?: string;
  isMenuOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMenu,
  onOpenSearch,
  onOpenNotifications,
  onOpenProfile,
  avatarUrl,
  onBack,
  unreadCount = 0,
  variant = 'home',
  title,
  isMenuOpen = false,
}) => {
  if (variant === 'inner' && onBack) {
    return (
      <header className="sticky top-0 z-30 w-full bg-[#050b1a]/95 backdrop-blur-md border-b border-blue-500/15 px-4 sm:px-8 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1 text-white hover:text-sky-300 transition-colors focus:outline-hidden cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          {title && <span className="text-base font-bold text-white">{title}</span>}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenSearch}
            className="p-2 text-white/90 hover:text-white hover:bg-white/5 rounded-full transition-all active:scale-95 cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-5 h-5" strokeWidth={1.8} />
          </button>
          <button
            onClick={onOpenNotifications}
            className="relative p-2 text-white/90 hover:text-white hover:bg-white/5 rounded-full transition-all active:scale-95 cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" strokeWidth={1.8} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#a855f7] rounded-full text-[9px] font-bold text-white flex items-center justify-center shadow-[0_0_8px_#a855f7]">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </header>
    );
  }

  if (variant === 'drawer') {
    return (
      <header className="sticky top-0 z-30 w-full bg-[#050b1a]/95 backdrop-blur-md border-b border-blue-500/15 px-4 sm:px-8 py-3 flex items-center justify-between shadow-md">
        <Logo showTagline={true} size="md" />
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-full hover:bg-white/5 active:scale-95 transition-all text-white/90 cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-white/90" strokeWidth={1.8} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#a855f7] rounded-full text-[9px] font-bold text-white flex items-center justify-center shadow-[0_0_8px_#a855f7]">
                {unreadCount}
              </span>
            )}
          </button>
          {onOpenProfile && (
            <button
              onClick={onOpenProfile}
              className="w-8 h-8 rounded-full overflow-hidden p-[1px] bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center text-white cursor-pointer hover:ring-2 hover:ring-purple-400 transition-all ml-1 shadow-md"
              aria-label="Profile"
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover rounded-full" />
              ) : (
                <div className="w-full h-full bg-[#13203f] flex items-center justify-center text-slate-300">
                  <User className="w-4 h-4" />
                </div>
              )}
            </button>
          )}
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 w-full bg-[#050b1a]/95 backdrop-blur-md border-b border-blue-500/15 px-4 sm:px-8 py-3 flex items-center justify-between shadow-md">
      {/* Left: Hamburger menu and Logo */}
      <div className="flex items-center gap-3.5">
        {isMenuOpen ? (
          <button
            onClick={onToggleMenu}
            className="flex items-center gap-1.5 px-2.5 py-1.5 -ml-1 text-white bg-blue-500/20 hover:bg-blue-500/30 rounded-xl border border-blue-400/30 transition-all focus:outline-hidden cursor-pointer active:scale-95 group shadow-xs"
            aria-label="Back to close menu"
            title="Back to close menu"
          >
            <ArrowLeft className="w-5 h-5 text-sky-400 group-hover:-translate-x-0.5 transition-transform" strokeWidth={2.2} />
            <span className="text-xs font-bold text-sky-300">Back</span>
          </button>
        ) : (
          <button
            onClick={onToggleMenu}
            className="p-1.5 -ml-1 text-white hover:text-sky-300 transition-colors focus:outline-hidden cursor-pointer"
            aria-label="Toggle Navigation Menu (3 dashes)"
            title="Open menu"
          >
            <Menu className="w-6 h-6 text-white" strokeWidth={2} />
          </button>
        )}

        <Logo size="md" />
      </div>

      {/* Right: Search, Notifications, and Profile Avatar */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onOpenSearch}
          className="p-2 text-white/90 hover:text-white hover:bg-white/5 rounded-full transition-all active:scale-95 cursor-pointer"
          aria-label="Search designs"
        >
          <Search className="w-5 h-5" strokeWidth={1.8} />
        </button>

        <button
          onClick={onOpenNotifications}
          className="relative p-2 text-white/90 hover:text-white hover:bg-white/5 rounded-full transition-all active:scale-95 cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" strokeWidth={1.8} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#a855f7] rounded-full text-[9px] font-bold text-white flex items-center justify-center shadow-[0_0_8px_#a855f7]">
              {unreadCount}
            </span>
          )}
        </button>

        {onOpenProfile && (
          <button
            onClick={onOpenProfile}
            className="w-8 h-8 rounded-full overflow-hidden p-[1px] bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center text-white cursor-pointer hover:ring-2 hover:ring-purple-400 transition-all ml-1 shadow-md"
            aria-label="Profile"
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              <div className="w-full h-full bg-[#13203f] flex items-center justify-center text-slate-300">
                <User className="w-4 h-4" />
              </div>
            )}
          </button>
        )}
      </div>
    </header>
  );
};
