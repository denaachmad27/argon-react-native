import React from "react";
import { StyleSheet, FlatList, Text, TouchableOpacity, View } from "react-native";
import { Block } from "galio-framework"; // Pastikan Block diimpor
import { argonTheme } from "../constants"; // Impor argonTheme untuk warna header
import Icon from "react-native-vector-icons/FontAwesome";

const data = [
    { id: '1', title: 'Coffee Traceability', description: 'Proses untuk traceability coffee (3 node_1)' },
    { id: '2', title: 'coffee_export', description: 'Coffee Export (2 node_4)' },
    { id: '3', title: 'coffee_traceability_test', description: 'coffee_traceability_test (4 node_1)' },
    // Tambahkan lebih banyak data jika diperlukan
];

class Process extends React.Component {
    render() {
        return (
            <Block style={styles.container}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.description}>{item.description}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => alert('Process Started')}
                            >
                                <Icon name="play" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FE", // Background warna halaman
        paddingHorizontal: 16, // Memberikan padding kiri dan kanan agar kartu tidak menempel
        paddingTop: 20, // Memberikan ruang di bagian atas
    },
    itemContainer: {
        flexDirection: "row", // Menyusun elemen secara horizontal
        padding: 15,
        marginBottom: 15,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
        justifyContent: "space-between", // Menyebar item secara horisontal
        alignItems: "center", // Menyusun item secara vertikal di tengah
    },
    textContainer: {
        flex: 1, // Membuat bagian teks mengambil ruang yang tersisa
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    description: {
        fontSize: 14,
        color: "gray",
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: argonTheme.COLORS.PRIMARY,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
});

export default Process;
