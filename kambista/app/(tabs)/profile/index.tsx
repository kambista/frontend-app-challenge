import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import useAuth from '@/hooks/useAuth';

const Profile = () => {
  const { logout, userData } = useAuth();

  const handleSignOut = () => {
    logout();
    router.replace('/');
  };
  return (
    <SafeAreaView className="min-h-screen">
      <ScrollView className="px-6 py-2">
        <View className="my-4" />
        <Text className="font-mmedium text-xl">Perfil</Text>
        
        <View className="my-2" />
        <Text className="font-mmedium text-xl self-center">{userData.fullname}</Text>
        <Text className="font-mmedium text-gray text-base self-center">{userData.email}</Text>

        <View className="my-4" />
        <TouchableOpacity onPress={handleSignOut} className="w-full py-5 rounded-xl bg-primary">
          <Text className="text-center text-lg font-msemibold">Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
