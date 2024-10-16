import { useTheme } from '@/src/constants/themeContext';
import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';

interface IProps {
    className?: string;
    customVariant?: "cancel" | "back" | "analyse" | "custom-outlined";
    label: string;
    loading?: boolean;
    onPress: () => void; // onPress prop for the button action
    style?: any;
}

const AppButton: React.FC<IProps> = ({ className, label, customVariant, loading, onPress, style }) => {
    const { theme } = useTheme()
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
            backgroundColor: '#4B0082', // Replace with your custom color
            marginTop: 30,

        },
        buttonCustomOutlined: {
            borderColor: '#4B0082', // Replace with your custom color
            borderWidth: 1,
            backgroundColor: 'transparent',

        },
    });
    const buttonStyles = [styles.commonButton, ...(style ? [style] : [])];

    // Determine the style based on the custom variant
    switch (customVariant) {
        case "cancel":
            buttonStyles.push(styles.buttonCancel);
            break;
        case "back":
            buttonStyles.push(styles.buttonBack);
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
        <TouchableOpacity style={buttonStyles} onPress={onPress} disabled={loading}>
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text style={styles.label}>{label}</Text>
            )}
        </TouchableOpacity>
    );
};

export default AppButton;
