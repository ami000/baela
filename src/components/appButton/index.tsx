import { useTheme } from '@/src/constants/themeContext';
import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text, TouchableOpacity, Image } from 'react-native';
import BackArrow from "@/src/assets/light/Arrow.png"
import DarkBackArrow from "@/src/assets/dark/Arrow.png"

interface IProps {
    className?: string;
    customVariant?: "cancel" | "back" | "analyse" | "custom-outlined";
    label: string;
    loading?: boolean;
    onPress: () => void; // onPress prop for the button action
    style?: any;
    disabled?: boolean;
}

const AppButton: React.FC<IProps> = ({ className, label, customVariant, loading, onPress, style, disabled }) => {
    const { theme, isDark } = useTheme()
    const styles: any = StyleSheet.create({
        commonButton: {
            backgroundColor: '#FF7F50',
            width: '100%',
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
        },
        label: {
            color: '#fff',
            textTransform: 'none',
        },
        buttonCancel: {
            backgroundColor: '#fff',
            borderColor: 'red',
            borderWidth: 1,
        },
        buttonBack: {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            borderWidth: 0,
        },
        buttonAnalyse: {
            backgroundColor: theme.textColor1,
            color: theme.backgroundColor,
            marginTop: 30,
        },
        buttonCustomOutlined: {
            borderColor: '#4B0082', // Replace with your custom color
            borderWidth: 1,
            backgroundColor: 'transparent',
        },
        modLabel: {
            color: theme.backIcon,
            fontWeight: 500
        }
    });
    const buttonStyles = [styles.commonButton, ...(style ? [style] : [])];
    const buttonLabels = [styles.label];

    // Determine the style based on the custom variant
    switch (customVariant) {
        case "cancel":
            buttonStyles.push(styles.buttonCancel);
            break;
        case "back":
            buttonStyles.push(styles.buttonBack);
            buttonLabels.push(styles.modLabel)
            break;
        case "analyse":
            buttonStyles.push(styles.buttonAnalyse);
            break;
        case "custom-outlined":
            buttonStyles.push(styles.buttonCustomOutlined);
            break;
        default:
            break;
    }

    return (
        <TouchableOpacity style={buttonStyles} onPress={onPress} disabled={loading || disabled}>
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text style={buttonLabels}>{customVariant === "back" && (
                    <Image source={isDark ? DarkBackArrow : BackArrow}/>
                )}{customVariant === "back" ? "  " + label : label}</Text>
            )}
        </TouchableOpacity>
    );
};

export default AppButton;
