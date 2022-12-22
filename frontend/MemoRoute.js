import React, { useState, useEffect, } from 'react';
import axios from "axios";
import { FlatList } from 'react-native-web';
import { Button } from '@ui-kitten/components';
import { useFonts, Kanit_400Regular } from '@expo-google-fonts/kanit';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, TouchableOpacity, TextInput, Image } from 'react-native';
import { Layout, Tab, TabView, Text, Input, Card, IndexPath, Select, SelectItem, Icon } from '@ui-kitten/components';
const convert = require("xml-js");

const MemoRoute = ({ navigation }) => {
  const [oils, setOils] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(new IndexPath(0));

  useEffect(() => {
    const uri = "https://crmmobile.bangchak.co.th/webservice/oil_price.aspx"
    axios.get(uri).then(function (response) {
      const data = JSON.parse(convert.xml2json(response.data, { compact: true, spaces: 2 }))
      setOils(data.header.item);
    });
  }, [!oils]);

  let [fontsLoaded] = useFonts({
    Kanit_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.row, styles.card]} >
        <View style={[styles.column2, { padding: 5 }]}>
            <Image source={require('../assets/map.png')} style={{ width: "50px", height: '50px', aspectRatio: "1/1", objectFit: "cover" }} />
            <Text style={[styles.fontTh, { color: 'white', fontSize: '10px' }]}>{item.type._text}</Text>
        </View>
        <View style={[styles.column3, { padding: 5 , textAlign: 'center'}]}>
            <Text style={[styles.fontTh, { color: 'white', fontSize: '13px' }]}>สิงค์บุรี - ชยนาท</Text>
            <Text style={[styles.fontTh, { color: 'white', fontSize: '13px' }]}>ระยะทาง 1.00 ก.ม.</Text>
        </View>
        <View style={[styles.column3, { padding: 5 , textAlign: 'center'}]}>
            <Text style={[styles.fontTh, { color: 'white', fontSize: '23px' }]}>560 บาท</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={[styles.MainContainer]}>
      <ScrollView style={styles.scrollView}>
        <Layout style={[styles.tabContainer, { backgroundColor: 'white' }]}>
          <View style={styles.containerFilter}>
            <Text category='h1' style={[styles.fontTh, { color: '#903749' }]}>เส้นทางที่บันทึก</Text>
          </View>
          <View style={styles.containerCardparty} >
            <FlatList data={oils} renderItem={renderItem} ></FlatList>
          </View>
        </Layout>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //   justifyContent: 'center',
  },
  tabContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingTop: '20px'
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
  icon: {
    width: 32,
    height: 32,
  },
  buttonStyle: {
    backgroundColor: 'white',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: "9000px",
    width: 240,
    color: 'red'
  },
  containerFilter: {
    alignItems: 'center',
    // height: '100%', width: '100%' ,
    // backgroundColor: 'white',
    flexDirection: 'row',
  },
  card: {
    padding: 5,
    backgroundColor: '#903749',
    borderRadius: "15px",
    borderColor: "transparent",
  },
  containerCardparty: {
    width: '80%',
  },
  row: {
    flexWrap: "wrap",
    display: "flex",
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '85px'
  },
  column3: {
    width: "40%",
  },
  column2: {
    width: "20%"
  },
  MainContainer: {
    flex: 1
  },
  bottomView: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  textStyle: {
    color: '#fff',
    fontSize: 22
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 100,
    marginBottom: 6
  }
});

export default MemoRoute
