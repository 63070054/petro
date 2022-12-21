import { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useFonts, Kanit_400Regular } from '@expo-google-fonts/kanit';
import { Input, IndexPath, Button, Layout, Select, SelectItem} from '@ui-kitten/components';
import axios from 'axios';


const Calculate = () => {
  const [distance, setDistance] = useState(0);
  const [alert, setAlert] = useState('');
  const [oilPrice, setOilPrice] = useState('');
  const [selectedIndex, setSelectedIndex] = useState('');
  const [rateOfWaste, setRateOfWaste] = useState('');
  const [price, setPrice] = useState('');
  
  const data = [
    'อาหาร',
    'ท่องเที่ยว',
    'พักผ่อน',
    'เรียน/ทำงาน',
    'อื่น ๆ'
];
const displayValue = data[selectedIndex.row];
  let [fontsLoaded] = useFonts({
    Kanit_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }

  const calculate = async () => {
    axios.post("http://127.0.0.1:8080/calculate", {distance:distance, oil_Price:40, rate_of_waste:14 })
  .then(function (response){
    // setPrice(response.data)
    console.log(response.data)
  })}

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 60, color: '#E84545' , fontWeight: 'bold'}}>PETRO</Text>
      <View style={styles.row}>
      <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 20, color: '#E84545'}}>ชนิดน้ำมัน: </Text>
                    <Layout level='1'>
                        <Select
                            value={displayValue}
                            selectedIndex={selectedIndex}
                            onSelect={index => setSelectedIndex(index)}>
                            <SelectItem title='อาหาร' />
                            <SelectItem title='ท่องเที่ยว' />
                            <SelectItem title='พักผ่อน' />
                            <SelectItem title='เรียน/ทำงาน' />
                            <SelectItem title='อื่น ๆ' />
                        </Select>
                    </Layout>
            </View>
      <View style={{ marginTop: 15 }}>
      <Image source={require('../assets/map.png')} style={{ width: 150, height: 150 }} />
      </View>
      <View style={{ marginTop: 15 }}>
        <Text style={styles.fontEngInputHeader}>ระยะทาง</Text>
        <Input style={styles.fontEngInput} onChangeText={text => setDistance(text)} />
      </View>
      <Button style={[styles.fontEng, styles.buttonStyle, { margin: 15 }]} onPress={calculate}>{evaProps => <Text {...evaProps} style={{ color: "#ffffff", fontFamily: 'Kanit_400Regular', }}>คำนวณค่าน้ำมัน</Text>}</Button>
      
      
      <View style={{ marginTop: 15 }}>
        <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 20, color: '#E84545' , fontWeight: 'bold'}}>ค่าน้ำมัน: </Text>
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
  calInput: {
    fontFamily: 'Kanit_400Regular',
    fontSize: 14,
    color: 'black',
    // backgroundColor: '#FFFFFF',
    borderRadius: '30px',
    width: 80
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
    width: 200
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
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    width: '100%',
    height: '10'
},
});

export default Calculate