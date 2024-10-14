import React from "react";
import { Text, StyleSheet } from "react-native";

interface IProps {
    text?: string;
    children?: string;
}

const GreetText: React.FC<IProps> = ({ text, children }) => {
    return <Text style={styles.greetingText}>{text || children}</Text>;
};

const styles = StyleSheet.create({
    greetingText: {
        fontFamily: "RobotoMono-Regular", // Make sure to load this font in your Expo project
        fontSize: 16,
        fontWeight: "500",
        color: "#333", // Replace with your custom color variable, if needed
    },
});

export default GreetText;
