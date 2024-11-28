import React, { useState } from "react";
import {
    View,
    TextInput,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Alert,
    KeyboardAvoidingView,
    Platform, StatusBar,
} from "react-native";
import axios from "axios";
import { Block, Checkbox, Text, theme } from "galio-framework";
//import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {argonTheme, Images} from "../constants";
import {Button, Icon, Input} from "../components";

const { width, height } = Dimensions.get("screen");

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State untuk toggle password visibility

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert("Error", "Username dan password harus diisi");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${apiUrl}/auth/login`, {
                username: username,
                password: password,
            });

            console.log(response.data);

            if (response.data.token) {
                // Simpan token ke AsyncStorage
                await AsyncStorage.setItem("token", response.data.token);

                // Pastikan data username tersedia sebelum menyimpan
                if (response.data.username) {
                    await AsyncStorage.setItem("username", response.data.username);
                } else {
                    console.warn("Username tidak tersedia dalam response");
                }

                Alert.alert("Login sukses!", "Akan diarahkan ke App.");
                navigation.navigate("App");
                console.log(response.data);
            } else {
                Alert.alert("Error", "Login gagal, coba lagi.");
            }
        } catch (error) {
            console.error(error.response.data);
            Alert.alert("Error", error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        >

            <Block flex middle>
                <StatusBar hidden />
                <ImageBackground
                    source={Images.LoginBackground}
                    style={{ width, height, zIndex: 1 }}
                >
                    <Block safe flex middle>
                        <Block style={styles.registerContainer}>
                        <Block flex>
                            <Block flex={0.19} middle style={{ marginTop:10 }}>
                                <Text color="#8898AA" size={20}>
                                    Selamat Datang!
                                </Text>
                                <Text color="#8898AA" size={15}>
                                    Please Log in to continue
                                </Text>
                            </Block>
                            <Block flex center>
                                <KeyboardAvoidingView
                                    style={{ flex: 1 }}
                                    behavior="padding"
                                    enabled
                                >
                                    <Block width={width * 0.8} style={{ marginBottom: 15, marginTop:20 }}>
                                        <Input
                                            borderless
                                            placeholder="Username"
                                            value={username}
                                            onChangeText={setUsername}
                                            iconContent={
                                                <Icon
                                                    size={16}
                                                    name="ic_mail_24px"
                                                    family="ArgonExtra"
                                                    style={styles.inputIcons}
                                                />
                                            }
                                        />
                                    </Block>

                                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                                        <Input
                                            password
                                            borderless
                                            placeholder="Password"
                                            value={password}
                                            onChangeText={setPassword}
                                            secureTextEntry={!showPassword}
                                            iconContent={
                                                <Icon
                                                    size={16}
                                                    color={argonTheme.COLORS.ICON}
                                                    name="padlock-unlocked"
                                                    family="ArgonExtra"
                                                    style={styles.inputIcons}
                                                />
                                            }
                                        />
                                    </Block>

                                    <Block middle>
                                        <Button color="primary" style={styles.button}
                                                //onPress={handleLogin}
                                                onPress={() => navigation.navigate("App")}
                                                disabled={loading}>
                                            <Text bold size={16} color={argonTheme.COLORS.WHITE}>
                                                {loading ? "Loading..." : "Login"}
                                            </Text>
                                        </Button>
                                    </Block>

                                </KeyboardAvoidingView>

                            </Block>
                            <Block flex={0.19} middle>
                                <Text color="#8898AA" size={15}>
                                    you don't have an account?
                                </Text>
                                <Text color="#8898AA" size={15}>
                                    please register <Text color="#1715aa" size={15}>here</Text>
                                </Text>
                            </Block>

                        {/*<View style={styles.card}>

                <Text style={styles.title}>Selamat Datang!</Text>

                <Text style={styles.label}>Username</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Masukkan username"
                    value={username}
                    onChangeText={setUsername}
                    autoFocus={true}
                />

                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Masukkan password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Icon
                            name={showPassword ? "eye" : "eye-slash"}
                            size={20}
                            color="#999"
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? "Loading..." : "Login"}
                    </Text>
                </TouchableOpacity>
            </View>*/}

                        </Block>
                        </Block>
                    </Block>
                </ImageBackground>
            </Block>


        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    registerContainer: {
        width: width * 0.9,
        height: height * 0.4,
        backgroundColor: "#F4F5F7",
        borderRadius: 4,
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1,
        overflow: "hidden"
    },
    inputIcons: {
        marginRight: 12
    },
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#F8FAFC",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 24,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        marginBottom: 24,
        textAlign: "center",
        fontWeight: "bold",
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: "bold",
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 16,
        paddingHorizontal: 15,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 16,
        height: 50,
    },
    passwordCheck: {
        paddingLeft: 15,
        paddingTop: 13,
        paddingBottom: 30
    },
    passwordInput: {
        flex: 1,
        paddingHorizontal: 15,
        height: "100%",
    },
    icon: {
        marginLeft: 10,
        padding: 10,
    },
    button: {
        backgroundColor: "#10B981",
        paddingVertical: 15, // Menambah padding vertikal
        paddingHorizontal: 20, // Menambah padding horizontal
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
        height: 50, // Menjaga konsistensi ukuran tombol
    },
    buttonText: {
        color: "#fff",
        fontSize: 16, // Mengurangi ukuran font agar teks muat
        fontWeight: "bold", // Menambahkan ketebalan pada teks
    },
});
