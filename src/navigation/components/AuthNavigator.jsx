import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Auth Screens
import Login from '../../pages/Auth/Login/Login';
import Register from '../../pages/Auth/Register/Register';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
