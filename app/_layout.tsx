
import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { Stack } from 'expo-router';
import { Provider, useSelector } from 'react-redux';
import store from '@/src/redux/store';
import { settings } from '@/src/redux/Reducer/settingsReducer';
import { RootState } from '@/src/redux/Reducer';
import { ThemeProvider } from '@/src/constants/themeContext';
import Constants from 'expo-constants';

function RootLayoutNav() {
  const isAuthenticated = useSelector((state: RootState) => state.userDetails.isAuthenticated);
  const colorScheme = useColorScheme();

  React.useEffect(() => {
    store.dispatch(settings({ darkMode: colorScheme === "dark" }));
  }, [colorScheme]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="(auth)" />
      ) : (
        <Stack.Screen name="(app)" />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1a1a1a' : '#f0f0f0',
    },
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff',
    },
    content: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar
            barStyle={isDarkMode ? "light-content" : "dark-content"}
            backgroundColor={isDarkMode ? "#1a1a1a" : "#fff"}
          />
          <View style={styles.container}>
            <View style={styles.content}>
              <RootLayoutNav />
            </View>
          </View>
        </SafeAreaView>
      </ThemeProvider>
    </Provider>
  );
}