import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "@/src/redux/Reducer/userReducer";
import GreetText from "../greetText";
import AppButton from "../appButton";

interface IProps {
    backClick: () => void;
}

const Stepper2: React.FC<IProps> = ({ backClick }) => {
    const [modified, setModified] = useState(false);
    const dispatch = useDispatch();
    const userDetail = useSelector((state: any) => state?.userDetails?.userDetails);
    const { userName } = userDetail;
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
    };

    const toOddMultipleOfFive = (num: number): number => {
        let nearestMultipleOfFive = Math.round(num / 5) * 5;
        if (nearestMultipleOfFive % 2 === 0) {
            nearestMultipleOfFive += 5;
        }
        return nearestMultipleOfFive;
    };

    return (
        <View style={styles.container}>
            <View style={styles.topArea}>
                <GreetText>{`Hello ${userName}!`}</GreetText>
                <View style={styles.questionContainer}>
                    <Text style={styles.question}>What is Your target G-Mat score?</Text>
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
                    {/* <RatingComponent
                        value={Number(watch("gmatScore")) || 0}
                        onChange={(score: number) => {
                            if (!modified) setModified(true);
                            setValue("gmatScore", score);
                        }}
                    /> */}
                    <Text
                        style={[
                            styles.motivation,
                            (watch("gmatScore") < 586 && modified) || !validData ? styles.active : {},
                            !validData ? styles.errorText : {}
                        ]}
                    >
                        {!validData
                            ? "Enter a valid score"
                            : "Don't You have confidence on you buddy 💪😎"}
                    </Text>
                </View>
            </View>
            <View style={styles.bottomButtons}>
                <AppButton
                    style={styles.button}
                    onPress={backClick}
                    label="Back"
                    customVariant="back"
                />
                <AppButton
                    style={styles.button}
                    onPress={handleSubmit}
                    label="Continue"
                    // customVariant="continue"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '70%',
        justifyContent: 'space-between',
        padding: 20,
    },
    topArea: {
        gap: 10,
    },
    questionContainer: {
        marginBottom: 10,
    },
    question: {
        fontWeight: '600',
        fontSize: 22,
    },
    hint: {
        color: '#6B7280',
        fontSize: 16,
    },
    inputContainer: {
        alignItems: 'center',
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
        // transition: 'all 0.5s',
    },
    active: {
        width: '100%',
    },
    errorText: {
        color: 'red',
    },
    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#3b82f6', // Assuming var(--prime-color)
    },
});

export default Stepper2;
