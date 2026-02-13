import React from 'react';
import { 
  View,
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView,
  Image
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon, ShareIcon } from 'react-native-heroicons/outline';
import { useTheme } from '../context/ThemeContext';

const PrayerDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const { item } = route.params || {};
  if (!item) return null;

  // No splitting, use full text as requested
  const prayerText = item.text || '';
  const lineHeight = 64; // Solid line height for alignment

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#09090b]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-slate-50 dark:border-slate-100/10">
        <View className="flex-row items-center flex-1">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="p-2 rounded-full mr-2"
          >
            <ChevronLeftIcon size={24} color={isDarkMode ? '#F8FAFC' : '#1e293b'} />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {item.englishName}
          </Text>
        </View>
        <Text 
          style={{ fontFamily: 'Mehr-Nastaliq', fontSize: 24 }}
          className="text-emerald-700 dark:text-emerald-400"
        >
          {item.arabicName}
        </Text>
      </View>

      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 24, paddingHorizontal: 16 }}
      >

        {/* Text Area with Card and Ruled Background */}
        <View className="bg-transparent rounded-[32px] shadow-sm overflow-hidden min-h-[500px]">
          {/* Main Background Image */}
          <Image
            source={require('../assets/images/main-bg.png')}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
            resizeMode="cover"
          />
          {/* Background Ruled Lines - Darker and more distinct layer */}
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
            {[...Array(60)].map((_, i) => (
              <View 
                key={i} 
                style={{ 
                  height: lineHeight, 
                  borderBottomWidth: 1, 
                  // Use a distinct but subtle gray/slate for the lines
                  borderBottomColor: isDarkMode ? '#292524' : '#e2e8f0', 
                  width: '100%'
                }} 
              />
            ))}
          </View>

          {prayerText ? (
            <Text 
              style={{ 
                // Using the exact PostScript name for foolproof Android loading
                fontFamily: 'KFGQPCUthmanTahaNaskh-Bold', 
                fontSize: 24, 
                lineHeight: lineHeight, 
                textAlign: 'center',
                paddingHorizontal: 6,
                paddingTop: 8, 
                paddingBottom: 40
              }}
              className="text-slate-900 dark:text-slate-100"
            >
              {prayerText}
            </Text>
          ) : (
            <Text className="text-center text-slate-400 dark:text-slate-500 font-bold italic py-20">
              Text not available for this prayer.
            </Text>
          )}
        </View>

        {/* Bottom spacing */}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrayerDetail;
