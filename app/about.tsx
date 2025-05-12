import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function AboutPage() {
    return (
        <View style={styles.container}>
            <Text style={styles.textBold}>מיפוי פשיעה בישראל</Text>
            <Text>מאת קובי קרסנוב</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    textBold: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});