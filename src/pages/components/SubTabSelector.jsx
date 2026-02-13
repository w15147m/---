import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const SubTabSelector = ({ tabs, activeTabId, onTabPress }) => {
  if (!tabs || tabs.length === 0) return null;

  return (
    <View className="bg-sky-400/20 rounded-2xl flex-row p-1 mt-4 mb-4">
      {tabs.map((tab) => {
        const isActive = activeTabId === tab.id;
        // Clean name: Remove text in parentheses (e.g., '(Specific)')
        const displayName = tab.name.replace(/\s*\(.*?\)\s*/g, '').trim();
        
        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onTabPress(tab.id)}
            className={`flex-1 py-3 items-center rounded-xl ${isActive ? 'bg-sky-400 shadow-lg' : ''}`}
          >
            <Text 
              className={`text-lg transition-all ${isActive ? 'text-white font-bold' : 'text-white/60 font-medium'}`}
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
