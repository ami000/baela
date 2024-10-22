import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Polygon, Line, Text as SvgText, Circle } from 'react-native-svg';
import { useTheme } from '@/src/constants/themeContext';

interface DataPoint {
    label: string;
    value: number | null;
}

interface AvgAccuracyByQuestionTypeProps {
}

const AvgAccuracyByQuestionType: React.FC<AvgAccuracyByQuestionTypeProps> = () => {
    const { theme } = useTheme();
    const { width } = Dimensions.get('window');
    const size = width - 60;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.4;
    const data = [
        { label: 'Official GMAT', value: 80 },
        { label: 'Target Test Prep', value: 60 },
        { label: 'eGMAT', value: 100 },
    ];

    const maxValue = Math.max(...data.map(item => item.value ?? 0));

    const scaleFactor = Math.ceil(maxValue / 100) * 100;

    const getPoint = (angle: number, value: number): string => {
        const normalizedValue = value / scaleFactor;
        const x = centerX + radius * Math.cos(angle) * normalizedValue;
        const y = centerY + radius * Math.sin(angle) * normalizedValue;
        return `${x},${y}`;
    };

    const angles = data.map((_, i) => (i * 2 * Math.PI) / data.length - Math.PI / 2);
    const points = angles.map((angle, i) => {
        const value = data[i].value !== null ? data[i].value! : 0;
        return getPoint(angle, value);
    });
    const axisPoints = angles.map(angle => getPoint(angle, scaleFactor));

    const scaleLines = [0.25, 0.5, 0.75, 1].map(fraction => scaleFactor * fraction);

    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
    };

    
    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.backgroundColor2,
            borderRadius: 10,
            padding: 20,
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
        title: {
            color: theme.textColor1,
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 20,
        },
        legend: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        legendItem: {
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 10,
        },
        legendColor: {
            width: 10,
            height: 10,
            marginRight: 5,
        },
        legendText: {
            color: theme.textColor1,
            fontSize: 12,
        },
        eachCont: {
            width: "100%",
        },
        graphCont: {
            width: "100%",
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.eachCont} >
                <Text style={styles.title}>Avg. Accuracy by Question Type</Text>
            </View>
            <View style={styles.graphCont} >
                <Svg width={size} height={size}>
                    {/* Background lines */}
                    {scaleLines.map((v, i) => (
                        <Polygon
                            key={i}
                            points={angles.map(angle => getPoint(angle, v)).join(' ')}
                            fill="none"
                            stroke={theme.graphLines}
                            strokeWidth="1"
                        />
                    ))}

                    {/* Axis lines */}
                    {axisPoints.map((point, i) => (
                        <Line
                            key={i}
                            x1={centerX}
                            y1={centerY}
                            x2={point.split(',')[0]}
                            y2={point.split(',')[1]}
                            stroke={theme.graphLines}
                            strokeWidth="1"
                        />
                    ))}

                    {/* Data polygon */}
                    <Polygon
                        points={points.join(' ')}
                        fill={theme.primeColor}
                        fillOpacity="0.5"
                        stroke={theme.primeColor}
                        strokeWidth="2"
                    />

                    {/* Labels */}
                    {data.map((item, i) => {
                        const [x, y] = axisPoints[i].split(',');
                        const maxLabelLength = 15;
                        return (
                            <SvgText
                                key={i}
                                x={x}
                                y={y}
                                fill={theme.textColor1}
                                fontSize="12"
                                textAnchor="middle"
                                alignmentBaseline="middle"
                                dx={parseFloat(x) > centerX ? 20 : parseFloat(x) < centerX ? -20 : 0}
                                dy={parseFloat(y) > centerY ? 20 : parseFloat(y) < centerY ? -20 : 0}
                            >
                                {truncateText(item.label, maxLabelLength)}
                            </SvgText>
                        );
                    })}

                    {/* Data points */}
                    {points.map((point, i) => {
                        const [x, y] = point.split(',');
                        return (
                            <React.Fragment key={i}>
                                <Circle
                                    cx={x}
                                    cy={y}
                                    r="4"
                                    fill={data[i].value !== null ? theme.primeColor : theme.backgroundColor2}
                                    stroke={theme.primeColor}
                                    strokeWidth="2"
                                />
                                {data[i].value !== null && (
                                    <SvgText
                                        x={x}
                                        y={y}
                                        fill={theme.textColor1}
                                        fontSize="10"
                                        textAnchor="middle"
                                        alignmentBaseline="middle"
                                        dy={-10}
                                    >
                                        {data[i].value}
                                    </SvgText>
                                )}
                            </React.Fragment>
                        );
                    })}

                    {/* Scale labels */}
                    {scaleLines.map((value, index) => (
                        <SvgText
                            key={index}
                            x={centerX}
                            y={centerY - (radius * (index + 1) / 4)}
                            fill={theme.textColor1}
                            fontSize="10"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                        >
                            {value}
                        </SvgText>
                    ))}
                </Svg>

                <View style={styles.legend}>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendColor, { backgroundColor: theme.primeColor }]} />
                        <Text style={styles.legendText}>Accuracy</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default AvgAccuracyByQuestionType;