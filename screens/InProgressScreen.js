import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import axios from "axios";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CompletedScreen() {
    const [completedData, setCompletedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const fetchCompletedData = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.get(
                `${apiUrl}/requests/getByType?type=in_progress`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                    withCredentials: true,
                }
            ); // Sesuaikan URL API kamu
            setCompletedData(response.data.data);
        } catch (error) {
            console.error("Error fetching completed data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompletedData().then(() => {});
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchCompletedData().then(() => setRefreshing(false));
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.header}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                {/* Pastikan kondisi status benar */}
                {item.status.toLowerCase() === "active" && (
                    <View style={styles.statusLabel}>
                        <Text style={styles.statusLabelText}>Active</Text>
                    </View>
                )}
            </View>
            <Text style={styles.itemText}>
                <Text style={styles.label}>Batch: {item.data.batch_no}</Text>
            </Text>
            <Text style={styles.itemText}>
                <Text style={styles.label}>PO: {item.data.po_no}</Text>
            </Text>
            <Text style={styles.itemText}>
                <Text style={styles.label}>Created:</Text>{" "}
                {moment(item.created_at).format("DD MMM YYYY, HH:mm")}
            </Text>
            <Text style={styles.itemText}>
                <Text style={styles.label}>Updated:</Text>{" "}
                {moment(item.update_at).format("DD MMM YYYY, HH:mm")}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Active Requests</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#10B981" />
            ) : (
                <FlatList
                    data={completedData}
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
        backgroundColor: "#b9a210", // Warna hijau untuk status COMPLETED
        borderRadius: 5,
        paddingVertical: 4,
        paddingHorizontal: 10,
        marginRight: 0, // Pastikan label tidak menempel di tepi layar
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