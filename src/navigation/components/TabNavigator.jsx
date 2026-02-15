import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
  HomeIcon, 
  UserIcon,
  BookOpenIcon,
  SparklesIcon,
  Cog6ToothIcon
} from 'react-native-heroicons/outline';
import { 
  HomeIcon as HomeIconSolid,
  UserIcon as UserIconSolid,
  BookOpenIcon as BookOpenIconSolid,
  SparklesIcon as SparklesIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid
} from 'react-native-heroicons/solid';

// Custom Components & Pages
import CustomTabBar from './CustomTabBar';
import Home from '../../pages/Home';
import Profile from '../../pages/Profile/Profile';
import Explorer from '../../pages/Explorer';
import ArticleDetail from '../../pages/ArticleDetail';
import Settings from '../../pages/Settings';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="MainHome" 
        component={Home} 
        options={{ 
          title: 'Home',
          tabBarIcon: (props) => <HomeIcon {...props} />,
          tabBarIconActive: (props) => <HomeIconSolid {...props} />
        }} 
      />

      <Tab.Screen 
        name="TaqeebatTab" 
        component={Explorer} 
        initialParams={{ initialChapterName: 'تعقیباتِ نماز (Taqeebat-e-Namaz)' }}
        options={{ 
          title: 'Taqeebat',
          tabBarIcon: (props) => <SparklesIcon {...props} />,
          tabBarIconActive: (props) => <SparklesIconSolid {...props} />
        }} 
      />

      <Tab.Screen 
        name="Library" 
        component={Explorer} 
        options={{ 
          title: 'Library',
          tabBarIcon: (props) => <BookOpenIcon {...props} />,
          tabBarIconActive: (props) => <BookOpenIconSolid {...props} />
        }} 
      />

      <Tab.Screen 
        name="SettingsTab" 
        component={Settings} 
        options={{ 
          title: 'Settings',
          tabBarIcon: (props) => <Cog6ToothIcon {...props} />,
          tabBarIconActive: (props) => <Cog6ToothIconSolid {...props} />
        }} 
      />

      <Tab.Screen 
        name="ProfileTab" 
        component={Profile} 
        options={{ 
          title: 'Profile',
          tabBarIcon: (props) => <UserIcon {...props} />, 
          tabBarIconActive: (props) => <UserIconSolid {...props} />,
          tabBarItemStyle: { display: 'none' }
        }} 
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
