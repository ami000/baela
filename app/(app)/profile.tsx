import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import AppAvatar from '@/src/components/appAvatar';
import { useTheme } from '@/src/constants/themeContext';
import { router } from 'expo-router';
import { logout } from '@/src/redux/Reducer/userReducer';

interface ProfileOption {
    title: string;
    onPress: () => void;
}

interface ProfileScreenProps {
    // name: string;
    // email: string;
    // onMenuPress?: () => void;
    // onNotificationPress?: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ }) => {
    const userDetails = useSelector(
        (state: any) => state?.userDetails?.userDetails
    );
    const dispatch = useDispatch();
    const { theme } = useTheme();
    const { nickName: name, email } = userDetails;
    const profileOptions: ProfileOption[] = [
        {
            title: 'Exam Setup',
            onPress: () => router.push("/(app)/(no-drawer)/exam-setup"),
        },
        {
            title: 'Notifications',
            onPress: () => router.push("/(app)/(no-drawer)/notification"),
        },
        {
            title: 'Logout',
            onPress: () => {
                dispatch(logout())
                router.navigate("/(auth)/signin")
            },
        },
    ];

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.backgroundColor3,
            padding: 20,
            gap: 20
        },
        avatarSmall: {
            width: 60,
            height: 60,
            borderRadius: 50,
            marginLeft: 20
        },
        avatarTextSmall: {
            fontSize: 24,
            fontWeight: '600',
        },
        profileInfo: {
            alignItems: 'center',
            paddingVertical: 24,
            flexDirection: "row",
            gap: 20,
            borderRadius: 10,
            backgroundColor: theme.backgroundColor2
        },
        avatarTextLarge: {
            fontSize: 32,
            fontWeight: '600',
            color: '#FF6B00',
        },
        name: {
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 4,
            color: theme.textColor1
        },
        email: {
            fontSize: 14,
            color: theme.placeholder,
        },
        optionsList: {
            paddingHorizontal: 16,
            backgroundColor: theme.backgroundColor2,
            borderRadius: 10
        },
        optionItem: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 20,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
        },
        optionText: {
            fontSize: 16,
            color: theme.textColor1,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Profile Info */}
            <View style={styles.profileInfo}>
                <AppAvatar name={name} style={styles.avatarSmall} textStyle={styles.avatarTextSmall} />
                <View >
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.email}>{email}</Text>
                </View>
            </View>

            {/* Options List */}
            <View style={styles.optionsList}>
                {profileOptions.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.optionItem, ...(index === profileOptions.length - 1 ? [{ borderBottomWidth: 0 }] : [])]}
                        onPress={option.onPress}
                    >
                        <Text style={styles.optionText}>{option.title}</Text>
                        <Ionicons name="chevron-forward" size={20} color={theme.textColor1} />
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
};

export default ProfileScreen;
