// app/(app)/(no-drawer)/_layout.tsx
import { Stack } from 'expo-router';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useTheme } from '@/src/constants/themeContext';

export default function NoDrawerLayout() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();


  const styles = StyleSheet.create({
    headerContainer: {
      backgroundColor: theme.backgroundColor3,
    },
    headerContent: {
      height: 44,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    backButton: {
      position: 'absolute',
      left: 16,
      height: 44,
      justifyContent: 'center',
      zIndex: 1,
    },
    headerTitle: {
      color: theme.textColor1,
      fontSize: 18,
      fontWeight: '500',
    },
  });

  return (
    <Stack
      screenOptions={{
        headerStyle: StyleSheet.create({
          background: {
            backgroundColor: theme.backgroundColor3,
          }
        }).background,
        headerTintColor: theme.textColor1,
        headerShadowVisible: false,
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '500',
        },
        headerTitleAlign: 'center',
        // Custom header component
        header: ({ navigation, route, options }) => (
          <View style={styles.headerContainer}>
            <View style={[
              styles.headerContent,
              { paddingTop: insets.top }
            ]}>
              {navigation.canGoBack() && (
                <TouchableOpacity
                  onPress={() => router.back()}
                  style={styles.backButton}
                >
                  <Ionicons name="chevron-back" size={24} color={theme.textColor1} />
                </TouchableOpacity>
              )}
              <Text style={styles.headerTitle}>
                {(options.headerTitle || route.name) as string}
              </Text>
            </View>
          </View>
        ),
      }}
    >
      <Stack.Screen
        name="exam-setup"
        options={{
          headerTitle: 'Exam Setup',
          headerShown: true,
        }}
      />
    </Stack>
  );
}
