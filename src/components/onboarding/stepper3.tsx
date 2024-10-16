import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "@/src/redux/Reducer/userReducer";
import GreetText from "../greetText";
import AppButton from "../appButton";
import { useTheme } from "@/src/constants/themeContext";
import RatingComponent from "../ratingComponent";
import AppCheckbox from "../appCheckbox";

interface IProps {
    backClick: () => void;
    submitClick: () => void;
}

const Stepper3: React.FC<IProps> = ({ backClick, submitClick }) => {
    const [modified, setModified] = useState(false);
    const dispatch = useDispatch();
    const userDetail = useSelector((state: any) => state?.userDetails?.userDetails);
    const { theme } = useTheme();
    const { userName, nickName } = userDetail;
    const { watch, setValue, getValues } = useFormContext();

    const validData = useMemo(() => {
        const score = watch("currGmatScore");
        return (score && score > 524 && score < 806) || score === undefined;
    }, [watch("currGmatScore")]);

    useEffect(() => {
        setValue("currGmatScore", 525);
    }, []);

    const handleSubmit = () => {
        dispatch(updateUserData({
            currentGmatScore: getValues("currGmatScore"),
            attendedGmatBefore: getValues("attendedGmatBefore"),
        }));
        submitClick();
    };

    const toOddMultipleOfFive = (num: number): number => {
        let nearestMultipleOfFive = Math.round(num / 5) * 5;
        if (nearestMultipleOfFive % 2 === 0) {
            nearestMultipleOfFive += 5;
        }
        return nearestMultipleOfFive;
    };

    const styles = StyleSheet.create({
        contentContainer: {
            height: "60%",
            justifyContent: "space-between",
            padding: 20,
        },
        topArea: {
            gap: 10,
            minHeight: "100%"
        },
        questionContainer: {
            marginBottom: 10,
        },
        question: {
            fontWeight: "600",
            fontSize: 22,
            color: theme.textColor1,
        },
        hint: {
            marginTop: 10,
            color: theme.gray300,
            fontWeight: "400",
            fontSize: 16,
        },
        onboardingDate: {
            maxWidth: 295,
        },
        bottomButtons: {
            flexDirection: "row",
            justifyContent: "flex-end",
        },
        backButton: {
            marginRight: 10,
            backgroundColor: "#ddd",
            color: theme.textColor1
        },
        continueButton: {
            // backgroundColor: "#007AFF",
            width: "auto",
            padding: 20
        },
        inputContainer: {
            alignItems: 'center',
            height: "100%"
        },
        textInput: {
            fontWeight: '800',
            fontSize: 22,
            backgroundColor: '#F5F5F5',
            color: '#171717',
            textAlign: 'center',
            width: 100,
        },
        motivation: {
            color: '#6B7280',
            overflow: 'hidden',
            width: 0,
            height: 'auto',
            fontSize: 12,
            // transition: 'all 0.5s',
        },
        active: {
            width: '100%',
        },
        errorText: {
            color: 'red',
        },
        checkboxCont: {
            marginTop: 10,
            display: "flex",
            flexDirection: "row",
            // gap: 10,
            alignItems: "center"
        },
        plainText: {
            color: theme.textColor1
        }
    });

    return (
        <View style={styles.contentContainer}>
            <View style={styles.topArea}>
                <GreetText>{`Hello ${userName || nickName}!`}</GreetText>
                <View style={styles.questionContainer}>
                    <Text style={styles.question}>What is your current G-MAT score?</Text>
                    <Text style={styles.hint}>Here is supposed to state the reason why we need this copy! For efficiency.</Text>
                    <View style={styles.checkboxCont}>
                        <Controller
                            name="attendedGmatBefore"
                            render={({ field: { value, onChange } }) => (
                                <AppCheckbox
                                    checked={value ? true : false}
                                    onPress={() => onChange(!value)}
                                />
                            )}
                        />
                        <Text style={styles.plainText}>I haven’t taken the G-MAT Test Yet</Text>
                    </View>
                </View>
                {!watch("attendedGmatBefore") && (
                    <View style={styles.inputContainer}>
                        <Controller
                            name="currGmatScore"
                            render={({ field: { value, onChange } }) => (
                                <TextInput
                                    style={styles.textInput}
                                    value={value ? value.toString() : "525"}
                                    onChangeText={(text) => {
                                        if (/^\d+$/.test(text) || text === "") {
                                            onChange(text);
                                            setModified(true);
                                        }
                                    }}
                                    onBlur={() => onChange(toOddMultipleOfFive(Number(value)))}
                                    keyboardType="numeric"
                                />
                            )}
                        />
                        <RatingComponent
                            value={Number(watch("currGmatScore")) || 0}
                            onChange={(score) => setValue("currGmatScore", score)}
                        />
                        <Text style={[styles.motivation, !validData ? styles.errorText : {}]}>
                            {!validData ? "Enter a valid score" : "All looks good!"}
                        </Text>
                    </View>
                )}
            </View>
            <View style={styles.bottomButtons}>
                <AppButton
                    style={styles.backButton}
                    onPress={backClick}
                    customVariant="back"
                    label="Back"
                />
                <AppButton style={styles.continueButton} onPress={handleSubmit} label="Continue" />
            </View>
        </View>
    );
};

export default Stepper3;
