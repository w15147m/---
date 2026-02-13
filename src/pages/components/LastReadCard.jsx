import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { BookmarkIcon } from 'react-native-heroicons/solid';

const LastReadCard = ({ title, subtitle, icon, onPressBookmark }) => {
  return (
    <View className="bg-sky-400/80 rounded-3xl p-5 mb-8 overflow-hidden">
      <View className="flex-row items-center mb-4">
        <Image 
          source={icon} 
          style={{ width: 40, height: 40, tintColor: 'white' }} 
        />
        <Text className="text-white text-lg font-bold ml-2">Last Read</Text>
      </View>

      <View className="flex-row justify-between items-end">
        <View>
          <Text className="text-white text-2xl font-black mb-1">{title}</Text>
          <Text className="text-white/90 text-sm">{subtitle}</Text>
        </View>
        <TouchableOpacity 
          className="bg-white p-3 rounded-2xl shadow-lg"
          onPress={onPressBookmark}
        >
          <BookmarkIcon size={24} color="#38bdf8" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LastReadCard;
