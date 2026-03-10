import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import DashboardScreen from '../screens/DashboardScreen';
import SplashScreen from '../screens/SplashScreen';
import DriverTabs from './BottomTabs';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { userToken, loading } = useContext(AuthContext);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken ? (
        // <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Main" component={DriverTabs} options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />

          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
