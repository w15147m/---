import React from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  StatusBar,
  TextInput
} from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { useTheme } from '../../context/ThemeContext';
import CategoryCard from '../Home/components/CategoryCard';
import LastReadCard from '../Home/components/LastReadCard';
import HomeHeader from '../../common/components/HomeHeader'; 
// Reusing HomeHeader or we can create a simple Header for Explore

const Explore = () => {
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
        <View className="flex-1 px-6 pt-4">
          
          <Text className="text-3xl font-bold text-slate-800 dark:text-white mb-6">
            Explore
          </Text>

          {/* Search Bar */}
          <View className="flex-row items-center bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 mb-6">
            <MagnifyingGlassIcon size={20} color={isDarkMode ? "#94a3b8" : "#64748b"} />
            <TextInput 
              placeholder="Search Duas, Surahs..." 
              placeholderTextColor={isDarkMode ? "#64748b" : "#94a3b8"}
              className="flex-1 ml-3 text-base text-slate-800 dark:text-white"
            />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
            
            {/* Last Read Section */}
            <LastReadCard 
              title="Al-Fatihah"
              subtitle="Ayah No: 1"
              icon={require('../../assets/ui-assets/quranSura.png')}
              onPressBookmark={() => console.log('Bookmark pressed')}
            />

            {/* Categories Grid */}
            <Text className="text-slate-800 dark:text-white text-lg font-bold mb-4 mt-6">
              Browse Categories
            </Text>
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

export default Explore;
