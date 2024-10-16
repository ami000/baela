import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, LayoutChangeEvent, TouchableWithoutFeedback } from 'react-native';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/src/constants/themeContext';
import SliderImage from "@/src/assets/light/Slider.png"

const marks = [
    { value: 525, label: 'GOOD' },
    { value: 585, label: 'AVERAGE' },
    { value: 645, label: 'EXPERT' },
    { value: 685, label: 'EXPERT+' },
    { value: 805, label: '' },
];

interface Props {
    value: number;
    onChange: (value: number) => void;
}

const RatingComponent: React.FC<Props> = ({ value, onChange }) => {
    const [width, setWidth] = useState<number>(0);
    const [percentVal, setPercentVal] = useState<any>({})
    const { theme } = useTheme();

    const [thumbPosition, setThumbPosition] = useState(0);
    const [sliderWidth, setSliderWidth] = useState(0);

    // Capture the width of the slider
    const handleSliderLayout = (event: LayoutChangeEvent) => {
        setSliderWidth(event.nativeEvent.layout.width);
    };
    const updateThumbPosition = (sliderValue: number) => {
        // if (sliderWidth > 0) {
        //     const position = (sliderValue / (marks[marks.length - 1].value - marks[0].value)) * sliderWidth;
        //     setThumbPosition(position);
        // }
        onChange(sliderValue);
    };

    const colors = ['#FF4500', '#FFA500', '#FFD700', '#32CD32'];

    const handleLayout = (event: LayoutChangeEvent) => {
        setWidth(event.nativeEvent.layout.width);
    };

    const getPosition = (markValue: number) => {
        return ((markValue - marks[0].value) / (marks[marks.length - 1].value - marks[0].value)) * 100;
    };

    const getColorIndex = (value: number) => {
        for (let i = 0; i < marks.length - 1; i++) {
            if (value <= marks[i + 1].value) {
                return i;
            }
        }
        return colors.length - 1;
    };

    const onLayout = (event: any, mark: any) => {
        const { width } = event.nativeEvent.layout;
        setPercentVal((prev: any) => ({ ...prev, [mark.label]: width / 2 }))
    };

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: 80,
            justifyContent: 'center',
            marginTop: 20
        },
        trackOnly: {
            backgroundColor: "white",
            height: 22,
            borderRadius: 5,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            position: 'absolute',
            top: 0,
            width: "100%"
        },
        sliderContainer: {
            height: 40,
            justifyContent: 'center',
            width: "100%"
        },
        track: {
            height: 22,
            borderRadius: 5,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            position: 'absolute',
            top: 0,
        },
        slider: {
            width: sliderWidth + 30,
            height: 80,
            top: -10,
            marginLeft: -15
        },
        labelsContainer: {
            position: 'absolute',
            width: '100%',
            height: 40,
        },
        labelContainer: {
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            transform: [{ translateY: -10 }], // Adjust based on your label width
        },
        label: {
            color: '#6B7280',
            fontSize: 10,
            // fontWeight: 'bold',
        },
        marksContainer: {
            flexDirection: 'row',
            position: 'absolute',
            width: '100%',
            top: 40,
        },
        markContainer: {
            alignItems: 'center',
            position: 'absolute',
            transform: [{ translateX: -8 }], // Center the mark
        },
        mark: {
            width: 2,
            height: 15,
            backgroundColor: '#FAFAFA',
        },
        markLabel: {
            color: theme.secondaryText,
            fontSize: 10,
        },
        customThumb: {
            width: 10,
            height: 10,
            backgroundColor: "blue"
        },
        thumbInner: {},
    });

    return (
        <View style={styles.container}>
            <View style={styles.sliderContainer} onLayout={handleLayout}>
                <View style={styles.trackOnly} onLayout={handleSliderLayout}>
                    <LinearGradient
                        colors={[colors[getColorIndex(value)], colors[getColorIndex(value) + 1] || colors[getColorIndex(value)]]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.track, { width: `${((value - marks[0].value) / (marks[marks.length - 1].value - marks[0].value)) * 100}%` }]}
                    />
                </View>

                <View style={styles.labelsContainer}>
                    {marks.slice(0, -1).map((mark, index) => {
                        const position = ((((mark.value + marks?.[index + 1]?.value) / 2) - marks[0].value) / (marks[marks.length - 1].value - marks[0].value)) * 100;
                        const fieldWidth = ((marks?.[index + 1]?.value - mark.value) / (marks[marks.length - 1].value - marks[0].value)) * 100
                        return (
                            <View key={index}
                                onLayout={(e) => onLayout(e, mark)}
                                style={[
                                    styles.labelContainer,
                                    {
                                        left: `${position}%`,
                                        width: `${fieldWidth}%`,
                                        transform: [{ translateX: -(percentVal?.[mark.label] || 0) }, { translateY: -10 }]
                                    }
                                ]}>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={styles.label}>{mark.label}</Text>
                            </View>
                        )
                    })}
                </View>

                <Slider
                    style={styles.slider}
                    minimumValue={marks[0].value}
                    maximumValue={marks[marks.length - 1].value}
                    value={value}
                    step={10}
                    onValueChange={updateThumbPosition}
                    // minimumTrackTintColor="blue"
                    // maximumTrackTintColor="blue"
                    minimumTrackTintColor="transparent"
                    maximumTrackTintColor="transparent"
                    thumbTintColor={theme.primeColor}
                    vertical={true}
                    thumbImage={SliderImage}

                />
                {/* </TouchableWithoutFeedback> */}
            </View>
            <View style={styles.marksContainer}>
                {marks.map((mark, index) => (
                    <View key={index} style={[
                        styles.markContainer,
                        { left: `${getPosition(mark.value)}%` }
                    ]}>
                        <View style={styles.mark} />
                        <Text style={styles.markLabel}>{mark.value}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default RatingComponent;