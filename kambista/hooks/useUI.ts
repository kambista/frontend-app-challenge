import { useUIStore } from '@/store/uiStore';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

const useUI = () => {
  const { showTabBar: showTabBarStore, hideTabBar: hideTabBarStore, isTabBarVisible } = useUIStore();

  const showTabBar = () => {
    showTabBarStore();
  };

  const hideTabBar = () => {
    hideTabBarStore();
  };

  const forceShowTabBar = () => {
    return useFocusEffect(
      useCallback(() => {
        showTabBar();
      }, [])
    );
  };

  return { showTabBar, hideTabBar, isTabBarVisible, forceShowTabBar };
};

export default useUI;
