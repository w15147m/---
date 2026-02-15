import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  StatusBar, 
  Vibration
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowPathIcon, AdjustmentsHorizontalIcon } from 'react-native-heroicons/outline';
import { useTheme } from '../../context/ThemeContext';
import { useFont } from '../../context/FontContext';
import HomeHeader from '../../common/components/HomeHeader';
import TasbihCounter from './components/TasbihCounter';
import CustomGoalModal from './components/CustomGoalModal';

const TASBIH_STEPS = [
  { id: 'allahu_akbar', title: 'Allahu Akbar', arabic: 'اللهُ أَكْبَر', target: 34, color: '#f59e0b' },
  { id: 'alhamdulillah', title: 'Al-hamdulillah', arabic: 'الْحَمْدُ لِلَّه', target: 33, color: '#10b981' },
  { id: 'subhanallah', title: 'Subhan Allah', arabic: 'سُبْحَانَ اللَّه', target: 33, color: '#6366f1' },
];

const COMMON_ZIKRS = [
  { value: '1', label: 'Subhan Allah', arabic: 'سُبْحَانَ اللَّه' },
  { value: '2', label: 'Al-hamdulillah', arabic: 'الْحَمْدُ لِلَّه' },
  { value: '3', label: 'Allahu Akbar', arabic: 'اللهُ أَكْبَر' },
  { value: '4', label: 'La ilaha illallah', arabic: 'لَا إِلٰهَ إِلَّا اللّٰه' },
  { value: '5', label: 'Salawat', arabic: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَآلِ مُحَمَّدٍ' },
  { value: '6', label: 'Astaghfirullah', arabic: 'أَسْتَغْفِرُ اللّٰه' },
  { value: '7', label: 'Ya Allah', arabic: 'يَا اللّٰه' },
  { value: '8', label: 'Ya Ali', arabic: 'يَا عَلِي' },
  { value: '9', label: 'Ya Hussain', arabic: 'يَا حُسَيْن' },
];

const Tasbih = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const { arabicSize } = useFont();
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  // Custom Goal States
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customZikr, setCustomZikr] = useState(COMMON_ZIKRS[0]);
  const [customGoal, setCustomGoal] = useState('100');
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  // Temp states for modal
  const [tempZikrId, setTempZikrId] = useState(['1']);
  const [tempGoal, setTempGoal] = useState('100');

  const selectedZikr = COMMON_ZIKRS.find(z => z.value === tempZikrId[0]) || COMMON_ZIKRS[0];

  const currentStep = isCustomMode 
    ? { title: customZikr.label, arabic: customZikr.arabic, target: parseInt(customGoal) || 100 }
    : TASBIH_STEPS[currentStepIndex];

  const handlePress = useCallback(() => {
    if (isFinished) return;

    Vibration.vibrate(10);
    const nextCount = count + 1;
    
    if (nextCount >= currentStep.target) {
      if (!isCustomMode && currentStepIndex < TASBIH_STEPS.length - 1) {
        setCurrentStepIndex(currentStepIndex + 1);
        setCount(0);
      } else {
        setCount(currentStep.target);
        setIsFinished(true);
      }
    } else {
      setCount(nextCount);
    }
  }, [count, currentStepIndex, isFinished, currentStep, isCustomMode]);

  const handleReset = () => {
    if (!isCustomMode) setCurrentStepIndex(0);
    setCount(0);
    setIsFinished(false);
    Vibration.vibrate(50);
  };

  const handleApplyCustom = () => {
    setCustomZikr(selectedZikr);
    setCustomGoal(tempGoal);
    setIsCustomMode(true);
    setCount(0);
    setIsFinished(false);
    setIsModalVisible(false);
    Vibration.vibrate(70);
  };

  const resetToDefault = () => {
    setIsCustomMode(false);
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
            title={isCustomMode ? "Custom Zikr" : "Tasbih"}
            onOpenDrawer={() => navigation.openDrawer()} 
          />

          {/* Top Action Bar - Buttons at the top of the page content */}
          <View className="flex-row justify-between items-center mt-6">
            <TouchableOpacity 
              onPress={handleReset}
              className="flex-row items-center space-x-2 bg-slate-200 dark:bg-slate-800 px-5 py-3 rounded-2xl shadow-sm"
            >
              <ArrowPathIcon size={18} color={isDarkMode ? "#94a3b8" : "#64748b"} />
              <Text className="text-slate-600 dark:text-slate-300 font-bold">Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => {
                setTempZikrId([customZikr.value]);
                setTempGoal(customGoal);
                setIsModalVisible(true);
              }}
              className="flex-row items-center space-x-2 bg-indigo-600 px-5 py-3 rounded-2xl shadow-lg shadow-indigo-500/20"
            >
              <AdjustmentsHorizontalIcon size={18} color="white" />
              <Text className="text-white font-bold">
                {isCustomMode ? "Change Goal" : "Set Goal"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Entire screen area is the hit zone */}
          <TouchableOpacity 
            activeOpacity={0.95} 
            onPress={handlePress}
            className="flex-1 justify-center items-center"
          >
            <TasbihCounter
              currentStep={currentStep}
              count={count}
              isFinished={isFinished}
              isCustomMode={isCustomMode}
              onResetToDefault={resetToDefault}
              arabicSize={arabicSize}
              isDarkMode={isDarkMode}
            />
          </TouchableOpacity>

          <CustomGoalModal
            isVisible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            tempGoal={tempGoal}
            setTempGoal={setTempGoal}
            tempZikrId={tempZikrId}
            setTempZikrId={setTempZikrId}
            onApply={handleApplyCustom}
            zikrData={COMMON_ZIKRS}
            isDarkMode={isDarkMode}
          />

        </View>
      </SafeAreaView>
    </View>
  );
};

export default Tasbih;
