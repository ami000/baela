import React, { memo, useState } from "react";
import { Text, View, Image, TouchableOpacity, Pressable, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import VisibilityIcon from "@expo/vector-icons/MaterialIcons";
import VisibilityOffIcon from "@expo/vector-icons/MaterialIcons";
import GLogo from "../../assets/light/logo/google_logo.png";
import TextBox from "../textbox";
import AppButton from "../appButton";
import { Link } from "expo-router";
import { useTheme } from "@/src/constants/themeContext";

interface SignUpFormProps {
    handleGoogleLogin: () => void;
    onSubmit: () => void;
    loading: boolean;
}

const SignupForm: React.FC<SignUpFormProps> = ({ handleGoogleLogin, loading, onSubmit }) => {
    const { theme } = useTheme();
    const [visibility, setVisibility] = useState({
        pass: false,
        confirmPass: false,
    });

    const styles = StyleSheet.create({
        container: {
            width: 360,
            margin: "auto",
            padding: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 8,
            color: theme.textColor1
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
        googleButton: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            width: "100%",
            borderWidth: 1,
            borderColor: "#dadce0",
            borderRadius: 8,
            backgroundColor: "#fff",
        },
        googleIcon: {
            height: 20,
            width: 20,
            marginRight: 8,
        },
        googleButtonText: {
            fontSize: 14,
            fontWeight: "600",
            color: "#3c4043",
        },
        divider: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            marginVertical: 16,
        },
        dividerLine: {
            flex: 1,
            height: 1,
            backgroundColor: "#6B7280",
        },
        dividerText: {
            marginHorizontal: 9,
            color: "#6B7280",
            fontSize: 16,
        },
        inputContainer: {
            width: "100%",
            marginBottom: 10,
        },
        loginText: {
            fontSize: 14,
            color: "#6B7280"
        },
        loginLink: {
            color: theme.textColor1,
            fontWeight: "500"
        },
        textLine: {
            display: "flex",
            width: "100%",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            height: 50
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Let's Get Started</Text>
            </View>

            <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
                <Image source={GLogo} style={styles.googleIcon} />
                <Text style={styles.googleButtonText}>Sign up with Google</Text>
            </TouchableOpacity>

            <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Or</Text>
                <View style={styles.dividerLine} />
            </View>

            <View style={styles.inputContainer}>
                <Controller
                    name="name"
                    rules={{
                        required: "Name is required for signup",
                    }}
                    render={({ field: { value, onChange, ...rest }, fieldState: { error } }) => (
                        <TextBox
                            preLabel="Name"
                            placeholder="Enter your name"
                            errorMessage={error?.message}
                            value={value}
                            onChangeText={onChange}
                            {...rest}
                        />
                    )}
                />
                <Controller
                    name="email"
                    rules={{
                        required: "Email is required for signup",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Enter a valid email",
                        },
                    }}
                    render={({ field: { value, onChange, ...rest }, fieldState: { error } }) => (
                        <TextBox
                            preLabel="Email"
                            placeholder="Enter your email"
                            errorMessage={error?.message}
                            value={value}
                            onChangeText={onChange}
                            {...rest}
                        />
                    )}
                />
                <Controller
                    name="password"
                    rules={{
                        required: "Password is required for signup",
                        pattern: {
                            value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                            message: "Password is invalid",
                        },
                    }}
                    render={({ field: { value, onChange, ...rest }, fieldState: { error } }) => (
                        <TextBox
                            preLabel="Password"
                            placeholder="Create a password"
                            hint="Must be at least 8 characters."
                            errorMessage={error?.message}
                            secureTextEntry={!visibility.pass}
                            onChangeText={onChange}
                            icon={{
                                position: "end",
                                icon: visibility.pass ? (
                                    <VisibilityOffIcon
                                        color={theme.textColor1}
                                        name="visibility-off"
                                        size={20}
                                        onPress={() => setVisibility((prev) => ({ ...prev, pass: !prev.pass }))}
                                    />
                                ) : (
                                    <VisibilityIcon
                                        color={theme.textColor1}
                                        name="visibility"
                                        size={20}
                                        onPress={() => setVisibility((prev) => ({ ...prev, pass: !prev.pass }))}
                                    />
                                ),
                            }}
                            value={value}
                            {...rest}
                        />
                    )}
                />
            </View>

            <AppButton loading={loading} label="Sign Up" onPress={onSubmit} />

            <View style={styles.textLine}>
                <Text style={styles.loginText}>
                    Already have an account?{" "}
                </Text>
                <Link href={{ pathname: "/(auth)/signin" }} asChild>
                    <Pressable>
                        <Text style={styles.loginLink}>Log in</Text>
                    </Pressable>
                </Link>
            </View>
        </View>
    );
};

export default memo(SignupForm);
