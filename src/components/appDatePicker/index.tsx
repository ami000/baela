import React, { forwardRef, useState } from "react";
import { View, Text, StyleSheet, Platform, TouchableOpacity } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import { useTheme } from "@/src/constants/themeContext";
import { Feather } from '@expo/vector-icons';

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
        const [show, setShow] = useState(false);
        const { theme } = useTheme();

        const onChange = (event: any, selectedDate?: Date) => {
            const currentDate = selectedDate || date?.toDate() || new Date();
            setShow(Platform.OS === 'ios');
            onDateChange && onDateChange(dayjs(currentDate).utc());
        };

        const showDatepicker = () => {
            setShow(true);
        };

        const styles = StyleSheet.create({
            container: {
                width: "100%",
            },
            preLabel: {
                color: theme.textColor1,
                fontSize: 14,
                marginBottom: 8,
            },
            dateInputContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 12,
                // backgroundColor: theme.backgroundColor2 || '#333333',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: theme.commonBorder || '#444444',
            },
            dateText: {
                color: theme.textColor1,
                fontSize: 16,
                flex: 1,
            },
            icon: {
                marginLeft: 10,
            },
            errorMsg: {
                color: "red",
                fontSize: 12,
                marginTop: 4,
            },
        });

        return (
            <View ref={ref} style={styles.container}>
                {!!preLabel && <Text style={styles.preLabel}>{preLabel}</Text>}
                <TouchableOpacity onPress={showDatepicker} style={[styles.dateInputContainer, style]}>
                    <Text style={styles.dateText}>
                        {date ? date.format('D MMMM YYYY') : 'Select date'}
                    </Text>
                    <Feather name="calendar" size={20} color={theme.textColor1} style={styles.icon} />
                </TouchableOpacity>
                {errorMessage && <Text style={styles.errorMsg}>{errorMessage}</Text>}
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date ? date.toDate() : new Date()}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        minimumDate={minimumDate}
                        maximumDate={maximumDate}
                    />
                )}
            </View>
        );
    }
);

export default AppDatePicker;