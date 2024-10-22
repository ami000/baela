import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CircularProgress } from 'react-native-circular-progress';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/constants/themeContext';

interface ExamCountdownProps {
    examDate: Date;
}

const ExamCountdown: React.FC<ExamCountdownProps> = ({ examDate }) => {
    const daysToGo = Math.ceil((examDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    const { theme } = useTheme();
    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.backgroundColor2,
            borderRadius: 10,
            padding: 20,
            
            alignItems: 'center',
            justifyContent: "space-between",
            flexDirection: "row",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        title: {
            color: theme.textColor1,
            fontSize: 16,
            // fontWeight: 'bold',
            marginBottom: 10,
        },
        dateContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.profileBg,
            borderRadius: 5,
            padding: 10,
        },
        dateText: {
            color: theme.textColor1,
            marginLeft: 10,
        },
        progressContainer: {
            alignSelf: 'flex-end',
        },
        daysContainer: {
            alignItems: 'center',
        },
        daysNumber: {
            color: theme.textColor1,
            fontSize: 24,
            fontWeight: 'bold',
        },
        daysText: {
            color: theme.textColor1,
            fontSize: 12,
        },
        toGoText: {
            color: theme.textColor1,
            fontSize: 10,
            opacity: 0.7,
        },
    });

    return (
        <View style={styles.container}>
            <View >
                <Text style={styles.title}>MY EXAM DATE</Text>
                <View style={styles.dateContainer}>
                    <Ionicons name="calendar-outline" size={24} color="#888" />
                    <Text style={styles.dateText}>
                        {examDate.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </Text>
                </View>
            </View>
            <View style={styles.progressContainer}>
                <CircularProgress
                    size={100}
                    width={10}
                    fill={100 - (daysToGo / 60) * 100} // Assuming 30 days total
                    tintColor={theme.primeColor}
                    backgroundColor={theme.countDownBar}
                    lineCap='round'
                    rotation={0}
                >
                    {() => (
                        <View style={styles.daysContainer}>
                            <Text style={styles.daysNumber}>{daysToGo}</Text>
                            <Text style={styles.daysText}>days</Text>
                            <Text style={styles.toGoText}>TO GO</Text>
                        </View>
                    )}
                </CircularProgress>
            </View>
        </View>
    );
};

export default ExamCountdown;