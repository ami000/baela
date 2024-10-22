import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function Dashboard() {
  return (
    <View>
      <Text>pibi Analyser</Text>
      <Link href="/(app)/dashboard">Go to Dashboard</Link>
    </View>
  );
}