import React from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
  Bars3BottomLeftIcon,
} from 'react-native-heroicons/solid';

import { useTheme } from '../context/ThemeContext';
import CategoryCard from './components/CategoryCard';
import LastReadCard from './components/LastReadCard';
import HomeHeader from './components/HomeHeader';

const { width } = Dimensions.get('window');

const Home = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();

  const categories = [
    { id: '1', title_ur: 'سورۃ', title_en: 'Surah', icon: require('../assets/ui-assets/quranSura.png') },
    { id: '2', title_ur: 'پارہ', title_en: 'Para', icon: require('../assets/ui-assets/quranSura.png') },
    { id: '3', title_ur: 'سورۃ یس', title_en: 'Surah Yasin', icon: require('../assets/ui-assets/quranSura.png') },
    { id: '4', title_ur: 'آیت الکرسی', title_en: 'Ait Al-kursi', icon: require('../assets/ui-assets/quranSura.png') },
  ];

  return (
    <View className="flex-1">
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      {/* Background Image */}
      <ImageBackground 
        source={require('../assets/ui-assets/background.png')}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <SafeAreaView className="flex-1">
          <View className="flex-1 px-6">
            
            {/* Top Navigation - Now Modular */}
            <HomeHeader onOpenDrawer={() => navigation.openDrawer()} />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
              
              {/* Hero Image Section - Reduced Margin */}
              <View className="items-center justify-center my-4">
                <Image 
                  source={require('../assets/ui-assets/Quran.png')}
                  style={{ width: width * 0.7, height: width * 0.5 }}
                  resizeMode="contain"
                />
              </View>

              {/* Last Read Card - Now Reusable */}
              <LastReadCard 
                title="Al-Fatihah"
                subtitle="Ayah No: 1"
                icon={require('../assets/ui-assets/quranSura.png')}
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
      </ImageBackground>
    </View>
  );
};

export default Home;
