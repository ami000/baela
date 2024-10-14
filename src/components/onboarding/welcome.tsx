import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SequentialTypeWriter } from '../typewriter';
import { updateUserData } from '@/src/redux/Reducer/userReducer';
import AppButton from '../appButton';
import AppAvatar from '../appAvatar';

interface IProps {
    onNext: () => void;
}

const Welcome: React.FC<IProps> = ({ onNext }) => {
    console.log("rendering")
    const userDetail = useSelector((state: any) => state?.userDetails?.userDetails);
    const [nameValue, setNameValue] = useState<string>(userDetail?.nickName || '');
    const [gotName, setGotName] = useState<boolean>(false);
    const inputRef = useRef<TextInput>(null);
    const dispatch = useDispatch();

    const handleInput = (text: string) => {
        setNameValue(text);
        if (gotName) {
            dispatch(updateUserData({ nickName: text }));
        }
    };

    const handleSubmitEditing = () => {
        setGotName(true);
        dispatch(updateUserData({ nickName: nameValue }));
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const [index, setIndex] = useState(0);

    const Typewriter = SequentialTypeWriter({ index, setIndex });

    return (
        <View style={styles.welcomeContainer}>
            <View style={styles.questionContainer}>
                <Typewriter index={0} style={styles.question}>
                    Hello I'm PiBi
                </Typewriter>
                <Typewriter index={1} style={styles.hint}>
                    I'm a next generation AI assistant, here to help you ace your competitive exams.
                </Typewriter>
                <Typewriter index={2} style={styles.hint}>
                    Together, we'll cover important topics, review your progress, and ensure you're fully prepared.
                </Typewriter>
                <Typewriter index={3} style={styles.hint}>
                    Let's get started and make your study journey both effective and fun!
                </Typewriter>
                <Typewriter index={4} style={styles.hint}>
                    I'd love for us to get to know each other a bit better.
                </Typewriter>
            </View>
            <View style={styles.nameContainer}>
                <AppAvatar name="Unknown user" />
                <View style={styles.inputContainer}>
                    <Typewriter index={5} style={styles.greet}>
                        Nice to meet you, I'm
                    </Typewriter>
                    {index > 5 && (
                        <TextInput
                            ref={inputRef}
                            style={styles.inputName}
                            value={nameValue}
                            onChangeText={handleInput}
                            onSubmitEditing={handleSubmitEditing}
                        />
                    )}
                </View>
            </View>
            {gotName && (
                <View style={styles.questionContainer}>
                    <Typewriter index={6} style={styles.question}>
                        {`Lovely to meet you ${nameValue}`}
                    </Typewriter>
                    <Typewriter index={7} style={styles.hint}>
                        Few things to know before we starting together
                    </Typewriter>
                </View>
            )}
            {gotName && (
                <AppButton
                    style={styles.welcomeBtn}
                    label="Acknowledge & Continue"
                    onPress={onNext}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    welcomeContainer: {
        // flex: 1,
        // flexDirection: 'column',
        // gap: 10,
    },
    questionContainer: {
        marginBottom: 10,
    },
    question: {
        fontWeight: '600',
        fontSize: 22,
    },
    hint: {
        color: '#6B7280', // Equivalent to var(--gray-500)
        fontWeight: '400',
        fontSize: 16,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 10,
        backgroundColor: '#F3F4F6', // Equivalent to var(--background-color-3)
        borderRadius: 10,
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        gap: 5,
    },
    greet: {
        color: '#6B7280', // Equivalent to var(--gray-500)
        fontWeight: '400',
        fontSize: 14,
        marginLeft: 5,
    },
    inputName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1F2937', // Equivalent to var(--text-color-1)
        borderWidth: 0,
        minHeight: 30,
        width: '100%',
        padding: 5,
    },
    welcomeBtn: {
        alignSelf: 'flex-start',
    },
});

export default Welcome;