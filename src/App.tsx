/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { MenuDrawer } from './components/MenuDrawer';
import { ExploreScreen } from './components/ExploreScreen';
import { InteriorDesignScreen } from './components/InteriorDesignScreen';
import { FloorPlanScreen } from './components/FloorPlanScreen';
import { ExteriorDesignScreen } from './components/ExteriorDesignScreen';
import { HomeDesignVideoScreen } from './components/HomeDesignVideoScreen';
import { Walkthrough3DScreen } from './components/Walkthrough3DScreen';
import { MyProjectsScreen } from './components/MyProjectsScreen';
import { UploadsScreen } from './components/UploadsScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { FavoritesView } from './components/FavoritesView';
import { InteriorDesignStudio } from './components/InteriorDesignStudio';
import { FloorPlanStudio } from './components/FloorPlanStudio';
import { ExteriorDesignStudio } from './components/ExteriorDesignStudio';
import { Video3DStudio } from './components/Video3DStudio';
import { NewProjectModal } from './components/NewProjectModal';
import { SearchModal } from './components/SearchModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { PrivacySecurityModal } from './components/PrivacySecurityModal';
import { USER_PROFILE, GMAIL_USER_PROFILE, EMPTY_EMAIL_USER_PROFILE } from './data/mockData';
import { ScreenType, TabType, ToolType, Project, UploadItem, VideoItem, WalkthroughItem, UserProfile } from './types';

