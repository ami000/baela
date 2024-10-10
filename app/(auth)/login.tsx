
import { View, Text, TextInput, Button } from 'react-native';
import { useAuth } from '../../context/auth';
import LoginForm from '@/src/components/authpage';

export default function Login() {

  return (
    <LoginForm page='signIn'/>
  );
}