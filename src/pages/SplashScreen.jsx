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
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      {/* Background Image */}
      <Image 
        source={require('../assets/ui-assets/Splash.png')}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />

      {/* Overlay to ensure text readability if needed */}
      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.1)' }]} />

      <Animated.View 
        style={{ 
          opacity: fadeAnim, 
          transform: [{ scale: scaleAnim }],
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text 
          className="text-white text-6xl text-center px-4"
          style={{ 
            fontFamily: 'islamic_font',
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 10
          }}
        >
          مفاتیح الجنان
        </Text>
      </Animated.View>

      {/* Subtle version indicator */}
      <View className="absolute bottom-10 items-center w-full">
        <Text className="text-white/40 text-[10px] uppercase font-bold tracking-[3px]">
          Premium Edition
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default SplashScreen;
