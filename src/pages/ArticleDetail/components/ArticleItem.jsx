import React from 'react';
import { View, Text } from 'react-native';

const ArticleItem = ({ item, index, isDarkMode, arabicSize, translationSize }) => {
  return (
    <View className="mb-0">
      {/* Lined Background Container */}
      <View 
        className="relative py-0"
        style={{
          backgroundColor: isDarkMode 
            ? (index % 2 === 0 ? '#0f172a' : '#1e293b') // slate-900 : slate-800
            : (index % 2 === 0 ? '#ffffff' : '#fcfcfc') 
        }}
      >
        {/* Notebook Lines Background */}
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
          {Array.from({ length: Math.ceil((item.arabic_text?.length || 0) / 40) + 4 }).map((_, i) => (
            <View 
              key={i} 
              style={{ 
                height: 60, 
                borderBottomWidth: 1, 
                borderBottomColor: isDarkMode ? '#334155' : '#cbd5e1', // slate-700 : slate-300
                width: '100%'
              }} 
            />
          ))}
        </View>

        {item.instruction && (
          <Text className="text-indigo-600 dark:text-indigo-400 font-bold text-center italic px-2 mt-6 mb-2">
            ({item.instruction})
          </Text>
        )}
        
        <Text 
          className="text-slate-900 dark:text-white text-center px-1"
          style={{ 
            fontFamily: 'KFGQPCUthmanTahaNaskh-Bold',
            fontSize: arabicSize,
            lineHeight: 60, 
            paddingTop: 8, // Adjust to sit on the line
            paddingBottom: 12 // Clear descenders
          }}
        >
          {item.arabic_text}
        </Text>

        {/* Sub-content (Translations) */}
        <View className="px-4 pb-8 space-y-4 pt-4">
          {item.urdu_translation && (
             <Text 
               className="text-slate-600 dark:text-slate-300 text-center font-serif"
               style={{ fontSize: translationSize, lineHeight: translationSize * 1.6 }}
             >
              {item.urdu_translation}
            </Text>
          )}
          {item.english_translation && (
            <Text 
              className="text-slate-400 dark:text-slate-500 text-center italic"
              style={{ fontSize: translationSize - 4, lineHeight: (translationSize - 4) * 1.6 }}
            >
              {item.english_translation}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default ArticleItem;
