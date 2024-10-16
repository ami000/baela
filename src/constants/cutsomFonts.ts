import { Platform } from 'react-native';

export const customFonts = {
    fontFamily: Platform.select({
        ios: '-apple-system, BlinkMacSystemFont, "Helvetica Neue"',
        android: 'Roboto, "Droid Sans"',
        default: '"Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", sans-serif',
    }),
};