import React, { useState, useEffect, } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { Layout, Tab, TabView, Text, Input, Button, Card, IndexPath, Select, SelectItem, Icon } from '@ui-kitten/components';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { OpenSans_500Medium, } from '@expo-google-fonts/open-sans';
import { Kanit_400Regular } from '@expo-google-fonts/kanit';
// import BottomNavigtor from '../navigation/BottomNavigator';
const data = [
  { id: 1, name: 'John', email: 'john@gmail.com' },
  { id: 2, name: 'Bob', email: 'bob@gmail.com' },
  { id: 3, name: 'Mei', email: 'mei@gmail.com' },
  { id: 4, name: 'Steve', email: 'steve@gmail.com' }
]
const ShowOilPrice = ({ navigation }) => {
  // const [isLoading, setLoading] = useState(true);
  // const [data, setData] = useState([]);
  // console.log(data);
  // useEffect(() => {
  //   fetch('https://raw.githubusercontent.com/adhithiravi/React-Hooks-Examples/master/testAPI.json')
  //     .then((response) => response.json())
  //     .then((json) => setData(json))
  //     .catch((error) => console.error(error))
  //     .finally(() => setLoading(false));
  // }, []);
  const [selectedFilter, setSelectedFilter] = useState(new IndexPath(0));

  let [fontsLoaded] = useFonts({
    Inter_900Black, OpenSans_500Medium, Kanit_400Regular

  });

  if (!fontsLoaded) {
    return null;
  }

  const filter = [
    'ทั้งหมด',
    'อาหาร',
    'ท่องเที่ยว',
    'พักผ่อน',
    'เรียน/ทำงาน',
    'อื่น ๆ'
  ];

  const displayValue = filter[selectedFilter.row];

  return (
    <View style={[styles.MainContainer, { backgroundColor: 'white' }]}>
      <ScrollView style={styles.scrollView}>
        <Layout style={[styles.tabContainer]}>
          <View style={styles.containerFilter}>
            <Text category='h1' style={[styles.fontTh, { color: '#903749', paddingRight: '50px' }]}>ราคานํ้ามัน</Text>
            <Icon
              style={[styles.icon, { marginTop: 0 }]}
              name='funnel-outline' />
            <Layout level='1'>
              <Select
                selectedIndex={selectedFilter}
                value={displayValue}
                onSelect={index => filterChange(index)}>
                <SelectItem title='ทั้งหมด' />
                <SelectItem title='อาหาร' />
                <SelectItem title='ท่องเที่ยว' />
                <SelectItem title='พักผ่อน' />
                <SelectItem title='เรียน/ทำงาน' />
                <SelectItem title='อื่น ๆ' />
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
              {/* <FlatList
                      data={data.articles}
                      keyExtractor={({ id }, index) => id}
                      renderItem={({ item }) => (
                        <Text>{item.id + '. ' + item.title}</Text>
                      )}
                    /> */}
              {data.map((item, index) =>
                <View style={[styles.row, styles.card]}>
                  <View style={[styles.column1]}>
                    <Icon style={[styles.icon, {width:26, height:26}]} fill='white' name='heart'/>
                  </View>
                  <View style={[styles.column3, { padding: 5 }]}>
                    <Text style={[styles.fontTh, { color: 'white', fontSize: '18px' }]}>{item.id}</Text>
                  </View>
                  <View style={[styles.column3, { padding: 5 }]}>
                    <Text style={[styles.fontTh, { color: 'white', fontSize: '13px' }]}>{item.name}</Text>
                  </View>
                  <View style={[styles.column3, { padding: 5 }]}>
                    <Text style={[styles.fontTh, { color: 'white', fontSize: '13px' }]}>{item.email}</Text>
                  </View>
                  <View style={[styles.column1, { padding: 5 }]}>
                    <Text style={[styles.fontTh, { color: 'white', fontSize: '10px' }]}>80.00</Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </Layout>
      </ScrollView>
      {/* <View style={styles.bottomView} >
        <BottomNavigtor navigation={navigation} />
      </View> */}
    </View>

  );
};

const styles = StyleSheet.create({
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
    backgroundColor: 'white',
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