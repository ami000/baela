import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "@/src/redux/Reducer/userReducer";
import GreetText from "../greetText";
import AppButton from "../appButton";
import AppDatePicker from "../appDatePicker";

interface IProps {
    backClick: () => void;
}

const Stepper1: React.FC<IProps> = ({ backClick }) => {
    const dispatch = useDispatch();
    const userDetail = useSelector((state: any) => state?.userDetails?.userDetails);
    const { setValue, getValues } = useFormContext();
    const { userName } = userDetail;

    const handleSubmit = () => {
        dispatch(
            updateUserData({
                examDate: getValues("examDate"),
            })
        );
    };

    return (
        <View style={styles.contentContainer}>
            <View style={styles.topArea}>
                <GreetText>{`Hello ${userName}!`}</GreetText>
                <View style={styles.questionContainer}>
                    <Text style={styles.question}>When is your G-MAT Exam date?</Text>
                    <Text style={styles.hint}>
                        Here is supposed to state the reason why we need this copy! For efficiency.
                    </Text>
                </View>
                <Controller
                    name="gmatDate"
                    rules={{
                        required: "This field must be required",
                        validate: (value) =>
                            !dayjs(value)?.isValid() ? "Date is not valid" : true,
                    }}
                    render={({
                        field: { value, onChange, ...rest },
                        fieldState: { error },
                    }) => {
                        const changeHandler = (e: Dayjs | null) => {
                            setValue("examDate", e?.utc()?.format() || null);
                            onChange(e?.utc()?.format() || null);
                        };
                        const newValue = value ? dayjs(value) : null;
                        return (
                            <AppDatePicker
                                preLabel="Date"
                                style={styles.onboardingDate}
                                errorMessage={error?.message}
                                onDateChange={(e: any) => changeHandler(e)}
                                date={newValue}
                                minimumDate={new Date()}
                                {...rest}
                            />
                        );
                    }}
                />
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

const styles = StyleSheet.create({
    contentContainer: {
        height: "70%",
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
    },
    hint: {
        color: "#888",
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
    },
    continueButton: {
        backgroundColor: "#007AFF",
    },
});

export default Stepper1;
