import React, { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { Text, useColorScheme } from 'react-native';
import { settings } from '@/src/redux/Reducer/settingsReducer';
import store from '@/src/redux/store';

export default function Index() {
  const { userDetails: { isAuthenticated, loginSource } } = store.getState();
  const colorScheme = useColorScheme();

  useEffect(() => {
    store.dispatch(settings({ darkMode: colorScheme === "dark" }));
  }, [colorScheme]);

  if (isAuthenticated) return <Redirect href="/(app)/dashboard" />;
  if (loginSource === "signup") return <Redirect href="/(onboarding)" />;
  return <Redirect href="/(auth)/signin" />;

  // return <Redirect href="/(onboarding)" />;
}