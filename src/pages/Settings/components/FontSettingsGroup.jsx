import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MinusIcon, PlusIcon } from 'react-native-heroicons/outline';
import { FONT_CONFIG } from '../utils/settingsData';

const FontSettingsGroup = ({ fontSizes, setFontSize }) => {
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
    <View className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 mb-8">
      <Text className="text-lg font-bold text-slate-900 dark:text-white mb-6">Text Appearance</Text>

      {FONT_CONFIG.map((setting, index) => {
        const currentSize = fontSizes[setting.key];
        
        return (
          <View 
            key={setting.key}
            className={index < FONT_CONFIG.length - 1 ? 'mb-8 pb-8 border-b border-slate-50 dark:border-slate-800' : ''}
          >
            {/* Header & Description */}
            <View className="mb-4">
              <Text className="text-md font-bold text-slate-900 dark:text-white">
                {setting.label}
              </Text>
              <Text className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {setting.description}
              </Text>
            </View>

            {/* Adjustment Buttons & Bar */}
            <View className="flex-row items-center justify-between mb-3">
              <TouchableOpacity
                onPress={() => handleDecrease(setting.key, currentSize, setting.min)}
                disabled={currentSize <= setting.min}
                className={`w-10 h-10 rounded-full items-center justify-center ${
                  currentSize <= setting.min 
                    ? 'bg-slate-200 dark:bg-slate-800' 
                    : 'bg-indigo-100 dark:bg-indigo-900/30'
                }`}
                activeOpacity={0.7}
              >
                <MinusIcon 
                  size={20} 
                  color={currentSize <= setting.min ? '#94a3b8' : '#6366f1'} 
                />
              </TouchableOpacity>

              <View className="flex-1 mx-4">
                <View className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <View 
                    className="h-full bg-indigo-600"
                    style={{ 
                      width: `${((currentSize - setting.min) / (setting.max - setting.min)) * 100}%` 
                    }}
                  />
                </View>
              </View>

              <TouchableOpacity
                onPress={() => handleIncrease(setting.key, currentSize, setting.max)}
                disabled={currentSize >= setting.max}
                className={`w-10 h-10 rounded-full items-center justify-center ${
                  currentSize >= setting.max 
                    ? 'bg-slate-200 dark:bg-slate-800' 
                    : 'bg-indigo-100 dark:bg-indigo-900/30'
                }`}
                activeOpacity={0.7}
              >
                <PlusIcon 
                  size={20} 
                  color={currentSize >= setting.max ? '#94a3b8' : '#6366f1'} 
                />
              </TouchableOpacity>
            </View>

            {/* Labels & Current Value */}
            <View className="flex-row justify-between mb-5">
              <Text className="text-[10px] text-slate-500 dark:text-slate-400">
                Small ({setting.min})
              </Text>
              <Text className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                {Math.round(currentSize)}pt
              </Text>
              <Text className="text-[10px] text-slate-500 dark:text-slate-400">
                Large ({setting.max})
              </Text>
            </View>

            {/* Live Preview Card */}
            <View className="items-center py-5 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <Text 
                className="text-slate-900 dark:text-white text-center px-4"
                style={{ 
                  fontFamily: setting.key === 'translationSize' ? undefined : 'KFGQPCUthmanTahaNaskh-Bold',
                  fontSize: currentSize,
                  lineHeight: currentSize * (setting.key === 'translationSize' ? 1.4 : 1.8)
                }}
              >
                {setting.preview}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default FontSettingsGroup;
