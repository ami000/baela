import { useTheme } from "@/src/constants/themeContext";
import React, { forwardRef, ReactElement } from "react";
import { View, Text, StyleSheet, TextInput, TextInputProps, TouchableOpacity } from "react-native";
import { IconButton } from 'react-native-paper';

type IconProps = {
    position: "start" | "end";
    icon: ReactElement | string;
    onClick?: () => void;
};

interface TextBoxProps extends TextInputProps {
    icon?: IconProps;
    preLabel?: string;
    errorMessage?: string;
    hint?: string;
}

const TextBox = forwardRef<TextInput, TextBoxProps>(({
    icon,
    preLabel,
    errorMessage,
    hint,
    style,
    ...props
}, ref) => {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        container: {
            marginBottom: 16,
        },
        label: {
            fontSize: 14,
            fontWeight: '500',
            color: '#6c757d',
            marginBottom: 8,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#e0e0e0',
            borderRadius: 10,
            paddingHorizontal: 8,
        },
        input: {
            flex: 1,
            paddingVertical: 10,
            paddingHorizontal: 8,
            color: theme.textColor1,
            fontSize: 16,
        },
        errorInput: {
            borderColor: '#d32f2f',
        },
        icon: {
            marginHorizontal: 4,
        },
        errorMessage: {
            color: '#d32f2f',
            fontSize: 12,
            marginTop: 4,
        },
        hint: {
            color: '#6c757d',
            fontSize: 12,
            marginTop: 4,
        },
    });

    return (
        <View style={[styles.container, style]}>
            {preLabel && <Text style={styles.label}>{preLabel}</Text>}

            <View style={styles.inputContainer}>
                {icon?.position === "start" && (
                    <TouchableOpacity onPress={icon.onClick}>
                        <IconButton icon={() => icon.icon} size={20} style={styles.icon} />
                    </TouchableOpacity>
                )}

                <TextInput
                    ref={ref}
                    style={[styles.input, ...(errorMessage ? [styles.errorInput] : [])]}
                    placeholderTextColor={theme.placeholder}
                    {...props}
                />

                {icon?.position === "end" && (
                    <TouchableOpacity onPress={icon.onClick}>
                        <IconButton icon={typeof icon.icon === "string" ? icon.icon : () => icon.icon} size={20} style={styles.icon} />
                    </TouchableOpacity>
                )}
            </View>

            {errorMessage ? (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : (
                hint && <Text style={styles.hint}>{hint}</Text>
            )}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6c757d',
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        paddingHorizontal: 8,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 8,
        color: '#000',
        fontSize: 16,
    },
    errorInput: {
        borderColor: '#d32f2f',
    },
    icon: {
        marginHorizontal: 4,
    },
    errorMessage: {
        color: '#d32f2f',
        fontSize: 12,
        marginTop: 4,
    },
    hint: {
        color: '#6c757d',
        fontSize: 12,
        marginTop: 4,
    },
});

export default TextBox;
