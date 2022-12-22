import React, { useState, useEffect, } from 'react';
import axios from "axios";
import { FlatList } from 'react-native-web';
import { Button } from '@ui-kitten/components';
import { useFonts, Kanit_400Regular } from '@expo-google-fonts/kanit';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, TouchableOpacity, TextInput, Image } from 'react-native';
import { Layout, Tab, TabView, Text, Modal, Card, IndexPath, Select, SelectItem, Icon, Input } from '@ui-kitten/components';
const convert = require("xml-js");

const MemoRoute = ({ navigation, route }) => {
  const [favRoute, setFavRoute] = useState([]);
  const [oils, setOils] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8080/getFavRoute/${route.params.username}`)
      .then(function (response) {
        setFavRoute(response.data)
        const uri = "https://crmmobile.bangchak.co.th/webservice/oil_price.aspx"
        axios.get(uri).then(function (response) {
          const data = JSON.parse(convert.xml2json(response.data, { compact: true, spaces: 2 }))
          setOils([...data.header.item]);
        });
      }).catch((err) => {
        console.log(err);
      });
  }, []);

  let [fontsLoaded] = useFonts({
    Kanit_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }

  const deleteRoute = () => {
    if (selectedIndex) {
      axios.delete(`http://127.0.0.1:8080/favRoute`,
        { data: { username: route.params.username, startName: favRoute[selectedIndex].startName, destination: favRoute[selectedIndex].destination, oil: favRoute[selectedIndex].oil, distance: favRoute[selectedIndex].distance } })
        .then(function (response) {
          setDeleteSuccess(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };



  const renderItem = ({ item, index }) => {
    const findOil = oils.find(oil => oil.type._text == item.oil)
    if (findOil) {
      const price = findOil.today._text * (item.distance / 14);
      return (
        <TouchableOpacity onPress={() => [setDeleteModal(true), setSelectedIndex(index), setStart(item.startName), setEnd(item.destination)]}>
          <View style={[styles.row]}>
            <View style={[styles.column1, { padding: 5 }]}>
              <View style={[styles.rowcol]}>
                <Image source={require('../assets/map.png')} style={{ width: "40px", height: '40px' }} />
                <Text style={[styles.fontTh, { color: 'white', fontSize: '12px', marginLeft: '5px' }]}>{item.oil}</Text>
              </View>
            </View>
            <View style={[styles.column2, { padding: 5, textAlign: 'center' }]}>
              <Text style={[styles.fontTh, { color: 'white', fontSize: '13px' }]}>{item.startName} - {item.destination}</Text>
              <Text style={[styles.fontTh, { color: 'white', fontSize: '13px' }]}>ระยะทาง {item.distance} ก.ม.</Text>
            </View>
            <View style={[styles.column3, { padding: 5, textAlign: 'center' }]}>
              <Text style={[styles.fontTh, { color: 'white', fontSize: '15px' }]}>{price.toFixed(2)} บาท</Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    }
  }
  return (
    <View style={[styles.container]}>
      <View style={styles.containerFilter}>
        <Text category='h1' style={[styles.fontTh, { color: '#E84545' }]}>เส้นทางที่บันทึก</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <Layout style={[styles.tabContainer]}>
          <View style={styles.containerCardparty} >
            <FlatList data={favRoute} renderItem={renderItem} ></FlatList>
          </View>
        </Layout>
      </ScrollView>
      <Modal
        visible={deleteModal}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => [setDeleteModal(false)]}>
        <Card style={[{ backgroundColor: "#2B2E4A" }]}>
          <View style={styles.container}>
            <View style={styles}>
              <Text style={[styles.fontEngInputHeader]}>จุดเริ่มต้น : {start}</Text>
            </View>
            <View style={[styles, { margin: 20 }]}>
              <Text style={[styles.fontEngInputHeader]}>ปลายทาง : {end}</Text>
            </View>
            <Button style={[styles.fontEng, styles.buttonStyle, { margin: 15 }]} onPress={deleteRoute}>{evaProps => <Text {...evaProps} style={{ color: "#ffffff", fontFamily: 'Kanit_400Regular', width: 100 }}>ลบ</Text>}</Button>
          </View>
        </Card>
      </Modal>
      <Modal
        visible={deleteSuccess}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => [setDeleteSuccess(false), favRoute.splice(selectedIndex, 1)]}>
        <Card style={[{ backgroundColor: "#ffffff" }]}>
          <View style={styles.cardContainer}>
            <View style={styles.ct}>
              <Image source={require('../assets/success.png')} style={{ width: 50, height: 50 }} />
              <Text style={styles.cardText}>ลบสำเร็จ</Text>
            </View>
          </View>
        </Card>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2E4A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowcol: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center'
  },
  scrollView: {
    width: "100%",
    backgroundColor: "",
    padding: 0,
    margin: 5
  },
  tabContainer: {
    backgroundColor: 'transparent',
  },
  fontEng: {
    fontFamily: 'Kanit_400Regular',
    fontSize: 14,
  },
  fontEngInputHeader: {
    fontFamily: 'Kanit_400Regular',
    fontSize: 14,
    color: '#ffffff',
  },
  fontEngInput: {
    fontFamily: 'Kanit_400Regular',
    borderRadius: '30px',
    width: 280,
    backgroundColor: 'transparent',
  },
  fontTh: {
    fontFamily: 'Kanit_400Regular',
  },
  buttonStyle: {
    backgroundColor: '#E84545',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: "9000px",
    width: "50%",
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center'

  },
  containerFilter: {
    alignItems: 'center',
    // height: '100%', width: '100%' ,
    // backgroundColor: 'white',
    // flexDirection: 'row',
  },
  containerCardparty: {
    width: '100%',
  },
  row: {
    // flexWrap: "wrap",
    display: "flex",
    flexDirection: 'row',
    width: '95%',
    height: 80,
    padding: 5,
    // textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#53354A',
    borderRadius: 5,
    borderColor: "transparent",
    margin: 5,
  },
  column1: {
    width: "50%",
  },
  column2: {
    width: "30%"
  },
  column3: {
    width: "20%"
  },
  textStyle: {
    color: '#fff',
    fontSize: 22
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 100,
    marginBottom: 6
  },
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
});

export default MemoRoute
