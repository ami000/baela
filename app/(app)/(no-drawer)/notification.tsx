import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Switch,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import { useTheme } from '@/src/constants/themeContext';
import AppButton from '@/src/components/appButton';
import ToggleSwitch from '@/src/components/toggleSwitch';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { subscribe } from '@/src/utils/helper';
import { router } from 'expo-router';

// Configure how notifications should appear when the app is in the foreground
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

interface NotificationSettingsProps { }

const NotificationSettings: React.FC<NotificationSettingsProps> = () => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [expoPushToken, setExpoPushToken] = useState<string | undefined>();
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.backgroundColor3,
            padding: 20,
            paddingTop: 0
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 12,
        },
        headerTitle: {
            color: theme.textColor1,
            fontSize: 20,
            fontWeight: '600',
        },
        content: {
            flex: 1,
        },
        settingItem: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 16,
        },
        settingTextContainer: {
            flex: 1,
            marginRight: 16,
        },
        settingTitle: {
            color: theme.textColor1,
            fontSize: 16,
            fontWeight: '500',
            marginBottom: 4,
        },
        settingDescription: {
            color: theme.mailText,
            fontSize: 14,
        },
        saveButton: {
            margin: "auto",
            marginVertical: 20,
            width: "80%"
        }
    });


    async function registerForPushNotifications() {
        let token;

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }

            token = (await Notifications.getExpoPushTokenAsync({
                projectId: 'your-project-id', // Get this from your Expo project
            })).data;
        } else {
            setIsSubscribed(false)
            alert('Must use physical device for Push Notifications');
        }

        return token;
    }

    useEffect(() => {
        // Check if already subscribed
        checkSubscriptionStatus();
    }, []);

    const checkSubscriptionStatus = async () => {
        try {
            const token = await Notifications.getExpoPushTokenAsync({
                projectId: 'your-project-id',
            });
            if (token) {
                setExpoPushToken(token.data);
                setIsSubscribed(true);
            }
        } catch (error) {
            console.error('Error checking subscription status:', error);
        }
    };

    const subscribeUser = async (): Promise<void> => {
        setLoading(true);
        try {
            const token = await registerForPushNotifications();
            if (token) {
                setExpoPushToken(token);
                setIsSubscribed(true);

                // Send the token to your server
                await subscribe({
                    endpoint: token,
                    // Add any additional data your server needs
                });
            }
        } catch (error) {
            console.error('Error subscribing to notifications:', error);
            alert('Failed to subscribe to notifications');
            setIsSubscribed(false)
        }
        setLoading(false);
    };

    const unsubscribeUser = async (): Promise<void> => {
        try {
            if (expoPushToken) {
                // Remove token from server
                await removeSubscriptionFromServer(expoPushToken);

                // Remove permissions locally
                await Notifications.unregisterForNotificationsAsync();

                setIsSubscribed(false);
                setExpoPushToken(undefined);
            }
        } catch (error) {
            console.error('Error unsubscribing from notifications:', error);
            alert('Failed to unsubscribe from notifications');
            setIsSubscribed(true);
        }
    };

    const removeSubscriptionFromServer = async (token: string): Promise<void> => {
        // Implement the logic to remove the token from your server
    };


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Notification</Text>
            </View>

            {/* Content */}
            <View style={styles.content}>
                <View style={styles.settingItem}>
                    <View style={styles.settingTextContainer}>
                        <Text style={styles.settingTitle}>Study Time Alert</Text>
                        <Text style={styles.settingDescription}>
                            Here is supposed to state the reason why we need this copy!
                        </Text>
                    </View>
                    <ToggleSwitch onToggle={(val: boolean) => {
                        setIsSubscribed(val);
                        if (val) subscribeUser();
                        else unsubscribeUser();
                    }} value={isSubscribed} loading={loading} />
                </View>
            </View>

            <AppButton label='Save Changes' onPress={() => router.push("/(app)/profile")} />
        </SafeAreaView>
    );
};

export default NotificationSettings;