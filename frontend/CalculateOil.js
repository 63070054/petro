import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts, Kanit_400Regular } from '@expo-google-fonts/kanit';
import { Input, Button } from '@ui-kitten/components';


const Calculate = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [alert, setAlert] = useState('');
  let [fontsLoaded] = useFonts({
    Kanit_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }

  const signup = async () => {

  }

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 60, color: '#E84545' , fontWeight: 'bold'}}>PETRO</Text>
      <View style={{ marginTop: 25 }}>
        <Text style={styles.fontEngInputHeader}>จุดเริ่มต้น</Text>
        <Input style={styles.fontEngInput} onChangeText={text => setUsername(text)} />
      </View>
      <View style={{ marginTop: 15 }}>
        <Text style={styles.fontEngInputHeader}>ปลายทาง</Text>
        <Input secureTextEntry={true} style={styles.fontEngInput} onChangeText={text => setPassword(text)} />
      </View>
      <View style={{ marginTop: 15 }}>
        <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 30, color: '#E84545' , fontWeight: 'bold'}}>น้ำมัน A</Text>
      </View>
      <View style={[{ marginTop: 15 }, styles.row]}>
        <Text style={styles.fontEngInputHeader}>ระยะทาง: </Text>
        <Text style={styles.fontEngInputHeader}>XXX</Text>
      </View>
      <View style={{ marginTop: 15 }}>
        <Text style={styles.fontEngInputHeader}>Phone</Text>
        <Input style={styles.fontEngInput} onChangeText={text => setPhoneNumber(text)} />
      </View>
      <Text style={[styles.fontTh, { color: '#F73C3C', marginTop: 15 }]}>{alert}</Text>
      <Button style={[styles.fontEng, styles.buttonStyle, { margin: 10 }]} onPress={signup}>{evaProps => <Text {...evaProps} style={{ color: "#ffffff", fontFamily: 'Kanit_400Regular', }}>Sign Up</Text>}</Button>
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
  },
  row: {
    textAlign: 'center',
    flexDirection: 'row',
    width: '100%',
    height: '10'
},
});

export default Calculate