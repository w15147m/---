import React from 'react';
import { View, Text, StatusBar, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { MinusIcon, PlusIcon, MoonIcon, SunIcon, ComputerDesktopIcon, ChevronRightIcon } from 'react-native-heroicons/outline';
import { useTheme } from '../context/ThemeContext';
import { useFont } from '../context/FontContext';
import { useNavigation } from '@react-navigation/native';
import HomeHeader from './components/HomeHeader';

const Settings = () => {
  const { themeMode, setThemeMode, isDarkMode } = useTheme();
  const { arabicSize, translationSize, headerSize, listTitleSize, setFontSize } = useFont();
  const navigation = useNavigation();

  const themeOptions = [
    { id: 'light', label: 'Light', icon: SunIcon, color: '#f59e0b', bgColor: 'bg-amber-50 dark:bg-amber-900/10' },
    { id: 'dark', label: 'Dark', icon: MoonIcon, color: '#fbbf24', bgColor: 'bg-amber-50 dark:bg-amber-900/10' },
    { id: 'system', label: 'Follow system', icon: ComputerDesktopIcon, color: '#6366f1', bgColor: 'bg-indigo-50 dark:bg-indigo-900/10' }
  ];

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
    <View className="flex-1 bg-slate-50 dark:bg-slate-950">
      <StatusBar 
        translucent 
        backgroundColor="transparent" 
        barStyle={isDarkMode ? "light-content" : "dark-content"} 
      />
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-6">
          
          {/* Top Navigation - Reusing HomeHeader with Title */}
          <HomeHeader 
            title="Settings"
            onOpenDrawer={() => navigation.openDrawer()} 
            iconColor={isDarkMode ? "white" : "#0f172a"}
          />

          <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            {/* Theme Selection Section */}
            <View className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 my-4">
              <Text className="text-lg font-bold text-slate-900 dark:text-white mb-4">Theme</Text>
              
              <View className="flex-row space-x-3">
                {themeOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    onPress={() => setThemeMode(option.id)}
                    activeOpacity={0.7}
                    className={`flex-1 items-center justify-center p-4 rounded-xl border-2 ${
                      themeMode === option.id 
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' 
                        : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50'
                    }`}
                  >
                    <View className={`w-10 h-10 items-center justify-center mb-2`}>
                      <option.icon 
                        size={24} 
                        color={themeMode === option.id ? '#6366f1' : '#94a3b8'} 
                        strokeWidth={2} 
                      />
                    </View>
                    <Text className={`text-sm font-bold text-center ${
                      themeMode === option.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      {option.id === 'system' ? 'Auto' : option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Font Size Controls Section */}
            {fontSettings.map((setting, index) => (
              <View 
                key={setting.key}
                className={`bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 ${
                  index < fontSettings.length - 1 ? 'mb-4' : ''
                }`}
              >
                {/* Header & Description */}
                <View className="mb-3">
                  <Text className="text-lg font-bold text-slate-900 dark:text-white">
                    {setting.label}
                  </Text>
                  <Text className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    {setting.description}
                  </Text>
                </View>

                {/* Live Preview Card */}
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

                {/* Adjustment Buttons & Bar */}
                <View className="flex-row items-center justify-between mb-3">
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

                {/* Labels & Current Value */}
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
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Settings;
