import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const CategoryCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="w-[47%] bg-sky-300/60 rounded-3xl p-5 mb-5 relative overflow-hidden"
    >
      <Image 
        source={item.icon} 
        style={{ width: 60, height: 60, opacity: 0.3, position: 'absolute', bottom: -10, right: -10 }} 
      />
      <View className="z-10 items-start">
        <Text className="text-indigo-950 dark:text-white text-2xl font-black mb-1 font-islamic text-right">{item.title_ur}</Text>
        <Text className="text-slate-700 dark:text-white/90 text-md font-bold">{item.title_en}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
