import { Redirect } from 'expo-router';
import store from '@/src/redux/store';
import { useColorScheme } from 'react-native'
import { useEffect } from 'react';
import { settings } from '@/src/redux/Reducer/settingsReducer';

export default function Index() {
  const storeData = store.getState();
  const theme = useColorScheme()

  useEffect(() => {
    store.dispatch(settings({ darkMode: theme === "dark" }))
  }, [theme])

  if (storeData.userDetails?.isAuthenticated) {
    return <Redirect href="/dashboard" />;
  }
  return <Redirect href="/login" />;
}