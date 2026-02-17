import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronRightIcon } from 'react-native-heroicons/solid';
import HijriUtils from '../../../common/utils/hijri.utils';
import { WEEKDAY_AMAL, HIJRI_EVENTS, MONTHLY_AMAL } from '../../../common/services/amal.data';
import { useTheme } from '../../../context/ThemeContext';

const AmalList = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  
  const todayAmal = useMemo(() => {
    const now = new Date();
    const weekday = now.getDay();
    const hijri = HijriUtils.getHijriDate(now);
    
    let list = [...(WEEKDAY_AMAL[weekday] || [])];
    
    // Add specific Hijri date events
    const eventKey = `${hijri.day}/${hijri.month}`;
    if (HIJRI_EVENTS[eventKey]) {
      list = [...HIJRI_EVENTS[eventKey], ...list];
    }
    
    // Add monthly defaults (e.g., Ramadan)
    if (MONTHLY_AMAL[hijri.month]) {
      list = [...MONTHLY_AMAL[hijri.month], ...list];
    }
    
    return list;
  }, []);

  const renderAmalItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate('ArticleDetail', { 
        articleName: item.article_name,
        title: item.title_ur 
      })}
      className="bg-white dark:bg-slate-900 rounded-2xl p-4 mb-3 flex-row items-center shadow-sm border border-slate-100 dark:border-slate-800"
    >
      <View className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-xl mr-4">
        <Image 
          source={require('../../../assets/ui-assets/quranSura.png')}
          style={{ width: 24, height: 24, tintColor: isDarkMode ? '#818cf8' : '#4f46e5' }}
        />
      </View>
      
      <View className="flex-1">
        <Text className="text-slate-800 dark:text-white text-lg font-bold text-right" style={{ fontFamily: 'Jameel Noori Nastaleeq' }}>
          {item.title_ur}
        </Text>
        <Text className="text-slate-500 dark:text-slate-400 text-xs">
          {item.title_en}
        </Text>
      </View>
      
      <ChevronRightIcon size={20} color={isDarkMode ? "#475569" : "#cbd5e1"} className="ml-2" />
    </TouchableOpacity>
  );

  if (!todayAmal || todayAmal.length === 0) return null;

  return (
    <View className="mt-2 mb-8">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-slate-800 dark:text-white text-xl font-bold">Today's Recommended</Text>
        <TouchableOpacity>
          <Text className="text-indigo-600 dark:text-indigo-400 font-medium">View All</Text>
        </TouchableOpacity>
      </View>

      {todayAmal.map((item) => (
         <React.Fragment key={item.id}>
           {renderAmalItem({ item })}
         </React.Fragment>
      ))}
    </View>
  );
};

export default AmalList;
