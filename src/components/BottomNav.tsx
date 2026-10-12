import React from 'react';
import { Home, Compass, Folder, Heart, User } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  favoritesCount?: number;
  favoritesBadgeCount?: number;
  projectsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  favoritesCount = 0,
  favoritesBadgeCount = 0,
  projectsCount = 0,
}) => {
  // When favorites has unseen items (favoritesBadgeCount > 0), show the red number badge.
  // When the user clicks / checks out Favorites, favoritesBadgeCount becomes 0 and the red badge disappears!
  const tabs = [
    { id: 'home' as TabType, label: 'Home', icon: Home, badge: 0 },
    { id: 'explore' as TabType, label: 'Explore', icon: Compass, badge: 0 },
    { id: 'projects' as TabType, label: 'Projects', icon: Folder, badge: 0 },
    { id: 'favorites' as TabType, label: 'Favorites', icon: Heart, badge: favoritesBadgeCount },
    { id: 'profile' as TabType, label: 'Profile', icon: User, badge: 0 },
  ];

  return (
    <nav className="sticky bottom-0 z-40 w-full bg-[#050b1a]/95 backdrop-blur-xl border-t border-blue-500/10 px-2 pt-2.5 pb-3 select-none shadow-[0_-4px_25px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-around w-full px-2 sm:px-8">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className="group flex flex-col items-center justify-center flex-1 py-1 transition-all relative cursor-pointer"
              aria-label={tab.label}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive
                      ? 'text-[#60a5fa] scale-110 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]'
                      : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />

                {/* Red notification badge: shows red number when items are added to favorites.
                    Disappears completely when clicked / checked out! */}
                {tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 px-1 min-w-4 h-4 rounded-full bg-rose-500 text-[10px] font-extrabold text-white flex items-center justify-center leading-none shadow-[0_0_10px_rgba(244,63,94,0.7)] animate-in zoom-in duration-200">
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] font-medium mt-1 transition-colors ${
                  isActive ? 'text-[#c084fc] font-semibold' : 'text-slate-400 group-hover:text-slate-200'
                }`}
              >
                {tab.label}
              </span>

              {/* Active indicator line underneath */}
              {isActive && (
                <div className="w-8 h-[2.5px] bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#c084fc] rounded-full mt-1 shadow-[0_0_8px_rgba(192,132,252,0.8)]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
