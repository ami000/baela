import React, { forwardRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import DatePicker from "react-native-date-picker";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

interface IProps {
    errorMessage?: string;
    preLabel?: string;
    className?: string;
    date?: Dayjs | null;
    onDateChange?: (date: Dayjs | null) => void;
    mode?: "date" | "time" | "datetime";
    minimumDate?: Date;
    maximumDate?: Date;
    style?: any;
}

const AppDatePicker = forwardRef<View, IProps>(
    ({ preLabel, errorMessage, date, onDateChange, mode = "date", minimumDate, maximumDate, style }, ref) => {
        return (
            <View ref={ref} style={styles.datePickerContainer}>
                {!!preLabel && <Text style={styles.preLabel}>{preLabel}</Text>}
                <DatePicker
                    date={date ? date.toDate() : new Date()}
                    onDateChange={(newDate) => onDateChange && onDateChange(dayjs(newDate).utc())}
                    mode={mode}
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                    style={[styles.datePicker, ...(style ? [style] : [])]}
                />
                {errorMessage && <Text style={styles.errorMsg}>{errorMessage}</Text>}
            </View>
        );
    }
);

const styles = StyleSheet.create({
    datePickerContainer: {
        width: "100%",
    },
    preLabel: {
        fontSize: 14,
        paddingBottom: 5,
        textAlign: "left",
    },
    datePicker: {
        width: "100%",
        alignSelf: "center",
    },
    errorMsg: {
        color: "#d32f2f",
        fontSize: 12,
    },
});

export default AppDatePicker;
