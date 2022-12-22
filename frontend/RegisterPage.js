import { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useFonts, Kanit_400Regular } from '@expo-google-fonts/kanit';
import { Input, Button, Modal, Card } from '@ui-kitten/components';
import axios from 'axios';


const Register = ({ navigation, route }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [alert, setAlert] = useState('');
  const [registerFailed, setRegisterFailed] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [inputRequire, setInputRequire] = useState(false);
  let [fontsLoaded] = useFonts({
    Kanit_400Regular
  });
  if (!fontsLoaded) {
    return null;
  }
  const signup = async () => {
    if (firstname || lastname || username || password || phoneNumber != '') {
      axios.post("http://127.0.0.1:8080/signUp", { firstName: firstname, lastName: lastname, username: username, password: password, phone: phoneNumber, favoil: [], favRoute: []})
        .then(function (response) {
          if (response.data) {
            setRegisterSuccess(true)
          }
          else {
            setRegisterFailed(true)
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
      <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 60, color: '#E84545', fontWeight: 'bold' }}>REGISTER</Text>
      <View style={{ marginTop: 25 }}>

        <Text style={styles.fontEngInputHeader}>Username</Text>
        <Input style={styles.fontEngInput} onChangeText={text => setUsername(text)} />
      </View>
      <View style={{ marginTop: 15 }}>
        <Text style={styles.fontEngInputHeader}>Password</Text>
        <Input secureTextEntry={true} style={styles.fontEngInput} onChangeText={text => setPassword(text)} />
      </View>
      <View style={{ marginTop: 15 }}>
        <Text style={styles.fontEngInputHeader}>Firstname</Text>
        <Input style={styles.fontEngInput} onChangeText={text => setFirstname(text)} />
      </View>
      <View style={{ marginTop: 15 }}>
        <Text style={styles.fontEngInputHeader}>Lastname</Text>
        <Input style={styles.fontEngInput} onChangeText={text => setLastname(text)} />
      </View>
      <View style={{ marginTop: 15 }}>
        <Text style={styles.fontEngInputHeader}>Phone</Text>
        <Input style={styles.fontEngInput} onChangeText={text => setPhoneNumber(text)} />
      </View>
      <Text style={[styles.fontTh, { color: '#F73C3C', marginTop: 15 }]}>{alert}</Text>
      <Button style={[styles.fontEng, styles.buttonStyle, { margin: 10 }]} onPress={signup}>{evaProps => <Text {...evaProps} style={{ color: "#ffffff", fontFamily: 'Kanit_400Regular', }}>Sign Up</Text>}</Button>
      <Modal
        visible={inputRequire}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setInputRequire(false)}>
        <Card style={[{ backgroundColor: "#ffffff" }]}>
          <View style={styles.cardContainer}>
            <View style={styles.ct}>
              <Image source={require('../assets/danger.png')} style={{ width: 50, height: 50 }} />
              <Text style={styles.cardText}>กรุณากรอกข้อมูลให้ครบ</Text>
            </View>
          </View>
        </Card>
      </Modal>
      <Modal
        visible={registerFailed}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setRegisterFailed(false)}>
        <Card style={[{ backgroundColor: "#ffffff" }]}>
          <View style={styles.cardContainer}>
            <View style={styles.ct}>
              <Image source={require('../assets/Error.png')} style={{ width: 50, height: 50 }} />
              <Text style={styles.cardText}>ชื่อผู้ใช้งานถูกใช้ไปแล้ว</Text>
            </View>
          </View>
        </Card>
      </Modal>
      <Modal
        visible={registerSuccess}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => [navigation.navigate("Login"), setRegisterSuccess(false)]}>
        <Card style={[{ backgroundColor: "#ffffff" }]}>
          <View style={styles.cardContainer}>
            <View style={styles.ct}>
              <Image source={require('../assets/success.png')} style={{ width: 50, height: 50 }} />
              <Text style={styles.cardText}>สมัครมาชิกสำเร็จ</Text>
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
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    fontbSize: 14,
    color: '#ffffff',
  },
  fontEngInput: {
    fontFamily: 'Kanit_400Regular',
    fontSize: 14,
    color: 'black',
    // backgroundColor: '#FFFFFF',
    borderRadius: '30px',
    width: 280
  },
  fontTh: {
    fontFamily: 'Kanit_400Regular',
    fontSize: 14,
  },
  buttonStyle: {
    backgroundColor: '#E84545',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: "9000px",
    width: 240
  },
  logo: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 30,
    height: 30,
    alignSelf: 'flex-start',
    // top: '-50px'
  }
});

export default Register