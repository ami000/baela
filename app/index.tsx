import { Redirect } from 'expo-router';
import { useAuth } from '../context/auth';

export default function Index() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="/(app)/dashboard" />;
  }
  return <Redirect href="/(auth)/login" />;
}