import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Text } from '@ui-kitten/components';
import { useFonts, Kanit_400Regular } from '@expo-google-fonts/kanit';

const LoginPage = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState('');
    let [fontsLoaded] = useFonts({
        Kanit_400Regular
    });

    if (!fontsLoaded) {
        return null;
    }
    var user

    const login = () => {
        cosnoel.log('login')
    }


    return (
        <View style={styles.container}>
            <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 70, color: '#FDC319' }}>TungTY</Text>
            <View style={{ marginTop: 25 }}>
                <Text style={styles.fontEngInputHeader} >Username</Text>
                <Input style={[styles.fontEng, styles.fontEngInput]} value={username} onChangeText={text => setUsername(text)} />
            </View>
            <View style={{ marginTop: 10 }}>
                <Text style={styles.fontEngInputHeader}>Password</Text>
                <Input secureTextEntry={true} style={styles.fontEngInput} value={password} onChangeText={text => setPassword(text)} />
            </View>

            <Text style={[styles.fontTh, { color: '#F73C3C' }]}>{alert}</Text>
            <Button style={[styles.fontEng, styles.buttonStyle, { margin: 10 }]} onPress={login}>{evaProps => <Text {...evaProps} style={{ color: "#4542C1", fontFamily: 'Kanit_400Regular', }}>Sign In</Text>}</Button>
            <View style={{ marginTop: 10 }}>
                <Text onPress={() => { navigation.navigate("FindParty"); }} style={{ color: "#ffffff" }} >ยังไม่มีสมาชิก</Text>
                <Text onPress={() => { navigation.navigate("Register"); }} style={{ color: "#ffffff" }}>สมัครสมาชิกใหม่?</Text>
                <View styles={{ backgroundColor: '#FFFFFF' }}>
                </View>
            </View>

        </View>

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'Kanit_400Regular',
        backgroundColor: '#4542C1',
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
        color: '#ffffff',
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
        backgroundColor: '#FDC319',
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: "9000px",
        width: 240
    }
});

export default LoginPage