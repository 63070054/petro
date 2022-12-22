import React, { useState, useEffect, } from 'react';
import axios from "axios";
import { FlatList } from 'react-native-web';
import { useFonts, Kanit_400Regular } from '@expo-google-fonts/kanit';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Layout, Text, IndexPath, Select, SelectItem} from '@ui-kitten/components';
import { FontAwesome, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
const convert = require("xml-js");

const ShowOilPrice = ({ navigation, route }) => {
  const [oils, setOils] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(new IndexPath(0));
  console.log(route)
  useEffect(() => {
    const uri = "https://crmmobile.bangchak.co.th/webservice/oil_price.aspx"
    axios.get(uri).then(function (response) {
      const data = JSON.parse(convert.xml2json(response.data, { compact: true, spaces: 2 }))
      setOils([...data.header.item]);
    });
  }, []);
  {}

  let [fontsLoaded] = useFonts({
    Kanit_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }

  const renderItem = ({ item, index }) => {
    return (
      <View style={[styles.row]}>
        <View style={[styles.column1]}>
          <Text onPress={()=>{console.log(index)}} style={[styles.fontTh, { color: 'white', fontSize: '16px' }]}>
            {/* <MaterialCommunityIcons style={[{marginRight: 5}]} size={15} color={"red"} name="cards-heart-outline" />
            <MaterialCommunityIcons style={[{marginRight: 5}]} size={15} color={"red"} name="cards-heart" /> */}
            {item.type._text} 
          </Text>
        </View>
        <View style={[styles.column2,]}>
          <Text style={[styles.fontTh, { color: 'white', fontSize: '16px' }]}>{item.yesterday._text}</Text>
        </View>
        <View style={[styles.column2,]}>
          <Text style={[styles.fontTh, { color: 'white', fontSize: '16px' }]}>{item.today._text}</Text>
        </View>
      </View>
    )
  }
  return (
    <View style={[styles.container]}>
      <View style={styles.containerFilter}>
            <Text category='h1' style={[styles.fontTh, { color: '#E84545', paddingRight: '10px' }]}>ราคานํ้ามัน</Text>
            {/* <Layout level='1'>
              <Select placeholder={'Filter'}>
                <SelectItem title='น้ำมันที่ชื่นชอบ' />
                <SelectItem title='ทั้งหมด' />
              </Select>
            </Layout> */}
          </View>

      <ScrollView style={styles.scrollView}>
        <Layout style={[styles.tabContainer]}>
          <View style={styles.containerCardparty}>
            <View style={[styles.row, { backgroundColor: '#c90076', height: '50px'}]}>
              <View style={[styles.column1, { textAlign: 'center'}]}>
                <Text style={[styles.fontTh, { color: '#ffffff', fontSize: '16px' }]}>นํ้ามัน</Text>
              </View>
              <View style={[styles.column2]}>
                <Text style={[styles.fontTh, { color: '#ffffff', fontSize: '16px' }]}>เมื่อวาน</Text>
              </View>
              <View style={[styles.column2]}>
                <Text style={[styles.fontTh, { color: '#ffffff', fontSize: '16px' }]}>วันนี้</Text>
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
    backgroundColor: '#2B2E4A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  tabContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    paddingTop: '10px',
    borderStyle: 'solid',
    borderColor: 'red',
    backgroundColor: '',
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
  scrollView :{
    width: "100%",
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
    // height: '100%', 
    // width: '100%' ,
    // backgroundColor: 'white',
    flexDirection: 'row'
  },
  containerCardparty: {
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    height: '70px',
    padding: 5,
    // backgroundColor: '#903749',
    borderStyle: 'solid',
    borderColor: 'Green',
    alignItems: 'center',
    alignContent: 'center',
  },
  column1: {
    width: "50%",
    // textAlign: 'center'
    borderStyle: 'solid',
    borderColor: 'green'
  },
  column2: {
    width: "25%",
    textAlign: 'center'
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
