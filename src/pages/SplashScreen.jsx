import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  Animated, 
  StatusBar, 
  Image, 
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      <Animated.View 
        style={{ 
          opacity: fadeAnim, 
          transform: [{ translateY: slideAnim }],
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20
        }}
      >
        {/* Header Section */}
        <View className="items-center mb-12">
          <Text className="text-white text-4xl font-black mb-2">
            Halakat
          </Text>
          <Text className="text-slate-200 text-base text-center font-medium leading-5 px-10">
            Memorize and recite{"\n"}Quran easily
          </Text>
        </View>

        {/* Main Illustration Container */}
        <View className="w-full aspect-square max-w-[340px] items-center justify-center">
          <View className="w-full h-full rounded-[40px] overflow-hidden shadow-2xl shadow-black/40 elevation-10">
            <Image 
              source={require('../assets/images/quran_splash.png')}
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
            />
          </View>
        </View>
      </Animated.View>

      {/* Subtle version indicator */}
      <View className="absolute bottom-8 items-center w-full">
        <Text className="text-white/20 text-[10px] uppercase font-bold tracking-[2px]">
          v 1.2.0
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#064e2b', // Dark green background
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default SplashScreen;
