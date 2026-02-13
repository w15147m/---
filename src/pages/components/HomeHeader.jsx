import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Bars3BottomLeftIcon, UserIcon } from 'react-native-heroicons/solid';
import { useTheme } from '../../context/ThemeContext';

const HomeHeader = ({ onOpenDrawer, userAvatar }) => {
  const { isDarkMode } = useTheme();

  return (
    <View className="flex-row justify-between items-center pt-12 pb-0">
    
      <View className={`w-10 h-10 rounded-full border-2 ${isDarkMode ? 'border-white/50' : 'border-slate-200'} overflow-hidden`}>
      {userAvatar ? 
        <Image 
          source={{ uri: userAvatar }} 
          className="w-full h-full"
          resizeMode="cover"
        />
      : (
        <View className="w-full h-full bg-slate-100 dark:bg-slate-800 rounded-full items-center justify-center">
          <UserIcon size={20} color={isDarkMode ? "#94a3b8" : "#64748b"} />
        </View>
      )}
       
      </View>
        <TouchableOpacity onPress={onOpenDrawer}>
        <Bars3BottomLeftIcon size={30} color={isDarkMode ? "white" : "#0f172a"} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;
