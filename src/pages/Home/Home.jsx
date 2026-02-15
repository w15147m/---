import React from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
  Bars3BottomLeftIcon,
} from 'react-native-heroicons/solid';

import { useTheme } from '../../context/ThemeContext';
import CategoryCard from './components/CategoryCard';
import DailyAmalCard from './components/DailyAmalCard';
import HomeHeader from '../../common/components/HomeHeader';
import LastReadCard from './components/LastReadCard';

const { width } = Dimensions.get('window');

const Home = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();

  const categories = [
    { id: '1', title_ur: 'سورۃ', title_en: 'Surah', icon: require('../../assets/ui-assets/quranSura.png') },
    { id: '2', title_ur: 'پارہ', title_en: 'Para', icon: require('../../assets/ui-assets/quranSura.png') },
    { id: '3', title_ur: 'سورۃ یس', title_en: 'Surah Yasin', icon: require('../../assets/ui-assets/quranSura.png') },
    { id: '4', title_ur: 'آیت الکرسی', title_en: 'Ait Al-kursi', icon: require('../../assets/ui-assets/quranSura.png') },
  ];

  return (
    <View className="flex-1 bg-slate-50 dark:bg-slate-950">
      <StatusBar translucent backgroundColor="transparent" barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-6">
          
          {/* Top Navigation - Now Modular */}
          <HomeHeader 
            onOpenDrawer={() => navigation.openDrawer()} 
            iconColor={isDarkMode ? "white" : "#0f172a"}
          />

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
            
            {/* Today's A'mal Section (Dynamic) */}
            <View className="mt-4">
              <DailyAmalCard 
                onPress={() => console.log('Daily Amals Pressed')}
              />
            </View>

            {/* Last Read Card - Keep below or remove as per preference, but adding for value */}
            <LastReadCard 
              title="Al-Fatihah"
              subtitle="Ayah No: 1"
              icon={require('../../assets/ui-assets/quranSura.png')}
              onPressBookmark={() => console.log('Bookmark pressed')}
            />

          

              {/* Categories Grid - Now Reusable */}
              <View className="flex-row flex-wrap justify-between">
                {categories.map((item) => (
                  <CategoryCard 
                    key={item.id} 
                    item={item} 
                    onPress={() => console.log(`${item.title_en} pressed`)} 
                  />
                ))}
              </View>

            </ScrollView>
          </View>
        </SafeAreaView>
    </View>
  );
};

export default Home;
