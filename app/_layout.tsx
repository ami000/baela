
import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, useColorScheme, View, Text } from 'react-native';
import { Stack } from 'expo-router';
import { Provider, useSelector } from 'react-redux';
import store from '@/src/redux/store';
import { settings } from '@/src/redux/Reducer/settingsReducer';
import { RootState } from '@/src/redux/Reducer';
import { ThemeProvider } from '@/src/constants/themeContext';
import Constants from 'expo-constants';
import { customFonts } from '@/src/constants/cutsomFonts';
import { useFonts as useRoboto, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { useFonts as useOxygen, Oxygen_400Regular } from '@expo-google-fonts/oxygen';
import { useFonts as useUbuntu, Ubuntu_400Regular } from '@expo-google-fonts/ubuntu';
import { DroidSans_Regular400 } from '@expo-google-fonts/droid-sans';
import { Loader } from '@/src/components/loader';

function RootLayoutNav() {
  const isAuthenticated = useSelector((state: RootState) => state.userDetails.isAuthenticated);
  const colorScheme = useColorScheme();
  useRoboto({ Roboto: Roboto_400Regular });
  useOxygen({ Oxygen: Oxygen_400Regular });
  useUbuntu({ Ubuntu: Ubuntu_400Regular });
  useUbuntu({ "Droid Sans": DroidSans_Regular400 });

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
      backgroundColor: isDarkMode ? '#121212' : '#ffffff',
    },
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#ffffff',
      // ...customFonts
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
            backgroundColor={isDarkMode ? "#121212" : "#fff"}
          />
          <View style={styles.container}>
            <View style={styles.content}>
              <RootLayoutNav />
              {/* <Loader open={true} /> */}
            </View>
          </View>
        </SafeAreaView>
      </ThemeProvider>
    </Provider>
  );
}