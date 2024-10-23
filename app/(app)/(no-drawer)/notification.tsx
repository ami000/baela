import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Switch,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/constants/themeContext';
import AppButton from '@/src/components/appButton';
import ToggleSwitch from '@/src/components/toggleSwitch';

interface NotificationSettingsProps {
    onBack?: () => void;
    onSave?: (settings: { studyTimeAlert: boolean }) => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({
    onBack,
    onSave,
}) => {
    const [studyTimeAlert, setStudyTimeAlert] = useState(false);
    const { theme } = useTheme();

    const handleSave = () => {
        onSave?.({ studyTimeAlert });
    };

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
                    <ToggleSwitch onToggle={setStudyTimeAlert} value={studyTimeAlert} />
                </View>
            </View>

            <AppButton label='Save Changes' onPress={handleSave} />
        </SafeAreaView>
    );
};

export default NotificationSettings;