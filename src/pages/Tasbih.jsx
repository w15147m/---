import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  Image, 
  StatusBar, 
  Vibration,
  Platform,
  Modal,
  TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowPathIcon, AdjustmentsHorizontalIcon, XMarkIcon, CheckIcon } from 'react-native-heroicons/outline';
import Select2 from 'rn-select2';
import { useTheme } from '../context/ThemeContext';
import { useFont } from '../context/FontContext';
import HomeHeader from './components/HomeHeader';

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
                setTempZikrId([customZikr.id]);
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
                source={require('../assets/ui-assets/tasbeeh.png')}
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
                  onPress={resetToDefault}
                  className="mt-4 bg-slate-200 dark:bg-slate-800 px-6 py-2 rounded-full"
                >
                  <Text className="text-slate-600 dark:text-slate-300 font-bold">Standard Tasbih</Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>

          {/* Modal for Custom Goal Selection */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
          >
            <View className="flex-1 justify-end bg-black/50">
              <View className="bg-white dark:bg-slate-900 rounded-t-[40px] p-8 pb-12 shadow-2xl">
                <View className="flex-row justify-between items-center mb-6">
                  <Text className="text-2xl font-black text-slate-900 dark:text-white">Custom Goal</Text>
                  <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                    <XMarkIcon size={28} color={isDarkMode ? "#94a3b8" : "#64748b"} />
                  </TouchableOpacity>
                </View>

                <Text className="text-slate-500 dark:text-slate-400 font-bold mb-3 uppercase tracking-wider text-xs">Set Target Count</Text>
                <TextInput
                  value={tempGoal}
                  onChangeText={setTempGoal}
                  keyboardType="numeric"
                  placeholder="Enter goal (e.g. 100)"
                  placeholderTextColor="#94a3b8"
                  className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl text-xl font-bold text-slate-900 dark:text-white border border-slate-100 dark:border-slate-800 mb-6"
                />

                <Text className="text-slate-500 dark:text-slate-400 font-bold mb-3 uppercase tracking-wider text-xs">Select Zikr</Text>
                
                <View className="mb-8">
                  <Select2
                    isSelectSingle
                    styles={{
                      container: {
                        borderRadius: 16,
                        backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc',
                        borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                        borderWidth: 2,
                      },
                      topBar: {
                        container: {
                          borderBottomWidth: 0,
                          paddingVertical: 12,
                        },
                        text: {
                          color: isDarkMode ? '#f8fafc' : '#0f172a',
                          fontWeight: 'bold',
                        },
                        placeholder: {
                          color: isDarkMode ? '#64748b' : '#94a3b8',
                        },
                      },
                      searchBar: {
                        container: {
                          backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                          borderBottomColor: isDarkMode ? '#334155' : '#e2e8f0',
                        },
                        input: {
                          color: isDarkMode ? '#f8fafc' : '#0f172a',
                        },
                      },
                      listItem: {
                        container: {
                          backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                          borderBottomColor: isDarkMode ? '#334155' : '#f1f5f9',
                        },
                        text: {
                          color: isDarkMode ? '#cbd5e1' : '#334155',
                          fontWeight: '500',
                        },
                        selectedContainer: {
                          backgroundColor: isDarkMode ? '#312e81' : '#e0e7ff',
                        },
                        selectedText: {
                          color: isDarkMode ? '#818cf8' : '#4338ca',
                          fontWeight: 'bold',
                        },
                      }
                    }}
                    popupTitle="Choose your Zikr"
                    title="Select Zikr"
                    data={{ type: 'list', data: COMMON_ZIKRS }}
                    onSelect={data => setTempZikrId(data)}
                    onRemoveItem={data => setTempZikrId(data)}
                    value={tempZikrId}
                    searchPlaceHolderText="Filter Zikrs..."
                  />
                </View>

                <TouchableOpacity
                  onPress={handleApplyCustom}
                  className="bg-indigo-600 w-full p-4 rounded-2xl flex-row items-center justify-center shadow-lg shadow-indigo-500/30"
                >
                  <CheckIcon size={24} color="white" />
                  <Text className="text-white font-black text-lg ml-2">Start Zikr</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

        </View>
      </SafeAreaView>
    </View>
  );
};

export default Tasbih;
