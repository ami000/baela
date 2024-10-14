import React, { FC } from 'react';
import { Checkbox as PaperCheckbox } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

interface ICheckboxProps {
    checked?: boolean;
    onPress: () => void;
}

const AppCheckbox: FC<ICheckboxProps> = ({ checked = false, onPress }) => {
    return (
        <View style={styles.container}>
            <PaperCheckbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={onPress}
                color="#FF7F50"
                uncheckedColor="#FF7F50"
            />
        </View>
    );
};

export default AppCheckbox;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
