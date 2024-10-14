import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function ExamSetup() {
  return (
    <View>
      <Text>EXAM</Text>
      <Link href="/(app)/exam-setup">Go to Exam Setup</Link>
    </View>
  );
}