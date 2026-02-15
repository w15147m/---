import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { THEME_OPTIONS } from '../utils/settingsData';

const ThemeSelector = ({ themeMode, setThemeMode }) => {
  return (
    <View className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 my-4">
      <Text className="text-lg font-bold text-slate-900 dark:text-white mb-4">Appearance</Text>
      
      <View className="flex-row space-x-3">
        {THEME_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.id}
            onPress={() => setThemeMode(option.id)}
            activeOpacity={0.7}
            className={`flex-1 items-center justify-center py-3 px-2 rounded-xl border-2 ${
              themeMode === option.id 
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' 
                : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50'
            }`}
          >
            <View className="w-8 h-8 items-center justify-center mb-1">
              <option.icon 
                size={20} 
                color={themeMode === option.id ? '#6366f1' : '#94a3b8'} 
                strokeWidth={2} 
              />
            </View>
            <Text className={`text-xs font-bold text-center ${
              themeMode === option.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
            }`}>
              {option.id === 'system' ? 'Auto' : option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ThemeSelector;
