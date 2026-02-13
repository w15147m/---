import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const PrayerListItem = ({ item, isDarkMode, onPress }) => {
  return (
    <TouchableOpacity 
      className="flex-row items-start py-6 px-6 border-b border-slate-100 dark:border-slate-900"
      activeOpacity={0.6}
      onPress={onPress}
    >
      {/* Number in stylized 8-pointed star */}
      <View className="w-10 h-10 items-center justify-center mr-4 mt-0.5">
        <View className="absolute w-8 h-8 border border-emerald-600/40 dark:border-emerald-500/40 rotate-0 rounded-[2px]" />
        <View className="absolute w-8 h-8 border border-emerald-600/40 dark:border-emerald-500/40 rotate-45 rounded-[2px]" />
        <Text className="font-bold text-slate-800 dark:text-slate-200 text-xs">{item.id}</Text>
      </View>

      <View className="flex-1">
        {/* Row for Titles - Both wrap independently and don't overlap */}
        <View className="flex-row justify-between items-start mb-2">
          <Text className="text-[17px] font-bold text-slate-900 dark:text-slate-100 flex-1 mr-2">
            {item.englishName}
          </Text>
          <Text 
            style={{ fontFamily: 'AlQuranIndoPak', fontSize: 17, textAlign: 'right' }}
            className="text-emerald-700 dark:text-emerald-400 flex-1"
          >
            {item.arabicName}
          </Text>
        </View>

        {/* Detail Row */}
        <Text className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          {item.type} • {item.detail}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PrayerListItem;
