import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "@/src/redux/Reducer/userReducer";
import GreetText from "../greetText";
import AppButton from "../appButton";
import AppDatePicker from "../appDatePicker";
import { useTheme } from "@/src/constants/themeContext";

interface IProps {
    backClick: () => void;
    submitClick: () => void;
}

const Stepper1: React.FC<IProps> = ({ backClick, submitClick }) => {
    const dispatch = useDispatch();
    const userDetail = useSelector((state: any) => state?.userDetails?.userDetails);
    const { setValue, getValues } = useFormContext();
    const { userName, nickName } = userDetail;
    const { theme } = useTheme();

    const handleSubmit = () => {
        dispatch(
            updateUserData({
                examDate: getValues("examDate"),
            })
        );
        submitClick();
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
        },
        continueButton: {
            // backgroundColor: "#007AFF",
            width: "auto",
            padding: 20
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

export default Stepper1;
