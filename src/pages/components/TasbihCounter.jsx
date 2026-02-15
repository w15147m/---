import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const TasbihCounter = ({ 
  currentStep, 
  count, 
  isFinished, 
  isCustomMode, 
  onResetToDefault,
  arabicSize,
  isDarkMode 
}) => {
  return (
    <View className="flex-1 justify-center items-center w-full">
      {/* Title & Label positioned just above beads */}
      <View className="items-center mb-8">
        <Text 
          className="text-center text-slate-900 dark:text-white"
          style={{ 
            fontFamily: 'KFGQPCUthmanTahaNaskh-Bold',
            fontSize: Math.max(arabicSize * 1.3, 36),
            lineHeight: Math.max(arabicSize * 2, 54),
            marginBottom: 2
          }}
        >
          {isFinished ? 'تَقَبَّلَ اللَّهُ' : currentStep.arabic}
        </Text>
        {!isFinished && (
          <Text className="text-slate-500 dark:text-slate-400 font-bold text-base">
            {currentStep.title}
          </Text>
        )}
      </View>

      {/* Center Area with Beads and Count */}
      <View className="w-full aspect-square items-center justify-center relative max-h-[350]">
        <Image 
          source={require('../../assets/ui-assets/tasbeeh.png')}
          className="absolute inset-0 w-full h-full"
          resizeMode="contain"
          style={{ 
            opacity: isDarkMode ? 0.35 : 0.45, 
            tintColor: isFinished ? '#10b981' : '#6366f1' 
          }}
        />

        <View className="items-center justify-center pb-12">
          <Text className="text-9xl font-black text-slate-900 dark:text-white leading-none">
            {count}
          </Text>

          {isFinished && (
            <View className="mt-8 bg-emerald-500 w-12 h-12 rounded-full items-center justify-center border-4 border-white dark:border-slate-900 shadow-lg">
              <Text className="text-white text-2xl font-bold">✓</Text>
            </View>
          )}
        </View>
      </View>

      {/* Goal info under beads */}
      <View className="mt-8 items-center">
        {!isFinished ? (
          <Text className="text-slate-400 dark:text-slate-500 font-bold text-base uppercase tracking-widest">
            GOAL: {currentStep.target}
          </Text>
        ) : isCustomMode && (
          <TouchableOpacity 
            onPress={onResetToDefault}
            className="mt-4 bg-slate-200 dark:bg-slate-800 px-6 py-2 rounded-full"
          >
            <Text className="text-slate-600 dark:text-slate-300 font-bold">Standard Tasbih</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TasbihCounter;
