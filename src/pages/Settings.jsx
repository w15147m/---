import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { useTheme } from '../context/ThemeContext';
import { useFont } from '../context/FontContext';

const Settings = () => {
  const { isDarkMode } = useTheme();
  const { arabicSize, setFontSize } = useFont();

  const handleFontSizeChange = (value) => {
    setFontSize('arabicSize', value);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950">
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-slate-900 dark:text-white">
            Settings
          </Text>
          <Text className="text-slate-500 dark:text-slate-400 mt-1">
            Customize your reading experience
          </Text>
        </View>

        {/* Font Size Section */}
        <View className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <Text className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Font Size
          </Text>

          {/* Live Preview */}
          <View className="items-center py-8 mb-6 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <Text 
              className="text-slate-900 dark:text-white text-center"
              style={{ 
                fontFamily: 'KFGQPCUthmanTahaNaskh-Bold',
                fontSize: arabicSize,
                lineHeight: arabicSize * 1.6
              }}
            >
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </Text>
          </View>

          {/* Slider */}
          <View className="mb-2">
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={20}
              maximumValue={50}
              step={1}
              value={arabicSize}
              onValueChange={handleFontSizeChange}
              minimumTrackTintColor="#6366f1"
              maximumTrackTintColor={isDarkMode ? '#475569' : '#cbd5e1'}
              thumbTintColor="#6366f1"
            />
          </View>

          {/* Size Label */}
          <View className="flex-row justify-between">
            <Text className="text-sm text-slate-500 dark:text-slate-400">Small (20)</Text>
            <Text className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
              {Math.round(arabicSize)}
            </Text>
            <Text className="text-sm text-slate-500 dark:text-slate-400">Large (50)</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
