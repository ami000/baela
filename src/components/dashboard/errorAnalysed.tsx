import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Notepad from "@/src/assets/light/Notepad.png"
import { useTheme } from '@/src/constants/themeContext';

interface ErrorLogsAnalysedProps {
    count: number;
}

const ErrorLogsAnalysed: React.FC<ErrorLogsAnalysedProps> = ({ count }) => {
    const { theme } = useTheme();
    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.backgroundColor2,
            borderRadius: 10,
            padding: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        textContainer: {
            flex: 1,
        },
        title: {
            color: theme.textColor1,
            fontSize: 16,
            marginBottom: 10,
        },
        count: {
            fontSize: 24,
            fontWeight: 'bold',
            color: theme.textColor1,
        },
        iconContainer: {
            backgroundColor:  theme.profileBg,
            borderRadius: 8,
            padding: 10,
            paddingVertical: 20
        },
        icon: {
            // width: 20,
            height: 30,
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>TOTAL ERROR LOGS ANALYSED</Text>
                <Text style={styles.count}>{count}</Text>
            </View>
            <View style={styles.iconContainer}>
                <Image source={Notepad} resizeMode='contain' style={styles.icon} />
            </View>
        </View>
    );
};

export default ErrorLogsAnalysed;