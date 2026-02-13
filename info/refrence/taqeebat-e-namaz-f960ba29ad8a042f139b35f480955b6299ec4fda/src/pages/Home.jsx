import React from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
  Bars3Icon,
  SparklesIcon,
  BookOpenIcon,
  SpeakerWaveIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  ArrowRightIcon
} from 'react-native-heroicons/outline';

const { width } = Dimensions.get('window');

import { useTheme } from '../context/ThemeContext';

import FeatureCard from './components/FeatureCard';
import BenefitCard from './components/BenefitCard';

const Home = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();


  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 pt-4 mb-6">
          <View>
            <Text className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-[2px] mb-1">
                            تَعْقِيبَاتِ نَمَاز

            </Text>
           
          </View>
          <TouchableOpacity 
            className="p-2 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-50 dark:border-slate-800"
            onPress={() => navigation.openDrawer()}
          >
            <Bars3Icon size={24} color={isDarkMode ? "#f8fafc" : "#1e293b"} />
          </TouchableOpacity>
        </View>

        {/* Hero Card - Join a Circle */}
        <View className="mx-6 mb-8">
          <View 
            className="bg-[#064e3b] dark:bg-[#064e2b] rounded-[32px] p-6 overflow-hidden relative shadow-2xl shadow-emerald-900/20 dark:shadow-none min-h-[160px] justify-center"
            style={{
              shadowColor: "#064e3b",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.15,
              shadowRadius: 20,
              elevation: 5,
            }}
          >
            {/* Background elements */}
            <View className="absolute -right-10 -top-10 w-48 h-48 bg-emerald-400/10 rounded-full" />
            <View className="absolute right-0 bottom-0 opacity-20">
              <SparklesIcon size={120} color="#34d399" />
            </View>

            <View className="z-10 items-start">
              <Text 
                style={{ 
                  fontFamily: 'Amiri-Bold', 
                  fontSize: 42, 
                  lineHeight: 64, 
                  paddingTop: 10,
                  includeFontPadding: false 
                }}
                className="text-white mb-2 tracking-tighter"
              > 
                تَعْقِيبَاتِ نَمَاز
              </Text>
              
              <Text className="text-emerald-100/80 text-sm font-medium mb-5">
                تعقیباتِ نماز و اعمالِ شبہائے قدر
              </Text>
              
              <TouchableOpacity 
                activeOpacity={0.9}
                className="bg-white/90 dark:bg-emerald-500/20 px-4 py-2.5 rounded-2xl flex-row items-center space-x-2"
              >
             
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Grid Content */}
        <View className="px-6 flex-row flex-wrap justify-between">
          <BenefitCard 
            title="تعقيبات"
            iconName="salah.png"
            isDarkMode={isDarkMode}
            onPress={() => navigation.navigate('Taqeebat')}
          />
          <BenefitCard 
            title="اعمالِ شبہائے قدر"
            iconName="dua.png"
            isDarkMode={isDarkMode}
            onPress={() => console.log('Amaal-e-Shab-e-Qadr pressed')} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
