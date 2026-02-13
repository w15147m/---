import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Bars3BottomLeftIcon } from 'react-native-heroicons/solid';

const HomeHeader = ({ onOpenDrawer, userAvatar, iconColor = "white" }) => {
  return (
    <View className="flex-row justify-between items-center pt-12 pb-0">
      <TouchableOpacity onPress={onOpenDrawer}>
        <Bars3BottomLeftIcon size={30} color={iconColor} />
      </TouchableOpacity>
      <View className="w-10 h-10 rounded-full border-2 border-slate-200 dark:border-white/50 overflow-hidden">
        <Image 
          source={{ uri: userAvatar || 'https://i.pravatar.cc/150?u=muslim_user' }} 
          className="w-full h-full"
        />
      </View>
    </View>
  );
};

export default HomeHeader;
