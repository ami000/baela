import React, { memo, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import TextBox from "../textbox";
import AppButton from "../appButton";
import googleLogo from "../../assets/light/logo/google_logo.png";

interface SignInFormProps {
    handleGoogleLogin: () => void;
    onSubmit: () => void;
    loading: boolean;
}

const SignInForm: React.FC<SignInFormProps> = ({ handleGoogleLogin, onSubmit, loading }) => {
    const [visibility, setVisibility] = useState({
        pass: false,
    });

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Login</Text>

            <TouchableOpacity
                style={styles.googleLoginButton}
                onPress={handleGoogleLogin}
            >
                <Image source={googleLogo} style={styles.googleLogo} />
                <Text style={styles.googleLabel}>Sign up with Google</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Or</Text>
                <View style={styles.dividerLine} />
            </View>

            <View style={styles.textFieldContainer}>
                <Controller
                    name="email"
                    rules={{
                        required: "Email is required for signin",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Enter a valid email"
                        }
                    }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <TextBox
                            preLabel="Email"
                            placeholder="Enter your email"
                            errorMessage={error?.message}
                            value={value}
                            onBlur={onBlur}
                            onChangeText={(e) => {
                                console.log(e)
                                onChange(e)
                            }}
                        />
                    )}
                />
                <Controller
                    name="password"
                    rules={{
                        required: "Password is required for signup",
                        pattern: {
                            value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                            message: "Password is invalid"
                        }
                    }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <TextBox
                            preLabel="Password"
                            placeholder="Create a password"
                            errorMessage={error?.message}
                            secureTextEntry={!visibility.pass}
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            icon={{
                                icon: visibility.pass ? "eye" : "eye-off",
                                position: "end",
                                onClick: () => setVisibility(prev => ({ ...prev, pass: !prev.pass })),
                            }}
                        />
                    )}
                />
                <TouchableOpacity style={styles.forgotPasswordContainer}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            <AppButton loading={loading} label="Login" onPress={onSubmit} />

            <Text style={styles.footerText}>
                New to Pocketbud?{" "}
                <Text style={styles.signUpLink}>Sign Up</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 8,
        backgroundColor: "#fff",
        alignItems: "center",
        width: 360,
        alignSelf: "center",
    },
    header: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 20,
    },
    googleLoginButton: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#dadce0",
        borderRadius: 8,
        padding: 10,
        width: "100%",
        justifyContent: "center",
        marginBottom: 16,
    },
    googleLogo: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    googleLabel: {
        fontSize: 14,
        fontWeight: "500",
        color: "#3c4043",
    },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginVertical: 16,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#dadce0",
    },
    dividerText: {
        marginHorizontal: 10,
        color: "#6B7280",
        fontSize: 16,
    },
    textFieldContainer: {
        width: "100%",
        marginBottom: 20,
    },
    forgotPasswordContainer: {
        alignSelf: "flex-end",
        marginTop: 10,
    },
    forgotPasswordText: {
        color: "#6B7280",
        fontSize: 14,
    },
    footerText: {
        marginTop: 20,
        fontSize: 14,
        color: "#6B7280",
    },
    signUpLink: {
        color: "#1E90FF",
    },
});

export default memo(SignInForm);
