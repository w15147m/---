import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ChevronRightIcon } from 'react-native-heroicons/solid';

const CategoryCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="w-[47%] bg-sky-300/60 rounded-3xl p-5 mb-5 items-center relative overflow-hidden"
    >
      <Image 
        source={item.icon} 
        style={{ width: 60, height: 60, opacity: 0.3, position: 'absolute', bottom: -10, right: -10 }} 
      />
      <View className="items-center z-10">
        <Text className="text-white text-2xl font-black mb-1 font-islamic">{item.title_ur}</Text>
        <Text className="text-white/90 text-md font-bold">{item.title_en}</Text>
      </View>
      <View className="absolute bottom-4 left-4 bg-indigo-950/80 p-2 rounded-full">
        <ChevronRightIcon size={16} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
