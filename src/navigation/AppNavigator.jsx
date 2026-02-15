import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

// Navigators
import MainDrawerNavigator from './components/MainDrawerNavigator';
import AuthNavigator from './components/AuthNavigator';

// Special Screens
import SplashScreen from '../pages/SplashScreen/SplashScreen';
import ArticleDetail from '../pages/ArticleDetail/ArticleDetail';
import TestSync from '../pages/TestSync/TestSync';
import Settings from '../pages/Settings/Settings';

import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user, loading } = useContext(AuthContext);
  const { isDarkMode } = useTheme();
  const [showSplash, setShowSplash] = React.useState(true);

  // 1. Splash Screen Logic
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  // 2. Auth Loading State
  if (loading) {
    return (
      <View className={`flex-1 ${isDarkMode ? 'bg-slate-950' : 'bg-[#F8FAFC]'} justify-center items-center`}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  // 3. Main Navigation Root
  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Main App is always available (Home, Explorer etc) */}
        <Stack.Screen name="Main" component={MainDrawerNavigator} />
        
        {/* Detail Screens (Global Stack) */}
        <Stack.Screen name="ArticleDetail" component={ArticleDetail} />
        <Stack.Screen name="TestSync" component={TestSync} />
        
        {/* Auth is only available if not logged in */}
        {!user && (
          <Stack.Screen 
            name="Auth" 
            component={AuthNavigator} 
            options={{
              presentation: 'modal',
              animationTypeForReplace: 'pop',
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
