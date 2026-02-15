import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  Image, 
  ImageBackground,
  StatusBar, 
  Vibration,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowPathIcon } from 'react-native-heroicons/outline';
import { useTheme } from '../context/ThemeContext';
import { useFont } from '../context/FontContext';
import HomeHeader from './components/HomeHeader';

const TASBIH_STEPS = [
  { id: 'allahu_akbar', title: 'Allahu Akbar', arabic: 'اللهُ أَكْبَر', target: 34, color: '#f59e0b' },
  { id: 'alhamdulillah', title: 'Al-hamdulillah', arabic: 'الْحَمْدُ لِلَّه', target: 33, color: '#10b981' },
  { id: 'subhanallah', title: 'Subhan Allah', arabic: 'سُبْحَانَ اللَّه', target: 33, color: '#6366f1' },
];

const Tasbih = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const { arabicSize } = useFont();
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentStep = TASBIH_STEPS[currentStepIndex];

  const handlePress = useCallback(() => {
    if (isFinished) return;

    // Haptic feedback (simple vibration)
    Vibration.vibrate(10);

    const nextCount = count + 1;
    
    if (nextCount >= currentStep.target) {
      if (currentStepIndex < TASBIH_STEPS.length - 1) {
        // Move to next step
        setCurrentStepIndex(currentStepIndex + 1);
        setCount(0);
      } else {
        // Finished everything
        setCount(currentStep.target);
        setIsFinished(true);
      }
    } else {
      setCount(nextCount);
    }
  }, [count, currentStepIndex, isFinished, currentStep]);

  const handleReset = () => {
    setCurrentStepIndex(0);
    setCount(0);
    setIsFinished(false);
    Vibration.vibrate(50);
  };

  return (
    <View className="flex-1 bg-slate-50 dark:bg-slate-950">
      <StatusBar translucent backgroundColor="transparent" barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-6">
          
          <HomeHeader 
            title="Tasbih"
            onOpenDrawer={() => navigation.openDrawer()} 
          />

          {/* Entire screen (excluding header and reset) is the hit area */}
          <TouchableOpacity 
            activeOpacity={0.95} 
            onPress={handlePress}
            className="flex-1 justify-center items-center py-6"
          >
            {/* Titles at the Top */}
            <View className="items-center mb-6">
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
              
              {/* Decorative Beads Border */}
              <Image 
                source={require('../assets/ui-assets/tasbeeh.png')}
                className="absolute inset-0 w-full h-full"
                resizeMode="contain"
                style={{ 
                  opacity: isDarkMode ? 0.35 : 0.45, 
                  tintColor: isFinished ? '#10b981' : '#6366f1' 
                }}
              />

              {/* Big Counter inside Beads (Shifted up slightly to account for the tassel) */}
              <View className="items-center justify-center pb-12">
                <Text className="text-9xl font-black text-slate-900 dark:text-white leading-none">
                  {count}
                </Text>

                {/* Finished Checkmark */}
                {isFinished && (
                  <View className="mt-8 bg-emerald-500 w-12 h-12 rounded-full items-center justify-center border-4 border-white dark:border-slate-900 shadow-lg">
                    <Text className="text-white text-2xl font-bold">✓</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Goal under the beads */}
            {!isFinished && (
              <View className="mt-6 items-center">
                <Text className="text-slate-400 dark:text-slate-500 font-bold text-base uppercase tracking-widest">
                  GOAL: {currentStep.target}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Reset Button (Ensure it's visible above tab bar) */}
          <View className="items-center pb-24">
            <TouchableOpacity 
              onPress={handleReset}
              className="flex-row items-center space-x-2 bg-slate-200 dark:bg-slate-800 px-8 py-4 rounded-full shadow-lg"
            >
              <ArrowPathIcon size={20} color={isDarkMode ? "#94a3b8" : "#64748b"} />
              <Text className="text-slate-600 dark:text-slate-300 font-bold text-lg">Reset Zikr</Text>
            </TouchableOpacity>
          </View>

        </View>
      </SafeAreaView>
    </View>
  );
};

export default Tasbih;
