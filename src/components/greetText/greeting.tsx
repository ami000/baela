import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const Greeting = () => {
    const userDetail = useSelector((state: any) => state?.userDetails?.userDetails);
    const { userName } = userDetail;

    const styles = StyleSheet.create({
        greetingText: {
            color: "#000", // Replace with your custom color variable, if needed
            fontWeight: "400",
            fontSize: 20, // Adjusted for mobile readability
        },
    });

    const getGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            return "Good Morning";
        } else if (currentHour < 18) {
            return "Good Afternoon";
        } else {
            return "Good Evening";
        }
    };

    return (
        <Text style={styles.greetingText}>
            {getGreeting()} {userName}!
        </Text>
    );
};


export default Greeting;
