import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { useTheme } from '@/src/constants/themeContext';

const StudyTimeAllocation = () => {
    const { theme } = useTheme();

    const pieData = [
        { value: 40, color: '#FDA172', text: '40%' },
        { value: 30, color: '#FFC3A0', text: '30%' },
        { value: 30, color: '#F5E7E0', text: '30%' },
    ];

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.backgroundColor2,
            borderRadius: 10,
            padding: 20,
            justifyContent: "space-between",
            flexDirection: "column",
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
            fontWeight: 'bold',
            marginBottom: 20,
        },
        chartContainer: {
            alignItems: 'center',
            justifyContent: "center",
            flexDirection: "row",
            gap: 20
        },
        legendContainer: {
            flexDirection: 'column',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: 20,
        },
        legendItem: {
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 20,
            marginBottom: 10,
        },
        legendColor: {
            width: 12,
            height: 12,
            borderRadius: 6,
            marginRight: 8,
        },
        legendText: {
            color: theme.textColor1,
            fontSize: 14,
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>STUDY TIME ALLOCATION</Text>
            <View style={styles.chartContainer}>
                <PieChart
                    data={pieData}
                    donut
                    radius={Dimensions.get('window').width * 0.20}
                    innerRadius={Dimensions.get('window').width * 0.09}
                    innerCircleColor={theme.backgroundColor2}
                    textColor={theme.textColor1}
                    textSize={12}
                    // showText
                    focusOnPress
                />
                <View style={styles.legendContainer}>
                    {pieData.map((item, index) => (
                        <View key={index} style={styles.legendItem}>
                            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                            <Text style={styles.legendText}>{`Series ${index + 1}`}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
};

export default StudyTimeAllocation;