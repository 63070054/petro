import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts, Kanit_400Regular } from '@expo-google-fonts/kanit';
import { Input, Button } from '@ui-kitten/components';


const Register = () => {
  const [name, setName] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
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
      <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 40, color: '#FDC319' }}>REGISTER</Text>
      <View style={{ marginTop: 25 }}>
        <Text style={styles.fontEngInputHeader}>Name</Text>
        <Input style={styles.fontEngInput} onChangeText={text => setName(text)} />
      </View>
      <View style={styles.row}>
        <Text style={styles.fontEngInputHeader}>About Me</Text>
        <Input style={[styles.fontEngInput, styles.fontTh, styles.textarea]} onChangeText={text => setAboutMe(text)} multiline='true' numberOfLines="4" />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.fontEngInputHeader}>Username</Text>
        <Input style={styles.fontEngInput} onChangeText={text => setUsername(text)} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.fontEngInputHeader}>Password</Text>
        <Input secureTextEntry={true} style={styles.fontEngInput} onChangeText={text => setPassword(text)} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.fontEngInputHeader}>Confirm Password</Text>
        <Input secureTextEntry={true} style={styles.fontEngInput} onChangeText={text => setConfirmPassword(text)} />
      </View>
      <Text style={[styles.fontTh, { color: '#F73C3C', marginTop: 10 }]}>{alert}</Text>
      <Button style={[styles.fontEng, styles.buttonStyle, { margin: 10 }]} onPress={signup}>{evaProps => <Text {...evaProps} style={{ color: "#4542C1", fontFamily: 'Kanit_400Regular', }}>Sign Up</Text>}</Button>
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
    backgroundColor: '#FDC319',
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