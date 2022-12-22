import { useState } from 'react';
import { StyleSheet, TurboModuleRegistry, View, Image } from 'react-native';
import { Input, Button, Text, Modal, Card } from '@ui-kitten/components';
import { useFonts, Kanit_400Regular } from '@expo-google-fonts/kanit';
import Register from './RegisterPage';
import axios from 'axios';
import ShowOilPrice from './ShowOilPrice';

const LoginPage = ({ navigation, route }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState('');
    const [loginFaild, setLoginFaild] = useState(false);
    const [loginSuccess, setLoginSucess] = useState(false);
    const [inputRequire, setInputRequire] = useState(false);
    let [fontsLoaded] = useFonts({
        Kanit_400Regular
    });

    if (!fontsLoaded) {
        return null;
    }
    var user

    const login = () => {
        if (username != "" && password != "") {
            axios.get(`http://127.0.0.1:8080/signIn/${username}/${password}`)
                .then(function (response) {
                    if (response.data) {
                        setLoginSucess(true)
                    } else {
                        setLoginFaild(true)
                    }
                }).catch((err) => {
                    console.log(err);
                });
        } else {
            setInputRequire(true)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 80, fontWeight: 'bold', color: '#E84545' }}>Petro</Text>
            <View style={{ marginTop: 25 }}>
                <Text style={styles.fontEngInputHeader} >Username</Text>
                <Input style={[styles.fontEng, styles.fontEngInput]} value={username} onChangeText={text => setUsername(text)} />
            </View>
            <View style={{ marginTop: 10 }}>
                <Text style={styles.fontEngInputHeader}>Password</Text>
                <Input secureTextEntry={true} style={styles.fontEngInput} value={password} onChangeText={text => setPassword(text)} />
            </View>

            <Text style={[styles.fontTh, { color: '#903749' }]}>{alert}</Text>
            <Button style={[styles.fontEng, styles.buttonStyle, { margin: 10 }]} onPress={login}>{evaProps => <Text {...evaProps} style={{ color: "#ffffff", fontFamily: 'Kanit_400Regular', }}>Sign In</Text>}</Button>
            <View style={{ marginTop: 10 }}>
                <Text style={{ color: "#ffffff" }} >ยังไม่มีสมาชิก</Text>
                <Text onPress={() => { navigation.navigate("Register", { username: username }) }} style={{ color: "#ffffff" }}>สมัครสมาชิกใหม่?</Text>
                <View styles={{ backgroundColor: '#FFFFFF' }}>
                </View>
            </View>
            <Modal
                visible={inputRequire}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setInputRequire(false)}>
                <Card style={[{ backgroundColor: "#ffffff" }]}>
                    <View style={styles.cardContainer}>
                        <View style={styles.ct}>
                            <Image source={require('../assets/danger.png')} style={{ width: 50, height: 50 }} />
                            <Text style={styles.cardText}>กรุณากรอกชื่อผู้ใช้งานและรหัสผ่านให้ครบ</Text>
                        </View>
                    </View>
                </Card>
            </Modal>
            <Modal
                visible={loginFaild}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setLoginFaild(false)}>
                <Card style={[{ backgroundColor: "#ffffff" }]}>
                    <View style={styles.cardContainer}>
                        <View style={styles.ct}>
                            <Image source={require('../assets/Error.png')} style={{ width: 50, height: 50 }} />
                            <Text style={styles.cardText}>ชื่อผู้ใช้งานหรือรหัสผ่านผิด</Text>
                        </View>
                    </View>
                </Card>
            </Modal>
            <Modal
                visible={loginSuccess}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => [navigation.navigate("Tab", { username: username }), setLoginSucess(false)]}>
                <Card style={[{ backgroundColor: "#ffffff" }]}>
                    <View style={styles.cardContainer}>
                        <View style={styles.ct}>
                            <Image source={require('../assets/success.png')} style={{ width: 50, height: 50 }} />
                            <Text style={styles.cardText}>เข้าสู่ระบบสำเร็จ</Text>
                        </View>
                    </View>
                </Card>
            </Modal>
        </View>

    );
};
const styles = StyleSheet.create({
    cardText: {
        fontFamily: 'Kanit_400Regular',
    },
    ct: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    cardContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        fontFamily: 'Kanit_400Regular',
        backgroundColor: '#2B2E4A',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50,
        width: "100%"
    },
    fontEng: {
        fontFamily: 'Kanit_400Regular',
        fontSize: 14,
        color: '#4542C1',
    },
    fontEngInputHeader: {
        fontFamily: 'Kanit_400Regular',
        fontSize: 14,
        color: '#E84545',
    },
    fontEngInput: {
        fontFamily: 'Kanit_400Regular',
        fontSize: 14,
        color: '#000000',
        borderRadius: '30px',
        padding: 10,
        marginRight: 10,
    },
    fontTh: {
        fontFamily: 'OpenSans_500Medium',
        fontSize: 14,
        color: "#ffffff"
    },
    buttonStyle: {
        backgroundColor: '#E84545',
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: "9000px",
        width: 240
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default LoginPage