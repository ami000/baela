import { StyleSheet } from "react-native";

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export const appColors = {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};

export const appStyles = StyleSheet.create({
    lightContainer: {
        flexGrow: 1,
        backgroundColor: 'var(--background-color)', // You'll need to implement a theming system
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: 20,
    },
    image: {
        width: 150,
        height: 150,
        marginHorizontal: 10,
    },
    bottomRightImage: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 100,
        height: 100,
    },
});
