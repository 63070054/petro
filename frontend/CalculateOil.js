import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useFonts, Kanit_400Regular } from '@expo-google-fonts/kanit';
import { Input, Modal, Card, Button, Layout, Select, SelectItem } from '@ui-kitten/components';
import axios from 'axios';
const convert = require("xml-js");


const Calcu = ({ navigation, route }) => {
  const [distance, setDistance] = useState(0);
  const [alert, setAlert] = useState('');
  const [selectedIndex, setSelectedIndex] = useState('');
  const [kmPerOil, setKmPerOil] = useState('');
  const [price, setPrice] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [oils, setOils] = useState([]);
  const [visible, setVisible] = useState(false);
  const [oilSelectPrice, setOilSelectPrice] = useState('');
  const [inputRequire, setInputRequire] = useState(false);
  const [saveFailed, setSaveFailed] = useState('');
  const [saveSuccess, setSaveSuccess] = useState('');



  let [fontsLoaded] = useFonts({
    Kanit_400Regular
  });

  const calculate = async () => {
    if (selectedIndex) {
      axios.post(`http://127.0.0.1:8080/calculate`, { distance: distance, oil_Price: oils[selectedIndex.row].today._text, km_per_oil: kmPerOil })
        .then(function (response) {
          setPrice(response.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const saveLocation = async () => {
    if (start && end && selectedIndex != '') {
      axios.post(`http://127.0.0.1:8080/favRoute`,
        { username: route.params.username, startName: start, destination: end, oil: oils[selectedIndex.row].type._text, distance: distance })
        .then(function (response) {
          setSaveSuccess(true)
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setInputRequire(true)
    }
  }

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
      <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 40, color: '#E84545', fontWeight: 'bold', marginBottom: 20 }}>คำนวณค่าน้ำมัน</Text>
      <View style={styles.row}>
        <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 20, color: '#E84545' }}>น้ำมัน : </Text>
        <Layout level='1' style={{ marginLeft: 5 }}>
          <Select
            size='small'
            value={displayValue}
            selectedIndex={selectedIndex}
            onSelect={index => [setSelectedIndex(index), setOilSelectPrice(oils[index.row].today._text)]}>
            {oilName.map(oil => (<SelectItem title={oil} />))}
          </Select>
        </Layout>
      </View>
      <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 20, color: '#E84545', marginLeft: 10, marginTop: 10 }}>ราคาลิตรละ : {oilSelectPrice} บาท</Text>
      <View>
        <Image source={require('../assets/map.png')} style={{ width: 150, height: 150, marginTop: 20, marginBottom: 10 }} />
      </View>
      <View style={[styles.row]}>
        <Text style={[{ marginRight: 15 }, styles.fontEngInputHeader]}>ระยะทาง</Text>
        <Input style={[{ marginVertical: 20, width: 100 }]} onChangeText={text => setDistance(text)} />
        <Text style={[styles.fontEngInputHeader, { marginLeft: 10 }]}>KM</Text>
      </View>
      <View style={[styles.row]}>
        <Text style={[{ marginRight: 20 }, styles.fontEngInputHeader]}>ใช้น้ำมัน</Text>
        <Input style={[{ marginVertical: 10, width: 100 }]} onChangeText={text => setKmPerOil(text)} />
        <Text style={[styles.fontEngInputHeader, { marginLeft: 10 }]}>KM/L</Text>
      </View>
      <View style={[styles.row]}>
        <Button style={[styles.fontEng, styles.buttonStyle, { margin: 15 }]} onPress={calculate}>{evaProps => <Text {...evaProps} style={{ color: "#ffffff", fontFamily: 'Kanit_400Regular', }}>คำนวณค่าน้ำมัน</Text>}</Button>
        <Button style={[styles.fontEng, styles.buttonStyle, { margin: 15 }]} onPress={() => setVisible(true)}>{evaProps => <Text {...evaProps} style={{ color: "#ffffff", fontFamily: 'Kanit_400Regular', }}>บันทึกเส้นทาง</Text>}</Button>
      </View>

      <View style={[{ marginTop: 15 }, styles.row]}>
        <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 30, color: '#E84545', fontWeight: 'bold' }}>ค่าน้ำมัน : </Text>
        <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 30, color: '#E84545', fontWeight: 'bold' }}> {price} </Text>
        <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 30, color: '#E84545', fontWeight: 'bold' }}> บาท </Text>
      </View>

      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card style={[{ backgroundColor: "#2B2E4A" }]}>
          <View style={styles.container}>
            <View style={styles.row}>
              <Text style={[styles.fontEngInputHeader]}>จุดเริ่มต้น   </Text>
              <Input style={{ width: 100 }} onChangeText={text => setStart(text)} />
            </View>
            <View style={[styles.row, { margin: 20 }]}>
              <Text style={[styles.fontEngInputHeader]}>ปลายทาง   </Text>
              <Input style={{ width: 100 }} onChangeText={text => setEnd(text)} />
            </View>
            <Button style={[styles.fontEng, styles.buttonStyle, { margin: 15 }]} onPress={saveLocation}>{evaProps => <Text {...evaProps} style={{ color: "#ffffff", fontFamily: 'Kanit_400Regular', }}>บันทึก</Text>}</Button>
          </View>
        </Card>
      </Modal>
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
        visible={saveSuccess}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => [setSaveSuccess(false), setVisible(false)]}>
        <Card style={[{ backgroundColor: "#ffffff" }]}>
          <View style={styles.cardContainer}>
            <View style={styles.ct}>
              <Image source={require('../assets/success.png')} style={{ width: 50, height: 50 }} />
              <Text style={styles.cardText}>บันทึกสำเร็จ</Text>
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
    padding: 10,
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
    // color: '#fffff',
    borderRadius: '30px',
    width: 280
  },
  calInput: {
    fontFamily: 'Kanit_400Regular',
    fontSize: 14,
    color: 'black',
    justifyContent: 'center',
    width: 100,
    height: 100,
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
  },
  row: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    margin: 0,
    padding: 0,
  },
  column: {
    flexDirection: 'column',
  },
  rowtext: {
    flexDirection: 'row',
    textAlign: 'center',
    width: '100%',
    justifyContent: 'space-around'
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Calcu