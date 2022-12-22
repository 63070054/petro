import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useFonts, Kanit_400Regular } from '@expo-google-fonts/kanit';
import { Input, IndexPath, Button, Layout, Select, SelectItem } from '@ui-kitten/components';
import axios from 'axios';
const convert = require("xml-js");


const Calculate = () => {
  const [distance, setDistance] = useState(0);
  const [alert, setAlert] = useState('');
  const [oilPrice, setOilPrice] = useState('');
  const [selectedIndex, setSelectedIndex] = useState('');
  const [rateOfWaste, setRateOfWaste] = useState('');
  const [price, setPrice] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [oils, setOils] = useState([]);

  
  let [fontsLoaded] = useFonts({
    Kanit_400Regular
  });

  // if (!fontsLoaded) {
  //   return null;
  // }



  const calculate = async () => {
    axios.post(`http://127.0.0.1:8080/calculate/${distance}/${oils[selectedIndex].today._text}/${rateOfWaste}`)
      .then(function (response) {
        setPrice(response.data)
        // console.log(response)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const saveLocation = async () => {
    if(start || end || selectedIndex != ''){
    axios.post(`http://127.0.0.1:8080/favRoute/${start}/${end}/${oils[selectedIndex].type._text}/${oils[selectedIndex].today._text}`)
      .then(function (response) {
        // setPrice(response.data)
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }else{
    console.log('wave')
    // alert("ข้อมูลไม่ครบ");
  }}

  useEffect(() => {
    const uri = "https://crmmobile.bangchak.co.th/webservice/oil_price.aspx"
    axios.get(uri).then(function (response) {
      const data = JSON.parse(convert.xml2json(response.data, { compact: true, spaces: 2 }))
      console.log(data)
      setOils([...data.header.item]);
    });
  }, []);
  const oilName = [];
  oils.map(oil => { oilName.push(oil.type._text) });
  
  const displayValue = oilName[selectedIndex.row];
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 60, color: '#E84545', fontWeight: 'bold' }}>PETRO</Text>
      <View style={styles.row}>
        <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 20, color: '#E84545' }}>น้ำมัน : </Text>
        <Layout level='1' style={{ marginLeft: 5 }}>
          <Select
            value={displayValue}
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}>
            {oilName.map(oil => (<SelectItem title={oil} />))}
          </Select>
        </Layout>
      </View>
      <View style={{ marginTop: 15 }}>
        <Image source={require('../assets/map.png')} style={{ width: 150, height: 150 ,marginLeft:20, marginTop: 30}} />
        <View style={[{marginTop: 30, alignItems: 'center'}, styles.row]}>
          <Text style={[{marginRight: 15}, styles.fontEngInputHeader]}>จุดเริ่มต้น</Text>
          <Input style={styles.calInput} onChangeText={text => setStart(text)} />
        </View>
        <View style={[{ marginTop: 10, alignItems: 'center'}, styles.row]}>
          <Text style={[{marginRight: 15}, styles.fontEngInputHeader]}>ปลายทาง</Text>
          <Input style={styles.calInput} onChangeText={text => setEnd(text)} />
        </View>
      </View>
      <View style={[{ marginTop: 10, alignItems: 'center'}, styles.row,]}>
        <Text style={[{marginRight: 15}, styles.fontEngInputHeader]}>ระยะทาง</Text>
        <Input style={styles.calInput} onChangeText={text => setDistance(text)} />
      </View>
      <View style={[styles.row, {marginTop: 30}]}>
        <Button style={[styles.fontEng, styles.buttonStyle, { margin: 15 }]} onPress={calculate}>{evaProps => <Text {...evaProps} style={{ color: "#ffffff", fontFamily: 'Kanit_400Regular', }}>คำนวณค่าน้ำมัน</Text>}</Button>
        <Button style={[styles.fontEng, styles.buttonStyle, { margin: 15 }]} onPress={saveLocation}>{evaProps => <Text {...evaProps} style={{ color: "#ffffff", fontFamily: 'Kanit_400Regular', }}>บันทึกเส้นทาง</Text>}</Button>
      </View>

      <View style={[{ marginTop: 15 }, styles.row]}>
        <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 30, color: '#E84545', fontWeight: 'bold' }}>ค่าน้ำมัน: </Text>
        <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 30, color: '#E84545', fontWeight: 'bold' }}> {price} </Text>
        <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 30, color: '#E84545', fontWeight: 'bold' }}> บาท </Text>
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
    width: 130
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
    width: 130
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