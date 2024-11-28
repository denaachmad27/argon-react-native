import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CreateUserScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create User</Text>
            <Text>Ini adalah halaman untuk membuat pengguna baru.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        marginBottom: 24,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