export default function App() {
  const [screen, setScreen] = useState<ScreenType>('home');
  const [tab, setTab] = useState<TabType>('home');

  // Favorites Registry (Starts at 0 for fresh accounts)
  const [favoritesMap, setFavoritesMap] = useState<Record<string, Project>>(() => {
    const saved = localStorage.getItem('desing_ai_favorites_v4');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {};
      }
    }
    return {};
  });

  // Red number notification badge counter for unseen added favorites
  // Increases when an item is added to favorites; disappears completely when checked out!
  const [unseenFavoritesCount, setUnseenFavoritesCount] = useState<number>(() => {
    const saved = localStorage.getItem('desing_ai_unseen_fav_v4');
    return saved ? parseInt(saved, 10) || 0 : 0;
  });

  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState<number>(0);

  // Projects Registry (Starts at 0 for fresh accounts)
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('desing_ai_projects_v4');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Total Downloads Count (Starts at 0 for fresh accounts)
  const [downloadsCount, setDownloadsCount] = useState<number>(() => {
    const saved = localStorage.getItem('desing_ai_downloads_v4');
    return saved ? parseInt(saved, 10) || 0 : 0;
  });

  // Profile Data with all stats initially at 0
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('desing_ai_profile_v4');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...USER_PROFILE,
          ...parsed,
          stats: {
            projects: 0,
            favorites: 0,
            downloads: 0,
            joined: 'Joined today',
            ...parsed.stats,
          },
        };
      } catch {
        return USER_PROFILE;
      }
    }
    return USER_PROFILE;
  });

  const [activeVideoMode, setActiveVideoMode] = useState<'video' | '3d'>('video');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsDrawerOpen, setIsNotificationsDrawerOpen] = useState(false);
  const [isGlobalPrivacyOpen, setIsGlobalPrivacyOpen] = useState(false);
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState<Project | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  // First-time load check: wipe older demo data so the app cleanly defaults to 0 across the board
  useEffect(() => {
    const hasCleanedForV4 = localStorage.getItem('desing_ai_account_v4_clean');
    if (!hasCleanedForV4) {
      localStorage.setItem('desing_ai_account_v4_clean', 'true');
      localStorage.removeItem('desing_ai_projects');
      localStorage.removeItem('desing_ai_profile');
      localStorage.removeItem('desing_ai_favorites');
      localStorage.removeItem('desing_ai_projects_v2');
      localStorage.removeItem('desing_ai_profile_v2');
      localStorage.removeItem('desing_ai_favorites_v2');
      setProjects([]);
      setFavoritesMap({});
      setDownloadsCount(0);
      setUnseenFavoritesCount(0);
      localStorage.removeItem('desing_ai_unseen_fav_v4');
      setUserProfile((prev) => ({
        ...prev,
        stats: {
          projects: 0,
          favorites: 0,
          downloads: 0,
          joined: 'Joined today',
        },
      }));
    }
  }, []);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('desing_ai_favorites_v4', JSON.stringify(favoritesMap));
  }, [favoritesMap]);

  useEffect(() => {
    localStorage.setItem('desing_ai_unseen_fav_v4', unseenFavoritesCount.toString());
  }, [unseenFavoritesCount]);

  useEffect(() => {
    localStorage.setItem('desing_ai_projects_v4', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('desing_ai_downloads_v4', downloadsCount.toString());
  }, [downloadsCount]);

  useEffect(() => {
    localStorage.setItem('desing_ai_profile_v4', JSON.stringify(userProfile));
  }, [userProfile]);

  // Dynamically update profile stats based on user activities
  const favoritesCount = useMemo(() => Object.keys(favoritesMap).length, [favoritesMap]);

  useEffect(() => {
    setUserProfile((prev) => ({
      ...prev,
      stats: {
        projects: projects.length,
        favorites: favoritesCount,
        downloads: downloadsCount,
        joined: prev.stats?.joined || 'Joined today',
      },
    }));
  }, [projects.length, favoritesCount, downloadsCount]);

  // Boolean map for fast favorite lookup in grids
  const favoritesMapBoolean = useMemo(() => {
    const map: Record<string, boolean> = {};
    Object.keys(favoritesMap).forEach((id) => {
      map[id] = true;
    });
    return map;
  }, [favoritesMap]);

  const favoritesList = useMemo(() => Object.values(favoritesMap), [favoritesMap]);

  // Open favorites and immediately clear the red badge count (checked out!)
  const handleOpenFavorites = () => {
    setTab('favorites');
    setScreen('favorites');
    setUnseenFavoritesCount(0);
  };

  // Ensure red badge disappears immediately whenever user checks out favorites
  useEffect(() => {
    if (screen === 'favorites' || tab === 'favorites') {
      setUnseenFavoritesCount(0);
    }
  }, [screen, tab]);

  const handleOpenNotifications = () => {
    setTab('notifications');
    setScreen('notifications');
    setUnreadNotificationsCount(0);
  };

  // Toggle favorite on any project, room, floor plan, or exterior design
  const handleToggleFavorite = (item: any) => {
    if (!item || !item.id) return;
    setFavoritesMap((prev) => {
      const next = { ...prev };
      if (next[item.id]) {
        delete next[item.id];
        // Decrement unseen badge counter if positive
        setUnseenFavoritesCount((c) => Math.max(0, c - 1));
      } else {
        next[item.id] = {
          id: item.id,
          title: item.title || 'Architectural Design',
          type: item.type || 'interior',
          typeLabel: item.typeLabel || item.type || 'Design',
          thumbnail: item.thumbnail || item.afterImage || item.image,
          afterImage: item.afterImage || item.thumbnail || item.image,
          beforeImage: item.beforeImage,
          style: item.style || item.category || 'Modern Style',
          roomType: item.roomType || item.space || 'Interior',
          prompt: item.prompt || `${item.title} styled with contemporary aesthetic.`,
          date: item.date || 'Saved today',
          timeAgo: item.timeAgo || 'Saved',
          isFavorite: true,
        };
        // When people add to favorite, show red number badge (unless they are already viewing favorites)
        if (screen !== 'favorites') {
          setUnseenFavoritesCount((c) => c + 1);
        }
      }
      return next;
    });
  };

  const handleUpdateProfile = (updated: UserProfile) => {
    setUserProfile((prev) => ({
      ...prev,
      ...updated,
      stats: {
        ...prev.stats,
        projects: projects.length,
        favorites: favoritesCount,
        downloads: downloadsCount,
      },
    }));
  };

  const handleSaveProject = (newProj: Project) => {
    setProjects((prev) => [newProj, ...prev]);
  };

  const handleDeleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (selectedProjectForDetail?.id === id) {
      setSelectedProjectForDetail(null);
    }
  };

  const handleDownloadRender = () => {
    setDownloadsCount((prev) => prev + 1);
  };

  // Switch between Gmail sign-up (Omar Shooter with Google photo) and Email sign-up (Empty Person)
  const handleSwitchAuthMode = (mode: 'gmail' | 'email', customEmail?: string) => {
    if (mode === 'gmail') {
      setUserProfile((prev) => ({
        ...GMAIL_USER_PROFILE,
        stats: {
          ...GMAIL_USER_PROFILE.stats,
          projects: projects.length,
          favorites: favoritesCount,
          downloads: downloadsCount,
          joined: prev.stats?.joined || 'Joined today',
        },
      }));
    } else {
      setUserProfile((prev) => ({
        ...EMPTY_EMAIL_USER_PROFILE,
        email: customEmail || (prev.email && !prev.email.includes('gmail') ? prev.email : 'designer@email.com'),
        stats: {
          ...EMPTY_EMAIL_USER_PROFILE.stats,
          projects: projects.length,
          favorites: favoritesCount,
          downloads: downloadsCount,
          joined: prev.stats?.joined || 'Joined today',
        },
      }));
    }
  };

  // Permanently delete account, wiping all projects, favorites, downloads, and profile
  const handleDeleteAccount = () => {
    localStorage.removeItem('desing_ai_favorites_v4');
    localStorage.removeItem('desing_ai_unseen_fav_v4');
    localStorage.removeItem('desing_ai_projects_v4');
    localStorage.removeItem('desing_ai_downloads_v4');
    localStorage.removeItem('desing_ai_profile_v4');
    localStorage.removeItem('desing_ai_notifications_v4');
    setFavoritesMap({});
    setUnseenFavoritesCount(0);
    setUnreadNotificationsCount(0);
    setProjects([]);
    setDownloadsCount(0);
    setUserProfile({
      ...EMPTY_EMAIL_USER_PROFILE,
      name: 'New User',
      email: '',
      bio: 'Account data erased. Ready to start new architectural projects.',
      stats: {
        projects: 0,
        favorites: 0,
        downloads: 0,
        joined: 'Just now',
      },
    });
    setScreen('home');
    setTab('home');
  };

  const handleResetAccount = handleDeleteAccount;

  const handleSelectTool = (tool: ToolType) => {
    if (tool === 'interior') {
      setScreen('interior');
    } else if (tool === 'floorplan') {
      setScreen('floorplan');
    } else if (tool === 'exterior') {
      setScreen('exterior');
    } else if (tool === 'video') {
      setScreen('video');
    } else if (tool === '3d') {
      setScreen('walkthrough');
    }
  };

  const handleTabChange = (newTab: TabType) => {
    setTab(newTab);
    if (newTab === 'home') setScreen('home');
    else if (newTab === 'explore') setScreen('explore');
    else if (newTab === 'projects') setScreen('projects');
    else if (newTab === 'favorites') {
      // When ppl check it out / click it, the red number badge disappears!
      setUnseenFavoritesCount(0);
      setScreen('favorites');
    }
    else if (newTab === 'profile') setScreen('profile');
    else if (newTab === 'uploads') setScreen('uploads');
    else if (newTab === 'notifications') {
      setUnreadNotificationsCount(0);
      setScreen('notifications');
    }
  };

  // Render the active view content
  const renderContent = () => {
    switch (screen) {
      case 'home':
        return (
          <HomeScreen
            projects={projects}
            onOpenNewProject={() => setIsNewProjectOpen(true)}
            onSelectTool={handleSelectTool}
            onOpenExplore={() => {
              setTab('explore');
              setScreen('explore');
            }}
            onOpenProjects={() => {
              setTab('projects');
              setScreen('projects');
            }}
            onViewProject={(p) => setSelectedProjectForDetail(p)}
            onDeleteProject={handleDeleteProject}
          />
        );

      case 'menu':
        return (
          <HomeScreen
            projects={projects}
            onOpenNewProject={() => setIsNewProjectOpen(true)}
            onSelectTool={handleSelectTool}
            onOpenExplore={() => {
              setTab('explore');
              setScreen('explore');
            }}
            onOpenProjects={() => {
              setTab('projects');
              setScreen('projects');
            }}
            onViewProject={(p) => setSelectedProjectForDetail(p)}
            onDeleteProject={handleDeleteProject}
          />
        );

      case 'explore':
        return (
          <ExploreScreen
            onSelectCategory={(_cat) => setScreen('interior')}
            onViewProject={(p) => setSelectedProjectForDetail(p)}
            favoritesMap={favoritesMapBoolean}
            onToggleFavorite={handleToggleFavorite}
          />
        );

      case 'interior':
        return (
          <InteriorDesignScreen
            onNewDesign={() => setScreen('interior_studio')}
            onViewProject={(p) => setSelectedProjectForDetail(p)}
            favoritesMap={favoritesMapBoolean}
            onToggleFavorite={handleToggleFavorite}
          />
        );

      case 'floorplan':
        return (
          <FloorPlanScreen
            onNewFloorPlan={() => setScreen('floorplan_studio')}
            onOpenPlannerStudio={() => setScreen('floorplan_studio')}
            favoritesMap={favoritesMapBoolean}
            onToggleFavorite={handleToggleFavorite}
          />
        );

      case 'exterior':
        return (
          <ExteriorDesignScreen
            onNewDesign={() => setScreen('exterior_studio')}
            onOpenExteriorStudio={() => setScreen('exterior_studio')}
            favoritesMap={favoritesMapBoolean}
            onToggleFavorite={handleToggleFavorite}
          />
        );

      case 'video':
        return (
          <HomeDesignVideoScreen
            onCreateVideo={() => {
              setSelectedVideo(null);
              setActiveVideoMode('video');
              setScreen('video_studio');
            }}
            onPlayVideo={(vid: VideoItem) => {
              setSelectedVideo(vid);
              setActiveVideoMode('video');
              setScreen('video_studio');
            }}
            favoritesMap={favoritesMapBoolean}
            onToggleFavorite={handleToggleFavorite}
          />
        );

      case 'walkthrough':
        return (
          <Walkthrough3DScreen
            onCreateWalkthrough={() => {
              setActiveVideoMode('3d');
              setScreen('walkthrough_studio');
            }}
            onOpenWalkthrough={(_item: WalkthroughItem) => {
              setActiveVideoMode('3d');
              setScreen('walkthrough_studio');
            }}
          />
        );

      case 'projects':
        return (
          <MyProjectsScreen
            projects={projects}
            onNewProject={() => setIsNewProjectOpen(true)}
            onViewProject={(p) => setSelectedProjectForDetail(p)}
            onDeleteProject={handleDeleteProject}
            favoritesMap={favoritesMapBoolean}
            onToggleFavorite={handleToggleFavorite}
          />
        );

      case 'uploads':
        return (
          <UploadsScreen
            onBack={() => setScreen('home')}
            onSelectUploadForStudio={(_item: UploadItem) => setScreen('interior_studio')}
          />
        );

      case 'notifications':
        return <NotificationsScreen />;

      case 'profile':
        return (
          <ProfileScreen
            profile={userProfile}
            projects={projects}
            onUpdateProfile={handleUpdateProfile}
            onViewProject={(p) => setSelectedProjectForDetail(p)}
            onOpenNotifications={handleOpenNotifications}
            onOpenFavorites={handleOpenFavorites}
            onOpenProjects={() => {
              setTab('projects');
              setScreen('projects');
            }}
            onNewProject={() => setIsNewProjectOpen(true)}
            onDeleteAccount={handleDeleteAccount}
            onResetAccount={handleDeleteAccount}
            onSwitchAuthMode={handleSwitchAuthMode}
            unseenFavoritesCount={unseenFavoritesCount}
          />
        );

      case 'favorites':
        return (
          <FavoritesView
            favorites={favoritesList}
            onBack={() => setScreen('home')}
            onViewProject={(p) => setSelectedProjectForDetail(p)}
            onToggleFavorite={handleToggleFavorite}
            onExplore={() => {
              setTab('explore');
              setScreen('explore');
            }}
            onSelectTool={handleSelectTool}
          />
        );

      case 'interior_studio':
        return (
          <InteriorDesignStudio
            onBack={() => setScreen('interior')}
            onSaveProject={handleSaveProject}
          />
        );

      case 'floorplan_studio':
        return (
          <FloorPlanStudio
            onBack={() => setScreen('floorplan')}
            onSaveProject={handleSaveProject}
          />
        );

      case 'exterior_studio':
        return (
          <ExteriorDesignStudio
            onBack={() => setScreen('exterior')}
            onSaveProject={handleSaveProject}
          />
        );

      case 'video_studio':
      case 'walkthrough_studio':
        return (
          <Video3DStudio
            mode={activeVideoMode}
            onBack={() => setScreen(activeVideoMode === 'video' ? 'video' : 'walkthrough')}
            selectedVideo={selectedVideo}
            onSelectVideo={(v) => setSelectedVideo(v)}
            favoritesMap={favoritesMapBoolean}
            onToggleFavorite={handleToggleFavorite}
            onDownloadRender={handleDownloadRender}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#02050f] text-slate-100 flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      {/* App Header spanning full width */}
      <Header
        variant="home"
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
        onOpenSearch={() => setIsSearchOpen(true)}
        avatarUrl={userProfile.avatar}
        unreadCount={unreadNotificationsCount}
        onOpenNotifications={handleOpenNotifications}
        onOpenProfile={() => {
          setTab('profile');
          setScreen('profile');
        }}
      />

      {/* Main Viewport Container expanding fully across the display */}
      <main className="w-full flex-1 flex flex-col overflow-y-auto px-3 sm:px-6 md:px-8 py-4 sm:py-6">
        {renderContent()}
      </main>

      {/* Bottom Nav Bar spanning across display */}
      <BottomNav
        currentTab={tab}
        onSelectTab={handleTabChange}
        favoritesCount={favoritesCount}
        favoritesBadgeCount={unseenFavoritesCount}
        projectsCount={projects.length}
      />

      {/* Halfway sliding 3-dash navigation drawer with Back button */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={(scr) => {
          setIsMenuOpen(false);
          if (scr === 'favorites') {
            handleOpenFavorites();
            return;
          }
          setScreen(scr);
          if (scr === 'explore') setTab('explore');
          if (scr === 'projects') setTab('projects');
          if (scr === 'profile') setTab('profile');
          if (scr === 'uploads') setTab('uploads');
        }}
        onOpenNewProject={() => {
          setIsMenuOpen(false);
          setIsNewProjectOpen(true);
        }}
        onSelectTool={(tool) => {
          setIsMenuOpen(false);
          handleSelectTool(tool);
        }}
        onOpenPrivacy={() => {
          setIsMenuOpen(false);
          setIsGlobalPrivacyOpen(true);
        }}
        onResetAccount={handleResetAccount}
        favoritesCount={favoritesCount}
        unseenFavoritesCount={unseenFavoritesCount}
        projectsCount={projects.length}
      />

      {/* MODALS & DRAWERS */}
      <NewProjectModal
        isOpen={isNewProjectOpen}
        onClose={() => setIsNewProjectOpen(false)}
        onSelectTool={handleSelectTool}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        projects={projects}
        onSelectProject={(p) => setSelectedProjectForDetail(p)}
      />

      <NotificationDrawer
        isOpen={isNotificationsDrawerOpen}
        onClose={() => setIsNotificationsDrawerOpen(false)}
      />

      <ProjectDetailModal
        project={selectedProjectForDetail}
        onClose={() => setSelectedProjectForDetail(null)}
        isFavorite={selectedProjectForDetail ? !!favoritesMap[selectedProjectForDetail.id] : false}
        onToggleFavorite={handleToggleFavorite}
        onDownload={handleDownloadRender}
      />

      <PrivacySecurityModal
        isOpen={isGlobalPrivacyOpen}
        onClose={() => setIsGlobalPrivacyOpen(false)}
        projectsCount={projects.length}
        favoritesCount={favoritesCount}
        onClearAllData={handleResetAccount}
      />
    </div>
  );
}
