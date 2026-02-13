import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const FeatureCard = ({ title, Icon, bgColor, iconColor, isDarkMode, onPress }) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.7}
      className={`w-[48%] aspect-square rounded-[32px] p-5 mb-4 border shadow-xl shadow-black/5 elevation-2 ${
        isDarkMode 
          ? 'bg-slate-900/40 border-slate-800/50' 
          : `${bgColor} border-white/20`
      }`}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
      }}
    >
      <Text 
        style={{ color: isDarkMode ? '#ffffff' : iconColor }}
        className="font-black text-lg mb-4"
      >
        {title}
      </Text>
      <View className="flex-1 items-center justify-center -mb-2">
        <Icon size={64} color={isDarkMode ? "#cbd5e1" : iconColor} />
      </View>
    </TouchableOpacity>
  );
};

export default FeatureCard;
