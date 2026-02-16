import React from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import DailyAmalCard from './components/DailyAmalCard';
import HomeHeader from '../../common/components/HomeHeader';

const Home = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();

  // Auto-show modal removed as we now rely on GPS auto-start in LocationDisplay

  return (
    <View className="flex-1 bg-slate-50 dark:bg-slate-950">
      <StatusBar translucent backgroundColor="transparent" barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-6">
          
          {/* Top Navigation */}
          <HomeHeader 
            onOpenDrawer={() => navigation.openDrawer()} 
            iconColor={isDarkMode ? "white" : "#0f172a"}
          />

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
            
            {/* Today's A'mal Section */}
            <View className="mt-4">
              <DailyAmalCard />
            </View>

          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;
