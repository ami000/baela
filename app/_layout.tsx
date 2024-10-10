import store from '@/src/redux/store';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}