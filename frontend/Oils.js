import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import axios from "axios";
import { FlatList } from 'react-native-web';
import { Button } from '@ui-kitten/components';

const convert = require("xml-js");

const Oils = ({ navigation }) => {
    const [oils, setOils] = useState([]);
    useEffect(()=>{
        const uri = "https://crmmobile.bangchak.co.th/webservice/oil_price.aspx"
        axios.get(uri).then(function (response){
            const data = JSON.parse(convert.xml2json(response.data, {compact:true, spaces:2}))
            setOils(data.header.item);
        });
    }, [!oils]);

    const renderItem = ({item}) =>{
        return(
            <View>
                <Text>{item.type._text} : {item.yesterday._text} :{item.today._text}</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View>asd</View>
            <FlatList data={oils} renderItem={renderItem}></FlatList>
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
});

export default Oils