import { useTheme } from "@/src/constants/themeContext";
import React from "react";
import { Text, StyleSheet } from "react-native";
import { useFonts, RobotoMono_400Regular } from '@expo-google-fonts/roboto-mono';

interface IProps {
    text?: string;
    children?: string;
}

const GreetText: React.FC<IProps> = ({ text, children }) => {
    const { theme } = useTheme();

    const [fontsLoaded] = useFonts({
        'RobotoMono-Regular': RobotoMono_400Regular,
    });

    const styles = StyleSheet.create({
        greetingText: {
            fontFamily: fontsLoaded ? 'RobotoMono-Regular' : `"Roboto", "Oxygen", 
                       "Ubuntu", sans-serif`,
            fontSize: 16,
            fontWeight: "500",
            color: theme.textColor1,
        },
    });

    return <Text style={styles.greetingText}>{text || children}</Text>;
};

export default GreetText;
