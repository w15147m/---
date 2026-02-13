import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
  HomeIcon, 
  UserIcon,
  BookOpenIcon,
  SparklesIcon
} from 'react-native-heroicons/outline';
import { 
  HomeIcon as HomeIconSolid,
  UserIcon as UserIconSolid,
  BookOpenIcon as BookOpenIconSolid,
  SparklesIcon as SparklesIconSolid
} from 'react-native-heroicons/solid';

// Custom Components & Pages
import CustomTabBar from './CustomTabBar';
import Home from '../../pages/Home';
import Profile from '../../pages/Profile/Profile';
import Explorer from '../../pages/Explorer';
import ArticleDetail from '../../pages/ArticleDetail';

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
        name="ArticleDetail" 
        component={ArticleDetail} 
        options={{ 
          title: 'Detail',
          tabBarItemStyle: { display: 'none' },
          tabBarStyle: { display: 'none' }
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
