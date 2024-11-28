import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
    Alert,
} from "react-native";
import axios from "axios";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RequestProcessScreen({ navigation }) {
    const [processData, setProcessData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    // Fetch completed data from API
    const fetchprocessData = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.get(`${apiUrl}/process`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
                withCredentials: true,
            });
            setProcessData(response.data.data);
            console.log(
                "Event id: ",
                response.data.data[0].events.map((event) => event.id)
            );
            //   console.log(response.data[0].start_events.map((event) => event.id));
        } catch (error) {
            console.error("Error fetching completed data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchprocessData();
    }, []);

    // Handle refresh event
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchprocessData().then(() => setRefreshing(false));
    }, []);

    // Handle card press
    const handleCardPress = async (id, node_id) => {
        try {
            token = await AsyncStorage.getItem("token");
            const response = await axios.post(
                `${apiUrl}/api/process`,
                {
                    id: id,
                    event: node_id,
                },
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                    withCredentials: true,
                }
            );
            if (response.status) {
                Alert.alert("Success", "Process updated successfully!");
            } else {
                Alert.alert("Error", "Failed to update process.");
            }
        } catch (error) {
            console.error("Error updating process:", error);
            Alert.alert("Error", "There was an error updating the process.");
        }
    };

    // Render each card
    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => handleCardPress(item.id, item.events[0].id)}
        >
            <View style={styles.itemContainer}>
                <View style={styles.header}>
                    <Text style={styles.itemTitle}>Start {item.name} Process</Text>
                    {item.status.toLowerCase() === "completed" && (
                        <View style={styles.statusLabel}>
                            <Text style={styles.statusLabelText}>COMPLETED</Text>
                        </View>
                    )}
                </View>
                <Text style={styles.itemText}>
                    <Text style={styles.label}>Process request id: </Text>
                    {item.id}
                </Text>
                <Text style={styles.itemText}>
                    <Text style={styles.label}>Event id: </Text>
                    {item.events[0].id}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Requests Process</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#10B981" />
            ) : (
                <FlatList
                    data={processData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={["#10B981"]}
                            tintColor="#10B981"
                        />
                    }
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F1F5F9",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 20,
        color: "#1F2937",
    },
    listContainer: {
        paddingHorizontal: 16,
    },
    itemContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#111827",
    },
    statusLabel: {
        backgroundColor: "#10B981",
        borderRadius: 5,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    statusLabelText: {
        color: "#FFFFFF",
        fontSize: 12,
    },
    itemText: {
        fontSize: 16,
        color: "#6B7280",
        marginBottom: 4,
    },
    label: {
        fontWeight: "bold",
        color: "#4B5563",
    },
});
