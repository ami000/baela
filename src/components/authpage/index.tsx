import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useForm, FormProvider } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { setAuthToken, updateUserData } from '@/src/redux/Reducer/userReducer';
import SigninForm from './signinForm';
import LightStatic1 from "@/src/assets/light/static/static_1.png";
import LightStatic2 from "@/src/assets/light/static/static_2.png";
import DarkStatic1 from "@/src/assets/dark/static/static_1.png";
import DarkStatic2 from "@/src/assets/dark/static/static_2.png";
import Static3 from "@/src/assets/light/static/static_3.png";
import BrandLogo from "@/src/assets/light/logo/logo.png";
import DarkBrandLogo from "@/src/assets/dark/logo/logo.png";
import { useTheme } from '@/src/constants/themeContext';
import SignupForm from './signupForm';
import ForgotPassword from './forgotPassword';
import { router } from 'expo-router';
import { UserService } from '@/src/services/user.service';

interface LoginFormProps {
    page: 'signIn' | 'signUp' | 'forgotPassword';
}

const LoginForm: React.FC<LoginFormProps> = ({ page }) => {
    const { theme } = useTheme()
    const styles = StyleSheet.create({
        container: {
            flexGrow: 1,
            width: "100%",
            height: "100%",
            position: "relative",
            backgroundColor: theme.backgroundColor, // You'll need to implement a theming system
        },
        mainLogo: {
            margin: 20,
            width: 200,
            height: 50,
        },
        formContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
        },
        imageContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'baseline',
            marginBottom: 20,
            gap: 20,
            height: "auto"
        },
        image: {
            minWidth: 100,
            minHeight: 100,
            // marginHorizontal: 10,
        },
        bottomRightImage: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 150,
            height: 150,
        },
    });
    const navigation = useNavigation();
    const userService = new UserService()
    const route = useRoute();
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state: any) => state?.settings?.darkMode);
    const [loading, setLoading] = useState(false);
    const methods = useForm();

    const handleLogin = async (data: any, fromSignup: boolean = false) => {
        setLoading(true);
        const options = {
            method: 'POST',
            url: `https://${process.env.EXPO_PUBLIC_AUTH0_DOMAIN}/oauth/token`,
            headers: { 'content-type': 'application/json' },
            data: {
                grant_type: 'password',
                username: data?.email,
                password: data?.password,
                audience: process.env.EXPO_PUBLIC_AUTH0_AUDIENCE,
                scope: 'openid profile email',
                client_id: process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID,
            },
        };

        try {
            const response = await axios(options);
            console.log(response)
            Toast.show({
                type: 'success',
                text1: 'Successfully logged in',
            });
            dispatch(
                setAuthToken({
                    token: response?.data?.id_token,
                    source: fromSignup ? 'signup' : 'login',
                })
            );
            await getUserDetails()
            if (fromSignup) {
                router.replace("/(onboarding)")
            } else {
                router.replace("/(app)/dashboard")
            }
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: error?.response?.data?.error_description || error?.message || 'Signin failed',
            });
            console.error('Error logging in', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (data: any) => {
        setLoading(true);
        const options = {
            method: 'POST',
            url: `https://${process.env.EXPO_PUBLIC_AUTH0_DOMAIN}/dbconnections/signup`,
            headers: { 'content-type': 'application/json' },
            data: {
                client_id: process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID,
                email: data?.email,
                password: data?.password,
                connection: 'staging-pocketbud',
                user_metadata: {
                    userName: data?.name,
                    nickname: data?.email?.split('@')[0],
                },
            },
        };

        try {
            await axios(options);
            await handleLogin(data, true);
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: error?.response?.data?.error_description || error?.response?.data?.message || 'Signup failed',
            });
            console.error('Error', error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        // Implement Google login for React Native
        // This will likely involve using a library like `react-native-app-auth`
        console.log('Google login not implemented');
    };

    const handleForgotPassword = async (data: any) => {
        setLoading(true);
        await new Promise(res => setTimeout(res, 1000));
        Toast.show({
            type: 'success',
            text1: 'Reset mail sent successfully',
        });
        setLoading(false);
        navigation.navigate('SignIn' as never);
    };

    const onSubmit = (data: any) => {
        if (route.name === 'signup') {
            handleSignup(data);
        } else if (route.name === 'signin') {
            handleLogin(data);
        } else if (route.name === 'forgotPassword') {
            handleForgotPassword(data);
        }
    };

    const PageDecider = () => {
        switch (page) {
            case 'signIn':
                return <SigninForm handleGoogleLogin={handleGoogleLogin} onSubmit={methods.handleSubmit(onSubmit)} loading={loading} />;
            case 'signUp':
                return <SignupForm handleGoogleLogin={handleGoogleLogin} onSubmit={methods.handleSubmit(onSubmit)} loading={loading} />;
            case 'forgotPassword':
                return <ForgotPassword onSubmit={methods.handleSubmit(onSubmit)} loading={loading} />;
            default:
                return null;
        }
    };


    const getUserDetails = async () => {
        try {
            const data = await userService.GetUser();
            console.log("data", data.data)
            if (!!data.data) dispatch(updateUserData(data.data));
        } catch (error) {
            console.log("error", error)
        }
    };


    useEffect(() => {
        methods.reset();
    }, [route.name]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <FormProvider {...methods}>
                <Image
                    style={styles.mainLogo}
                    source={isDarkMode ? DarkBrandLogo : BrandLogo}
                    resizeMode='contain'
                />
                <Image source={Static3} style={styles.bottomRightImage} resizeMode="contain" />
                <View style={styles.imageContainer}>
                    <Image
                        source={isDarkMode ? DarkStatic1 : LightStatic1}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Image
                        source={isDarkMode ? DarkStatic2 : LightStatic2}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.formContainer}>
                    <PageDecider />
                </View>
            </FormProvider>
        </ScrollView>
    );
};


export default LoginForm;