import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

const MainTabSelector = ({ tabs, activeTabId, onTabPress }) => {
  if (!tabs || tabs.length === 0) return null;

  return (
    <View className="mb-4">
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
      >
        {tabs.map((tab) => {
          const isActive = activeTabId === tab.id;
          // Clean name: Remove text in parentheses (e.g., English translations)
          const displayName = tab.name.replace(/\s*\(.*?\)\s*/g, '').trim();
          
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => onTabPress(tab.id)}
              className={`mr-8 pb-3 items-center ${isActive ? 'border-b-4 border-sky-400' : ''}`}
            >
              <Text 
                className={`text-xl font-bold ${isActive ? 'text-sky-400' : 'text-slate-400'}`}
              >
                {displayName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MainTabSelector;
