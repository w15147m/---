import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { 
  SunIcon, 
  MoonIcon,
  ChevronRightIcon
} from 'react-native-heroicons/solid';
import { useTheme } from '../../../context/ThemeContext';
import usePrayerTimes from '../../../common/hooks/usePrayerTimes';
import HijriUtils from '../../../common/utils/hijri.utils';

const DailyAmalCard = ({ onPress, locationName, coordinates }) => {
  const { isDarkMode } = useTheme();
  const hijriDate = HijriUtils.getHijriDate();
  const { times, loading } = usePrayerTimes(coordinates);

  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      onPress={onPress}
      className="bg-indigo-600 dark:bg-indigo-900 rounded-3xl p-6 mb-8 shadow-xl overflow-hidden relative"
    >
      {/* Decorative background element */}
      <View className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
      
      <View className="flex-row justify-between items-start mb-6">
        <View className="flex-1 mr-2">
          <Text className="text-white/80 text-sm font-medium uppercase tracking-widest mb-1">
            Today's A'mal
          </Text>
          <Text className="text-white text-3xl font-black leading-tight">
            {hijriDate.day} {hijriDate.monthName || 'Month'}
          </Text>
          <Text className="text-white/70 text-base">
            {coordinates?.cityName || locationName || 'Current Location'}
          </Text>
        </View>
        <View className="bg-white/20 p-3 rounded-2xl">
           <Image 
            source={require('../../../assets/ui-assets/quranSura.png')}
            style={{ width: 32, height: 32, tintColor: 'white' }}
           />
        </View>
      </View>

      <View className="flex-row items-center justify-between bg-white/10 rounded-2xl p-4">
        {/* Sahur Section */}
        <View className="items-center flex-1">
          <View className="flex-row items-center mb-1">
            <SunIcon size={16} color="white" />
            <Text className="text-white/80 text-xs ml-1 font-bold">SAHUR</Text>
          </View>
          <Text className="text-white text-xl font-bold">
            {loading ? '--:--' : times?.sahurStr}
          </Text>
        </View>

        {/* Divider */}
        <View className="w-[1px] h-8 bg-white/20" />

        {/* Iftar Section */}
        <View className="items-center flex-1">
          <View className="flex-row items-center mb-1">
            <MoonIcon size={16} color="white" />
            <Text className="text-white/80 text-xs ml-1 font-bold">IFTAR</Text>
          </View>
          <Text className="text-white text-xl font-bold">
            {loading ? '--:--' : times?.iftarStr}
          </Text>
        </View>
      </View>

      <View className="mt-4 flex-row items-center justify-end">
        <Text className="text-white/90 text-sm mr-1">View Daily Duas</Text>
        <ChevronRightIcon size={16} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default DailyAmalCard;
