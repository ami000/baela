import React, { useState, useEffect, useMemo, memo } from 'react';
import { Text, Animated, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface TypewriterProps {
    text?: string;
    speed?: number;
    children?: string;
    style?: ViewStyle | TextStyle;
    index: number;
    currIndex?: number;
    onComplete?: () => void;
}

const Typewriter: React.FC<TypewriterProps> = memo(({
    text,
    speed = 10,
    children,
    style,
    index,
    currIndex,
    onComplete
}) => {
    const [displayedText, setDisplayedText] = useState(
        (index || index === 0) && (currIndex || currIndex === 0) && index < currIndex ? text || children : ''
    );
    const [isTypingComplete, setIsTypingComplete] = useState(
        (index || index === 0) && (currIndex || currIndex === 0) && index < currIndex
    );
    const [status, setStatus] = useState(
        (index || index === 0) && (currIndex || currIndex === 0) && index <= currIndex ? "processed" : "wait"
    );

    const rendered: string = useMemo(() => text || children || "", [text, children]);

    const blinkAnim = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (index === currIndex) {
            setStatus("processed");
            let ind = 0;
            const interval = setInterval(() => {
                setDisplayedText((prev) => rendered.slice(0, ind + 1));
                ind += 1;
                if (ind === rendered.length) {
                    clearInterval(interval);
                    setIsTypingComplete(true);
                    onComplete && onComplete();
                }
            }, speed);

            return () => clearInterval(interval);
        }
    }, [text, speed, currIndex, index, status, rendered, onComplete]);

    useEffect(() => {
        if (!isTypingComplete) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(blinkAnim, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: false,
                    }),
                    Animated.timing(blinkAnim, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: false,
                    }),
                ])
            ).start();
        } else {
            blinkAnim.setValue(0);
        }
    }, [isTypingComplete, blinkAnim]);

    if (status !== "processed") {
        return null;
    }

    return (
        <Text style={[styles.typewriter, style]}>
            {displayedText}
            {!isTypingComplete && (
                <Animated.View
                    style={[
                        styles.cursor,
                        {
                            opacity: blinkAnim,
                        },
                    ]}
                />
            )}
        </Text>
    );
});

const SequentialTypeWriter = (props?: any) => {
    const [index, setIndex] = useState(0);
    return (args: TypewriterProps) => {
        return (
            <Typewriter
                {...args}
                onComplete={() => {
                    if (props?.setIndex) {
                        props?.setIndex((prev: number) => prev + 1);
                    } else {
                        setIndex((prev) => prev + 1);
                    }
                }}
                currIndex={props?.index !== undefined ? props?.index : index}
            />
        );
    };
};

const styles = StyleSheet.create({
    typewriter: {
    },
    cursor: {
        width: 2,
        height: 20,
        backgroundColor: 'black',
        marginLeft: 2,
    },
});

export { Typewriter, SequentialTypeWriter };