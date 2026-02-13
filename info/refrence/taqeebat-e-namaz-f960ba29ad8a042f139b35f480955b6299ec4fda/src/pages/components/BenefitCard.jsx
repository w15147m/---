import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import IslamicIcons from '../../assets/Islamic-Icons-SVG';
import CardBackgrounds from '../../assets/fonts/card-bg';


const BenefitCard = ({ title, iconName, bgVariant, onPress, isDarkMode }) => {
  const iconSource = IslamicIcons[iconName];
  
  const bgSource = useMemo(() => {
    if (bgVariant && CardBackgrounds[bgVariant]) {
      return CardBackgrounds[bgVariant];
    }
    const variants = Object.keys(CardBackgrounds);
    const randomVariant = variants[Math.floor(Math.random() * variants.length)];
    return CardBackgrounds[randomVariant];
  }, [bgVariant]);

  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.9}
      className="bg-[#F1FAF5] dark:bg-emerald-900/30 rounded-[32px] overflow-hidden border border-emerald-50/50 dark:border-emerald-800/40 mb-4"
      style={{
        width: '48%',
        aspectRatio: 1,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      }}
    >
      {/* Background Asset - Mask Group */}
      <Image 
        source={bgSource}
        className="absolute inset-0"
        style={{
          width: '100%',
          height: '100%',
          opacity: isDarkMode ? 0.4 : 1,
          tintColor: isDarkMode ? '#065f46' : undefined,
        }}
        resizeMode="cover"
      />
      
      <View className="flex-1 p-5 justify-between">
        <View>
          <Text 
            className="text-[#064e3b] dark:text-emerald-300 font-bold text-xl"
            style={{ fontFamily: 'System' }}
          >
            {title}
          </Text>
        </View>
        
        <View className="flex-1 items-center justify-center -mb-2">
          {iconSource && (
            <Image 
              source={iconSource}
              className="w-24 h-24"
              style={isDarkMode ? { tintColor: '#34d399' } : {}} // Tint icons emerald-400 in dark mode
              resizeMode="contain"
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BenefitCard;
