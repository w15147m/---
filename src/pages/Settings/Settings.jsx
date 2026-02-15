import React from 'react';
import { View, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useFont } from '../../context/FontContext';
import { useNavigation } from '@react-navigation/native';
import HomeHeader from '../../common/components/HomeHeader';

// Components
import ThemeSelector from './components/ThemeSelector';
import FontSettingsGroup from './components/FontSettingsGroup';

const Settings = () => {
  const { themeMode, setThemeMode, isDarkMode } = useTheme();
  const fontContext = useFont();
  const navigation = useNavigation();

  // Pick only the size values from context to pass to composite component
  const fontSizes = {
    arabicSize: fontContext.arabicSize,
    translationSize: fontContext.translationSize,
    headerSize: fontContext.headerSize,
    listTitleSize: fontContext.listTitleSize,
  };

  return (
    <View className="flex-1 bg-slate-50 dark:bg-slate-950">
      <StatusBar 
        translucent 
        backgroundColor="transparent" 
        barStyle={isDarkMode ? "light-content" : "dark-content"} 
      />
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-6">
          
          {/* Top Navigation - Reusing HomeHeader with Title */}
          <HomeHeader 
            title="Settings"
            onOpenDrawer={() => navigation.openDrawer()} 
            iconColor={isDarkMode ? "white" : "#0f172a"}
          />

          <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            {/* Theme Selection */}
            <ThemeSelector 
              themeMode={themeMode} 
              setThemeMode={setThemeMode} 
            />

            {/* Font Size Settings */}
            <FontSettingsGroup 
              fontSizes={fontSizes} 
              setFontSize={fontContext.setFontSize} 
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Settings;
