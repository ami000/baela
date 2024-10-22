import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/src/constants/themeContext';
import { LineChart } from 'react-native-gifted-charts';

const TimeManagementChart: React.FC = () => {
    const { theme } = useTheme();
    const { width } = Dimensions.get('window');
    const colors = ['#63ABFD', '#EF884A', '#A155B9', 'green']
    const data = [
        {
            data: [
                { value: 30 },
                { value: 40 },
                { value: 25 },
                { value: 50 },
                { value: 15 },
                { value: 25 },
            ],
        },
        {
            data: [
                { value: 50 },
                { value: 20 },
                { value: 60 },
                { value: 30 },
                { value: 45 },
                { value: 40 },
            ],
        },
        {
            data: [
                { value: 20 },
                { value: 60 },
                { value: 35 },
                { value: 20 },
                { value: 40 },
                { value: 55 },
            ],
        },
    ];

    const styles = StyleSheet.create({
        container: {
            padding: 20,
            borderRadius: 10,
            backgroundColor: theme.backgroundColor2,
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
            fontSize: 18,
            fontWeight: 'bold',
            color: theme.textColor1,
            marginBottom: 10,
        },
        legendContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
        },
        legendItem: {
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 15,
        },
        legendColor: {
            width: 10,
            height: 10,
            borderRadius: 5,
            marginRight: 5,
        },
        legendText: {
            color: '#888',
            fontSize: 12,
        },
    });

    return (
        <View
            style={styles.container}
        >
            <Text style={styles.title}>Section-wise Time Management Trend</Text>
            <View style={styles.legendContainer}>
                {['Series 1', 'Series 1', 'Series 1'].map((series, index) => (
                    <View key={index} style={styles.legendItem}>
                        <View style={[styles.legendColor, { backgroundColor: colors[index] }]} />
                        <Text style={styles.legendText}>{series}</Text>
                    </View>
                ))}
            </View>
            <LineChart
                curved
                data={data[0].data}
                data2={data[1].data}
                data4={data[2].data}
                data3={[]}
                height={200}
                width={width - 120}
                noOfSections={5}
                initialSpacing={5}
                endSpacing={0}
                spacing={((width - 120) / (data.length + 2)) - data.length}
                yAxisTextStyle={{ color: theme.textColor1 }}
                xAxisLabelTextStyle={{ color: theme.textColor1 }}
                xAxisLabelTexts={['W1', 'W2', 'W3', 'W4', 'W5', 'W6']}
                hideOrigin
                color3={colors[3]}
                color2={colors[2]}
                color1={colors[1]}
                color={colors[0]}
                yAxisLabelWidth={40}
                hideDataPoints
                hideRules
                showVerticalLines
                verticalLinesColor={theme.graphLines}
                xAxisColor={theme.graphLines}
                yAxisColor={theme.backgroundColor2}
            />
        </View>
    );
};

export default TimeManagementChart;