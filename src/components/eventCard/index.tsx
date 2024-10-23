import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface IEventCardProps {
    title: string;
    color: {
        lightShade: string;
        darkShade: string;
    };
}

const EventCard: React.FC<IEventCardProps> = ({ title, color }) => {
    return (
        <View style={[styles.card, { backgroundColor: color?.lightShade }]}>
            <View style={[styles.leftBar, { backgroundColor: color?.darkShade }]} />
            <Text style={[styles.title, { color: color?.darkShade }]} numberOfLines={1}>
                {title}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
        position: 'relative',
        filter: 'brightness(1)', // Note: Not applicable in RN, but keeping it here if there's a future need to add a shadow or similar.
    } as ViewStyle,
    leftBar: {
        position: 'absolute',
        left: 0,
        height: '60%',
        width: 2,
        marginLeft: 10,
        borderRadius: 2,
    } as ViewStyle,
    title: {
        flexGrow: 1,
        fontSize: 14,
        marginLeft: 10,
        fontWeight: '500',
        whiteSpace: 'nowrap', // RN handles text overflow differently.
        overflow: 'hidden',
        textOverflow: 'ellipsis', // 'numberOfLines' in RN truncates text.
    } as TextStyle,
});

export default EventCard;
