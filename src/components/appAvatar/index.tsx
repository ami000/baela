import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

interface IProps {
    name: string;
    onClick?: () => void;
    style?: any
}

const AppAvatar: React.FC<IProps> = ({ name, onClick, style }) => {
    if (!name) name = "";

    const stringToColor = (string: string) => {
        let hash = 0;
        for (let i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = "#";
        for (let i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        return color;
    };

    const stringAvatar = (name: string) => {
        const initials = name.split(" ")?.length > 1
            ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
            : `${name[0]}`;
        return {
            color: stringToColor(name),
            initials: initials.toUpperCase(),
        };
    };

    const { color, initials } = stringAvatar(name);

    return (
        <TouchableOpacity onPress={onClick} style={[styles.avatar, style ? style : {}, { backgroundColor: color }]}>
            <Text style={styles.text}>{initials}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default AppAvatar;
