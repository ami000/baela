import React, { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useColorScheme } from 'react-native';
import { settings } from '@/src/redux/Reducer/settingsReducer';
import store from '@/src/redux/store';

export default function Index() {
  const { userDetails: { isAuthenticated } } = store.getState();
  const colorScheme = useColorScheme();

  useEffect(() => {
    store.dispatch(settings({ darkMode: colorScheme === "dark" }));
  }, [colorScheme]);

  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated)
  }, [isAuthenticated])


  if (isAuthenticated) {
    return <Redirect href="/(app)/dashboard" />;
  }
  return <Redirect href="/(auth)/signin" />;
  // return <Redirect href="/(onboarding)" />;
}