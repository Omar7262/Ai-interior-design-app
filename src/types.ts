export type ScreenType =
  | 'home'
  | 'menu'
  | 'explore'
  | 'interior'
  | 'floorplan'
  | 'exterior'
  | 'video'
  | 'walkthrough'
  | 'projects'
  | 'uploads'
  | 'notifications'
  | 'profile'
  | 'favorites'
  | 'interior_studio'
  | 'floorplan_studio'
  | 'exterior_studio'
  | 'video_studio'
  | 'walkthrough_studio';

export interface ExploreItem {
  id: string;
  title: string;
  designer: string;
  category: string;
  image: string;
  likes: number;
  tags: string[];
  prompt: string;
  style: string;
}

export interface UserProfile {
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  email?: string;
  authProvider?: 'gmail' | 'email';
  location?: string;
  title?: string;
  stats: {
    projects: number;
    favorites: number;
    downloads: number;
    joined: string;
  };
  isPremium: boolean;
  isVerified?: boolean;
}

export type TabType = 'home' | 'explore' | 'projects' | 'favorites' | 'profile' | 'uploads' | 'notifications';

export type ToolType = 'interior' | 'floorplan' | 'exterior' | 'video' | '3d';

export interface Project {
  id: string;
  title: string;
  type: ToolType;
  typeLabel: string;
  timeAgo: string;
  date: string;
  thumbnail: string;
  beforeImage?: string;
  afterImage: string;
  style: string;
  roomType?: string;
  prompt: string;
  colorPalette?: string[];
  materials?: string[];
  likes?: number;
  views?: string;
  status?: 'Completed' | 'In Progress' | 'Draft';
  isFavorite?: boolean;
}

export interface NotificationItem {
  id: string;
  type: 'message' | 'project' | 'like' | 'share' | 'system' | 'download' | 'reminder' | 'feature';
  title: string;
  message: string;
  time: string;
  read: boolean;
  avatar?: string;
  thumbnail?: string;
  actionText?: string;
}

export interface UploadItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  size: string;
  date: string;
  thumbnail: string;
}

export interface WalkthroughItem {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  category: string;
  rooms: string;
  floors: string;
  type: string;
}

export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  category: string;
  space: string;
  badge: 'Trending' | 'Popular' | 'New';
  cameraMotion?: string;
  description?: string;
  resolution?: string;
  isLiked?: boolean;
}
