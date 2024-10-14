import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, useColorScheme } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { setFreedata, updateUserData } from '@/src/redux/Reducer/userReducer';
import { UserService } from '@/src/services/user.service';
import Welcome from '@/src/components/onboarding/welcome';
import Stepper1 from '@/src/components/onboarding/stepper1';
import Stepper2 from '@/src/components/onboarding/stepper2';
import Stepper3 from '@/src/components/onboarding/stepper3';
import { useTheme } from '@/src/constants/themeContext';
import BrandLogo from "@/src/assets/light/logo/logo.png";
import DarkBrandLogo from "@/src/assets/dark/logo/logo.png";

type RootStackParamList = {
    Analyser: undefined;
};

type OnBoardingPageProps = StackNavigationProp<RootStackParamList, 'Analyser'>;

const OnBoardingPage: React.FC = () => {
    const userService = new UserService();
    const navigation = useNavigation<OnBoardingPageProps>();
    const colorScheme = useColorScheme();
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const methods = useForm({
        mode: 'onChange',
    });

    const [step, setStep] = useState<number>(0);

    const onSubmit = (data: any) => {
        if (step < 3) {
            setStep((prev) => prev + 1);
        } else {
            dispatch(setFreedata({ loginSource: 'login' }));
            navigation.navigate('Analyser');
        }
    };

    const stepRenders = () => {
        console.log("step", step)
        switch (step) {
            case 0:
                return <Welcome onNext={() => setStep((pre) => pre + 1)} />;
            case 1:
                return <Stepper1 backClick={() => setStep((prev) => prev - 1)} />;
            case 2:
                return <Stepper2 backClick={() => setStep((prev) => prev - 1)} />;
            case 3:
                return <Stepper3 backClick={() => setStep((prev) => prev - 1)} />;
            default:
                return null;
        }
    };

    // const getUserDetails = async () => {
    //     try {
    //         const data = await userService.GetUser();
    //         if (data.data) dispatch(updateUserData(data.data));
    //     } catch (error) {
    //         console.error('Error fetching user details:', error);
    //     }
    // };

    // useEffect(() => {
    //     getUserDetails();
    // }, []);


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.backgroundColor,
            width: "100%",
            height: "100%",
            color: theme.textColor1
        },
        mainLogo: {
            margin: 20,
            width: 200,
            height: 50,
        },
        background: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0, 0, 0, 0.1)', // Adjust as needed
        },
        formContainer: {
            width: '100%',
            padding: 25,
        },
    });

    return (
        <View style={styles.container}>
            <Image
                style={styles.mainLogo}
                source={colorScheme === "dark" ? DarkBrandLogo : BrandLogo}
                resizeMode='contain'
            />
            <View style={styles.background} />
            <FormProvider {...methods}>
                <View style={styles.formContainer}>
                    {stepRenders()}
                </View>
            </FormProvider>
        </View>
    );
};


export default OnBoardingPage;