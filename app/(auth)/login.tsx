
import { View, Text, TextInput, Button } from 'react-native';
import { useAuth } from '../../context/auth';

export default function Login() {
  const { signIn } = useAuth();

  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder="Email" />
      <TextInput placeholder="Password" secureTextEntry />
      <Button title="Sign In" onPress={() => signIn()} />
    </View>
  );
}