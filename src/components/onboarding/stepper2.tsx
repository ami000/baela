import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "@/src/redux/Reducer/userReducer";
import GreetText from "../greetText";
import AppButton from "../appButton";
import { useTheme } from "@/src/constants/themeContext";
import RatingComponent from "../ratingComponent";
import { Typewriter } from "../typewriter";

interface IProps {
    backClick: () => void;
    submitClick: () => void;
}

const Stepper2: React.FC<IProps> = ({ backClick, submitClick }) => {
    const [modified, setModified] = useState(false);
    const dispatch = useDispatch();
    const userDetail = useSelector((state: any) => state?.userDetails?.userDetails);
    const { theme } = useTheme();
    const { userName, nickName } = userDetail;
    const { watch, setValue, getValues } = useFormContext();

    const validData = useMemo(() => {
        return (
            watch("gmatScore") && watch("gmatScore") > 524 && watch("gmatScore") < 806
        );
    }, [watch("gmatScore")]);

    useEffect(() => {
        setValue("gmatScore", 525);
    }, []);

    const handleSubmit = () => {
        dispatch(
            updateUserData({
                exceptedGmatScore: getValues("gmatScore"),
            })
        );
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
    });

    return (
        <View style={styles.contentContainer}>
            <View style={styles.topArea}>
                <GreetText>{`Hello ${userName || nickName}!`}</GreetText>
                <View style={styles.questionContainer}>
                    <Text style={styles.question}>When is your G-MAT Exam date?</Text>
                    <Text style={styles.hint}>
                        Here is supposed to state the reason why we need this copy! For efficiency.
                    </Text>
                </View>
                <View style={styles.inputContainer}>
                    <Controller
                        name="gmatScore"
                        render={({ field: { value, onChange } }) => {
                            const handleChange = (text: string) => {
                                if (text === "" || /^\d+$/.test(text)) {
                                    if (!modified) setModified(true);
                                    onChange(text);
                                }
                            };

                            return (
                                <TextInput
                                    style={styles.textInput}
                                    value={value ? value.toString() : "525"}
                                    onChangeText={handleChange}
                                    onBlur={() => onChange(toOddMultipleOfFive(Number(value)))}
                                    keyboardType="numeric"
                                />
                            );
                        }}
                    />
                    <RatingComponent
                        value={Number(watch("gmatScore")) || 0}
                        onChange={(score: number) => {
                            if (!modified) setModified(true);
                            setValue("gmatScore", score);
                        }}
                    />
                    <Text
                        style={[
                            styles.motivation,
                            (watch("gmatScore") < 586 && modified) || !validData ? styles.active : {},
                            !validData ? styles.errorText : {}
                        ]}
                    >
                        {!validData
                            ? <Typewriter index={1} currIndex={((watch("gmatScore") < 586 && modified) || !validData) ? 1 : 0} >Enter a valid score</Typewriter>
                            : <Typewriter index={1} currIndex={((watch("gmatScore") < 586 && modified) || !validData) ? 1 : 0} >Don't You have confidence on you buddy 💪😎</Typewriter>}
                    </Text>
                </View>
            </View>
            <View style={styles.bottomButtons}>
                <AppButton
                    style={styles.backButton}
                    onPress={backClick}
                    customVariant="back"
                    label="Back"
                />
                <AppButton
                    style={styles.continueButton}
                    onPress={handleSubmit}
                    label="Continue"
                />
            </View>
        </View>
    );
};

export default Stepper2;
