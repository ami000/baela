import React, { useState } from 'react';
import { View, StyleSheet, Image, useColorScheme, ImageBackground } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { setFreedata } from '@/src/redux/Reducer/userReducer';
import Welcome from '@/src/components/onboarding/welcome';
import Stepper1 from '@/src/components/onboarding/stepper1';
import Stepper2 from '@/src/components/onboarding/stepper2';
import Stepper3 from '@/src/components/onboarding/stepper3';
import { useTheme } from '@/src/constants/themeContext';
import BrandLogo from "@/src/assets/light/logo/logo.png";
import DarkBrandLogo from "@/src/assets/dark/logo/logo.png";
import DarkBG from "@/src/assets/dark/OnboardingBG.png";
import LightBG from "@/src/assets/light/OnboardingBG.png";


type RootStackParamList = {
    Analyser: undefined;
};

type OnBoardingPageProps = StackNavigationProp<RootStackParamList, 'Analyser'>;

const OnBoardingPage: React.FC = () => {
    const navigation = useNavigation<OnBoardingPageProps>();
    const colorScheme = useColorScheme();
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const methods = useForm({
        mode: 'onChange',
    });

    const [step, setStep] = useState<number>(0);

    const onSubmit = () => {
        if (step < 3) {
            setStep((prev) => prev + 1);
        } else {
            dispatch(setFreedata({ loginSource: 'login' }));
            navigation.navigate('Analyser');
        }
    };

    const stepRenders = () => {
        switch (step) {
            case 0:
                return <Welcome onNext={onSubmit} />;
            case 1:
                return <Stepper1 backClick={() => setStep((prev) => prev - 1)} submitClick={onSubmit} />;
            case 2:
                return <Stepper2 backClick={() => setStep((prev) => prev - 1)} submitClick={onSubmit} />;
            case 3:
                return <Stepper3 backClick={() => setStep((prev) => prev - 1)} submitClick={onSubmit} />;
            default:
                return null;
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.backgroundColor3,
            width: "100%",
            height: "100%",
            padding: 20,
            color: theme.textColor1
        },
        mainLogo: {
            margin: 20,
            width: 200,
            height: 50,
        },
        background: {
            ...StyleSheet.absoluteFillObject,
        },
        formContainer: {
            width: '100%',
            padding: 25,
        },
        backgroundImage: {
            margin: 20,
            width: "100%",
            height: "100%",
            overflow: "hidden",
            borderRadius: 20,
            backgroundColor: theme.backgroundColor2
        },
        bg_container: {
        }
    });

    return (
        <View style={styles.container}>
            <ImageBackground
                source={colorScheme === "dark" ? DarkBG : LightBG} // Make sure to replace with your actual image path
                style={styles.backgroundImage}
                resizeMode='cover'
            >
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
            </ImageBackground>
        </View>
    );
};

export default OnBoardingPage;