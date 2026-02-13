import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const SubTabSelector = ({ tabs, activeTabId, onTabPress }) => {
  if (!tabs || tabs.length === 0) return null;

  return (
    <View className="flex-row justify-around mt-4 mb-6 border-b border-slate-200 dark:border-white/5">
        {tabs.map((tab) => {
        const isActive = activeTabId === tab.id;
        // Clean name
        const displayName = tab.name.replace(/\s*\(.*?\)\s*/g, '').trim();
        
        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onTabPress(tab.id)}
            className={`mr-8 pb-3 items-center ${isActive ? 'border-b-4 border-sky-400' : ''}`}
          >
            <Text 
              className={`text-lg font-bold ${isActive ? 'text-sky-400' : 'text-slate-400 dark:text-slate-500'}`}
            >
              {displayName}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SubTabSelector;
