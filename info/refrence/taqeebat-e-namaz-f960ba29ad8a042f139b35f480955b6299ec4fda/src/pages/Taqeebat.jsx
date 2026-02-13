import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useTheme } from '../context/ThemeContext';

import PrayerListItem from './components/PrayerListItem';
import { TAQEEBAT_GROUPS, TAQEEBAT_DATA } from '../services/taqeebat.api';

const Taqeebat = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const [activeGroupId, setActiveGroupId] = useState('specific');

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#09090b]">
      {/* Custom Header */}
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full mr-2"
        >
          <ChevronLeftIcon size={24} color={isDarkMode ? '#F8FAFC' : '#1e293b'} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-900 dark:text-slate-100">Taqeebat</Text>
      </View>

      {/* Custom Group Tab Bar */}
      <View className="flex-row border-b border-slate-100 dark:border-slate-900 px-4">
        {TAQEEBAT_GROUPS.map((group) => (
          <TouchableOpacity 
            key={group.id}
            onPress={() => setActiveGroupId(group.id)}
            className={`flex-1 py-4 items-center relative`}
          >
            <Text 
              style={{ fontFamily: 'AlQuranIndoPak', fontSize: 16 }}
              className={`font-bold ${
                activeGroupId === group.id 
                  ? 'text-emerald-500 dark:text-emerald-400' 
                  : 'text-slate-400 dark:text-slate-600'
              }`}
            >
              {group.arabicName}
            </Text>
            {activeGroupId === group.id && (
              <View className="absolute bottom-0 h-[3px] w-full bg-emerald-500 dark:bg-emerald-400 rounded-t-full" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* List content */}
      <FlatList
        data={TAQEEBAT_DATA[activeGroupId]}
        renderItem={({ item }) => (
          <PrayerListItem 
            item={item} 
            isDarkMode={isDarkMode} 
            onPress={() => navigation.navigate('PrayerDetail', { item })} 
          />
        )}
        keyExtractor={(item) => `${activeGroupId}-${item.id}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </SafeAreaView>
  );
};

export default Taqeebat;
