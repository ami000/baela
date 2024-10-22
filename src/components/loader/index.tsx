import React, { useRef, useState, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Logo1, Logo2, Logo3, Logo4 } from './svgs';

type LoaderProps = {
    open: boolean;
    progress?: boolean;
    progressPercent?: number;
};

export const Loader: React.FC<LoaderProps> = ({
    open,
    progress = false,
    progressPercent = 0,
}) => {
    const isDarkMode = useSelector((state: any) => state?.settings?.darkMode);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [currentSvgIndex, setCurrentSvgIndex] = useState(0);
    const progressAnim = useRef(new Animated.Value(0)).current;

    const color = isDarkMode ? '#FCAC63' : '#74BAD3';

    const svgs = [
        { component: Logo1, interval: 500 },
        { component: Logo2, interval: 750 },
        { component: Logo1, interval: 500 },
        { component: Logo3, interval: 750 },
        { component: Logo1, interval: 500 },
        { component: Logo4, interval: 750 },
    ];

    useEffect(() => {
        if (open) {
            intervalRef.current = setInterval(() => {
                setCurrentSvgIndex((prevIndex) => (prevIndex + 1) % svgs.length);
            }, svgs[(currentSvgIndex + 1) % svgs.length].interval);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [open, currentSvgIndex]);

    useEffect(() => {
        Animated.timing(progressAnim, {
            toValue: progressPercent,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [progressPercent]);

    if (!open) return null;

    const CurrentLogo = svgs[currentSvgIndex].component;

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <CurrentLogo color={color} />
                {progress && (
                    <View style={styles.progressContainer}>
                        <View style={styles.progressBackground}>
                            <Animated.View
                                style={[
                                    styles.progressBar,
                                    {
                                        width: progressAnim.interpolate({
                                            inputRange: [0, 100],
                                            outputRange: ['0%', '100%'],
                                        }),
                                        backgroundColor: color,
                                    },
                                ]}
                            />
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    logoContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -125 }, { translateY: -125 }],
        height: 250,
        width: 250,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    progressContainer: {
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    progressBackground: {
        height: 5,
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: 5,
    },
});