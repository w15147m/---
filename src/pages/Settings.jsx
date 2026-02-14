import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { MinusIcon, PlusIcon, MoonIcon, SunIcon, CloudArrowDownIcon, ChevronRightIcon } from 'react-native-heroicons/outline';
import { useTheme } from '../context/ThemeContext';
import { useFont } from '../context/FontContext';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { arabicSize, translationSize, headerSize, listTitleSize, setFontSize } = useFont();
  const navigation = useNavigation();

  const fontSettings = [
    {
      key: 'arabicSize',
      label: 'Arabic Text Size',
      currentSize: arabicSize,
      min: 20,
      max: 44,
      preview: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
      description: 'Main Arabic content in articles'
    },
    {
      key: 'translationSize',
      label: 'Translation Text Size',
      currentSize: translationSize,
      min: 14,
      max: 28,
      preview: 'In the name of Allah, the Most Gracious, the Most Merciful',
      description: 'Urdu and English translations'
    },
    {
      key: 'headerSize',
      label: 'Header Text Size',
      currentSize: headerSize,
      min: 18,
      max: 36,
      preview: 'دُعَاءُ الصَّبَاحِ',
      description: 'Article titles and headers'
    },
    {
      key: 'listTitleSize',
      label: 'List Item Title Size',
      currentSize: listTitleSize,
      min: 16,
      max: 30,
      preview: 'تَعْقِيبَاتِ نَمَازِ صُبْح',
      description: 'Prayer and chapter list items'
    }
  ];

  const handleDecrease = (key, currentSize, min) => {
    if (currentSize > min) {
      setFontSize(key, currentSize - 1);
    }
  };

  const handleIncrease = (key, currentSize, max) => {
    if (currentSize < max) {
      setFontSize(key, currentSize + 1);
    }
  };

  return (
    <SafeAreaView className="flex-1 mt-10 bg-slate-50 dark:bg-slate-950">
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        
        {/* Dark Mode Toggle */}
        <View className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 rounded-xl items-center justify-center mr-4">
                {isDarkMode ? (
                  <MoonIcon size={20} color="#fbbf24" />
                ) : (
                  <SunIcon size={20} color="#f59e0b" />
                )}
              </View>
              <View className="flex-1">
                <Text className="text-lg font-bold text-slate-900 dark:text-white">
                  {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                </Text>
                
              </View>
            </View>
            <TouchableOpacity
              onPress={toggleTheme}
              activeOpacity={0.8}
              className={`w-14 h-8 rounded-full px-1 justify-center ${isDarkMode ? 'bg-indigo-600 items-end' : 'bg-slate-300 items-start'}`}
            >
              <View className="w-6 h-6 bg-white rounded-full shadow-sm" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Font Size Controls */}
        {fontSettings.map((setting, index) => (
          <View 
            key={setting.key}
            className={`bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 ${index < fontSettings.length - 1 ? 'mb-4' : ''}`}
          >
            {/* Label */}
            <View className="mb-3">
              <Text className="text-lg font-bold text-slate-900 dark:text-white">
                {setting.label}
              </Text>
              <Text className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {setting.description}
              </Text>
            </View>

            {/* Live Preview */}
            <View className="items-center py-6 mb-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <Text 
                className="text-slate-900 dark:text-white text-center px-4"
                style={{ 
                  fontFamily: setting.key === 'translationSize' ? undefined : 'KFGQPCUthmanTahaNaskh-Bold',
                  fontSize: setting.currentSize,
                  lineHeight: setting.currentSize * 1.6
                }}
              >
                {setting.preview}
              </Text>
            </View>

            {/* Size Controls */}
            <View className="flex-row items-center justify-between mb-3">
              {/* Decrease Button */}
              <TouchableOpacity
                onPress={() => handleDecrease(setting.key, setting.currentSize, setting.min)}
                disabled={setting.currentSize <= setting.min}
                className={`w-12 h-12 rounded-full items-center justify-center ${
                  setting.currentSize <= setting.min 
                    ? 'bg-slate-200 dark:bg-slate-800' 
                    : 'bg-indigo-100 dark:bg-indigo-900/30'
                }`}
                activeOpacity={0.7}
              >
                <MinusIcon 
                  size={24} 
                  color={setting.currentSize <= setting.min ? '#94a3b8' : '#6366f1'} 
                />
              </TouchableOpacity>

              {/* Progress Bar */}
              <View className="flex-1 mx-4">
                <View className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <View 
                    className="h-full bg-indigo-600"
                    style={{ 
                      width: `${((setting.currentSize - setting.min) / (setting.max - setting.min)) * 100}%` 
                    }}
                  />
                </View>
              </View>

              {/* Increase Button */}
              <TouchableOpacity
                onPress={() => handleIncrease(setting.key, setting.currentSize, setting.max)}
                disabled={setting.currentSize >= setting.max}
                className={`w-12 h-12 rounded-full items-center justify-center ${
                  setting.currentSize >= setting.max 
                    ? 'bg-slate-200 dark:bg-slate-800' 
                    : 'bg-indigo-100 dark:bg-indigo-900/30'
                }`}
                activeOpacity={0.7}
              >
                <PlusIcon 
                  size={24} 
                  color={setting.currentSize >= setting.max ? '#94a3b8' : '#6366f1'} 
                />
              </TouchableOpacity>
            </View>

            {/* Size Label */}
            <View className="flex-row justify-between">
              <Text className="text-sm text-slate-500 dark:text-slate-400">
                Small ({setting.min})
              </Text>
              <Text className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                {Math.round(setting.currentSize)}
              </Text>
              <Text className="text-sm text-slate-500 dark:text-slate-400">
                Large ({setting.max})
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
