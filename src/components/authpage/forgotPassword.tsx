import React, { memo } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { Controller } from "react-hook-form";
import TextBox from "../textbox";
import AppButton from "../appButton";
import { Link } from "expo-router";
import { useTheme } from "@/src/constants/themeContext";

interface ForgotPasswordProps {
    onSubmit: () => void;
    loading: boolean;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onSubmit, loading }) => {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        container: {
            padding: 20,
            borderRadius: 8,
            color: theme.textColor1,
            alignItems: "center",
            width: 360,
            alignSelf: "center",
        },
        header: {
            display: "flex",
            alignItems: "flex-start",
            width: "100%",
        },
        headerText: {
            fontSize: 20,
            fontWeight: "700",
            marginBottom: 20,
            color: theme.textColor1
        },
        resetHint: {
            color: theme.secondaryText,
            fontSize: 16,
            marginBottom: 10,
            textAlign: "left",
            width: "100%",
        },
        textFieldContainer: {
            width: "100%",
            marginBottom: 20,
        },
        signInLinkContainer: {
            alignSelf: "flex-end",
            marginTop: 10,
        },
        signInLinkText: {
            color: theme.textColor1,
            fontSize: 14,
            fontWeight: "500",
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Forgot Password</Text>
            </View>

            <Text style={styles.resetHint}>
                Enter the email address associated with your account. We will send you the reset link to your mail
            </Text>

            <View style={styles.textFieldContainer}>
                <Controller
                    name="email"
                    rules={{
                        required: "Email is required for password reset",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Enter a valid email"
                        }
                    }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <TextBox
                            placeholder="Enter your email"
                            errorMessage={error?.message}
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                        />
                    )}
                />
                <Link href={{
                    pathname: "/(auth)/signin"
                }} asChild>
                    <TouchableOpacity style={styles.signInLinkContainer}>
                        <Text style={styles.signInLinkText}>Go to Sign in</Text>
                    </TouchableOpacity>
                </Link>
            </View>

            <AppButton loading={loading} label="Send mail" onPress={onSubmit} />
        </View>
    );
};

export default memo(ForgotPassword);