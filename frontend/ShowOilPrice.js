import { useEffect, useState } from 'react';
import axios from "axios";
import { FlatList } from 'react-native-web';
import { Button } from '@ui-kitten/components';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { OpenSans_500Medium, } from '@expo-google-fonts/open-sans';
import { Kanit_400Regular } from '@expo-google-fonts/kanit';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, TouchableOpacity, TextInput, Image } from 'react-native';
import { Layout, Tab, TabView, Text, Input, Card, IndexPath, Select, SelectItem, Icon } from '@ui-kitten/components';
const convert = require("xml-js");

const ShowOilPrice = ({ navigation }) => {
  const [oils, setOils] = useState([]);
  useEffect(() => {
    const uri = "https://crmmobile.bangchak.co.th/webservice/oil_price.aspx"
    axios.get(uri).then(function (response) {
      const data = JSON.parse(convert.xml2json(response.data, { compact: true, spaces: 2 }))
      setOils(data.header.item);
    });
  }, [!oils]);

  let [fontsLoaded] = useFonts({
    Inter_900Black, OpenSans_500Medium, Kanit_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.row, styles.card]}>
        <View style={[styles.column1]}>
          <Text style={[{ color: 'white', fontSize: '25px' }]}>♡</Text>
        </View>
        <View style={[styles.column3, { padding: 5 }]}>
          <Text style={[styles.fontTh, { color: 'white', fontSize: '18px' }]}>{item.type._text}</Text>
        </View>
        <View style={[styles.column3, { padding: 5 }]}>
          <Text style={[styles.fontTh, { color: 'white', fontSize: '13px' }]}>{item.yesterday._text}</Text>
        </View>
        <View style={[styles.column3, { padding: 5 }]}>
          <Text style={[styles.fontTh, { color: 'white', fontSize: '13px' }]}>{item.today._text}</Text>
        </View>
        <View style={[styles.column1, { padding: 5 }]}>
          <Text style={[styles.fontTh, { color: 'white', fontSize: '13px' }]}>{parseInt(item.yesterday._text) - parseInt(item.today._text)}</Text>
        </View>
      </View>
    )
  }
  return (
    <View style={[styles.MainContainer]}>
      <ScrollView style={styles.scrollView}>
        <Layout style={[styles.tabContainer, { backgroundColor: 'black' }]}>
          <View style={styles.containerFilter}>
            <Text category='h1' style={[styles.fontTh, { color: '#903749', paddingRight: '50px' }]}>ราคานํ้ามัน</Text>
            <Layout level='1'>
              <Select>
                <SelectItem title='ทั้งหมด' />
                <SelectItem title='Hi Premium Diesel S B7' />
                <SelectItem title='Diesel S B7' />
                <SelectItem title='HI DIESEL S' />
                <SelectItem title='HI DIESEL B20 S' />
                <SelectItem title='Hi Premium 97 Gasohol 95' />
                <SelectItem title='Gasohol E85 S EVO' />
                <SelectItem title='Gasohol E20 S EVO' />
                <SelectItem title='Gasohol 91 S EVO' />
                <SelectItem title='Gasohol 95 S EVO' />

              </Select>
            </Layout>
          </View>
          <View style={styles.containerCardparty}>
            <View style={[styles.row, styles.card, { backgroundColor: '#2B2E4A' }]}>
              <View style={[styles.column1]}>
                <Text style={[styles.fontTh, { color: '#4542C1', fontSize: '18px' }]}></Text>
              </View>
              <View style={[styles.column3]}>
                <Text style={[styles.fontTh, { color: '#4542C1', fontSize: '18px' }]}>ชื่อนํ้ามัน</Text>
              </View>
              <View style={[styles.column3]}>
                <Text style={[styles.fontTh, { color: '#4542C1', fontSize: '18px' }]}>ราคานํ้ามันเมื่อวาน</Text>
              </View>
              <View style={[styles.column3]}>
                <Text style={[styles.fontTh, { color: '#4542C1', fontSize: '18px' }]}>ราคานํ้ามันวันนี้</Text>
              </View>
              <View style={[styles.column1]}>
                <Text style={[styles.fontTh, { color: '#4542C1', fontSize: '18px' }]}></Text>
              </View>
            </View>
            <FlatList data={oils} renderItem={renderItem}></FlatList>

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
    padding: 10,
    backgroundColor: '#903749',
    borderRadius: "15px",
    borderColor: "transparent",
  },
  containerCardparty: {
    width: '90%',
  },
  row: {
    flexWrap: "wrap",
    display: "flex",
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '70px'
  },
  column3: {
    width: "25%"
  },
  column1: {
    width: "12%"
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

export default ShowOilPrice
