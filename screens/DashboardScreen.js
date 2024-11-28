import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function DashboardScreen() {
    const navigation = useNavigation();
    const [username, setUsername] = useState(""); // State untuk menyimpan username

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    // Fungsi untuk mengambil data dari AsyncStorage
    const getUserData = async () => {
        try {
            const storedUsername = await AsyncStorage.getItem("username");
            if (storedUsername) {
                setUsername(storedUsername);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        getUserData(); // Ambil data dari AsyncStorage saat komponen dirender pertama kali
    }, []);

    const handleLogout = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.get(`${apiUrl}/auth/logout`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
                withCredentials: true,
            });

            if (response.status === 200) {
                console.log("Logout berhasil");
                await AsyncStorage.removeItem("token"); // Hapus token dari AsyncStorage
                Alert.alert("Logout", "Anda telah berhasil logout.", [
                    { text: "OK", onPress: () => navigation.navigate("Login") },
                ]);
            } else {
                console.log("Logout gagal");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Ada masalah saat logout.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            {/* Tampilkan username yang disimpan */}
            <Text style={styles.welcomeText}>Selamat datang, {username}!</Text>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 28,
        marginBottom: 24,
        textAlign: "center",
        fontWeight: "bold",
    },
    welcomeText: {
        fontSize: 18,
        marginBottom: 16,
        textAlign: "center",
        color: "#333",
    },
    logoutButton: {
        backgroundColor: "#10B981",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
    },
});
