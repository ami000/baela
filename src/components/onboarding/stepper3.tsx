import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { UserService } from "@/src/services/user.service";
import { updateUserData } from "@/src/redux/Reducer/userReducer";
import GreetText from "../greetText";
import TextBox from "../textbox";
import AppButton from "../appButton";
import AppCheckbox from "../appCheckbox";

interface IProps {
    backClick: () => void;
}

const Stepper3: React.FC<IProps> = ({ backClick }) => {
    const userService = new UserService();
    const { setValue, watch, getValues } = useFormContext();
    const dispatch = useDispatch();
    const userDetail = useSelector((state: any) => state?.userDetails?.userDetails);
    const { userName } = userDetail;

    const validData = useMemo(() => {
        const currScore = watch("currGmatScore");
        return currScore && currScore > 524 && currScore < 806;
    }, [watch("currGmatScore")]);

    const handleSubmit = async () => {
        dispatch(
            updateUserData({
                currentGmatScore: getValues("currGmatScore"),
                attendedGmatBefore: !getValues("attendedGmatBefore"),
            })
        );
        await userService.UpdateUser({
            ...userDetail,
            currentGmatScore: getValues("currGmatScore"),
            attendedGmatBefore: !getValues("attendedGmatBefore"),
        });
    };

    const toOddMultipleOfFive = (num: number): number => {
        let nearestMultipleOfFive = Math.round(num / 5) * 5;
        if (nearestMultipleOfFive % 2 === 0) nearestMultipleOfFive += 5;
        return nearestMultipleOfFive;
    };

    return (
        <View style={styles.container}>
            <View style={styles.topArea}>
                <GreetText>{`Hello ${userName}!`}</GreetText>
                <View style={styles.questionContainer}>
                    <Text style={styles.question}>What is Your current G-MAT score?</Text>
                    <Text style={styles.hint}>
                        Here is supposed to state the reason why we need this copy! For efficiency.
                    </Text>
                    <View style={styles.checkboxContainer}>
                        <Controller
                            name="attendedGmatBefore"
                            render={({ field: { value, onChange } }) => (
                                <AppCheckbox
                                    checked={!!value}
                                    onPress={() => onChange(!value)}
                                />
                            )}
                        />
                        <Text>I haven’t taken the G-MAT Test Yet</Text>
                    </View>
                </View>
                {!watch("attendedGmatBefore") && (
                    <View style={styles.inputContainer}>
                        <Controller
                            name="currGmatScore"
                            render={({ field: { value, onChange } }) => (
                                <TextBox
                                    value={value || "525"}
                                    onChangeText={(e) => onChange(toOddMultipleOfFive(Number(e)))}
                                    onBlur={() => onChange(toOddMultipleOfFive(Number(value)))}
                                />
                            )}
                        />
                        {/* <RatingComponent
                            value={Number(watch("currGmatScore") || 0)}
                            onChange={(val: number) => setValue("currGmatScore", String(val))}
                        /> */}
                        {!validData && <Text style={styles.errorText}>Enter a valid score</Text>}
                    </View>
                )}
            </View>
            <View style={styles.buttonContainer}>
                <AppButton label="Back" onPress={backClick}
                    // variant="back"
                />
                <AppButton label="Continue" onPress={handleSubmit}
                    // variant="primary"
                />
            </View>
        </View>
    );
};

export default Stepper3;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        fontSize: 22,
        fontWeight: "600",
    },
    hint: {
        color: "#6B7280",
        fontSize: 16,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    inputContainer: {
        alignItems: "center",
    },
    errorText: {
        color: "red",
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
