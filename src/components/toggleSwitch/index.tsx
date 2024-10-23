import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import { useTheme } from '@/src/constants/themeContext'; // Assuming you have a theme context

interface IProps {
    className?: string;
    loading?: boolean;
    onToggle: (value: boolean) => void;
    value: boolean; // Current switch value (true for on, false for off)
    style?: any;
}

const ToggleSwitch: React.FC<IProps> = ({ className, loading, onToggle, value, style }) => {
    const { theme } = useTheme();
    const [isOn, setIsOn] = useState(value);

    const handleToggle = () => {
        if (!loading) {
            setIsOn(!isOn);
            onToggle(!isOn);
        }
    };

    return (
        <TouchableOpacity
            style={[styles.switch, isOn ? styles.switchOn : styles.switchOff, style]}
            onPress={handleToggle}
            disabled={loading}
        >
            {loading ? (
                <ActivityIndicator style={styles.loader} size="small" color={theme.primeColor} />
            ) : (
                <View style={isOn ? styles.circleOn : styles.circleOff} />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    switch: {
        width: 42,
        height: 26,
        borderRadius: 13,
        padding: 2,
        justifyContent: 'center',
    },
    switchOn: {
        backgroundColor: '#FF7F50', // Customize this to your theme's primary color
    },
    switchOff: {
        backgroundColor: '#E9E9EA',
    },
    circleOn: {
        width: 22,
        height: 22,
        backgroundColor: '#fff',
        borderRadius: 11,
        alignSelf: 'flex-end',
    },
    circleOff: {
        width: 22,
        height: 22,
        backgroundColor: '#fff',
        borderRadius: 11,
        alignSelf: 'flex-start',
    },
    loader: {
        alignSelf: 'center',
    },
});

export default ToggleSwitch;
