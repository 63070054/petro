import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Text } from '@ui-kitten/components';
import { useFonts, Kanit_400Regular } from '@expo-google-fonts/kanit';
import Register from './RegisterPage';
const convert = require("xml-js");



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
const Oils = ({ navigation }) => {
    useEffect(()=>{
        const uri = "https://crmmobile.bangchak.co.th/webservice/oil_price.aspx"
        axios.get(uri).then(function (response){
            const data = JSON.parse(convert.xml2json(response.data, {compact:true, spaces:2}))
            console.log(data.header.item)
            console.log("ราคาน้ำมัน " + data.header.item[0].type._text + " เมื่อวาน : " + data.header.item[0].yesterday._text)
            console.log("ราคาน้ำมัน " + data.header.item[0].type._text + " วันนี้ : " + data.header.item[0].today._text)
        });
    })
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
                <Text onPress={() => { navigation.navigate("Register")}} style={{ color: "#ffffff" }}>สมัครสมาชิกใหม่?</Text>
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
    }
});

export default LoginPage