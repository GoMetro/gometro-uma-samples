import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const StartupScreen = () => (
    <View style={ styles.container }>
        <ActivityIndicator color={"#000"}/>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default StartupScreen;