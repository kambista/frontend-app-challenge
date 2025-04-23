import { create } from 'zustand';

interface UIState {
  isTabBarVisible: boolean;
  hideTabBar: () => void;
  showTabBar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isTabBarVisible: true,
  showTabBar: () => set({ isTabBarVisible: true }),
  hideTabBar: () => set({ isTabBarVisible: false }),
}));
