import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import axios from "axios";

const convert = require("xml-js");

const Oils = ({ navigation }) => {
    useEffect(()=>{
        const uri = "https://crmmobile.bangchak.co.th/webservice/oil_price.aspx"
        axios.get(uri).then(function (response){
            const data = JSON.parse(convert.xml2json(response.data, {compact:true, spaces:2}))
            console.log(data.header.item)
            console.log("ราคาน้ำมัน " + data.header.item[0].type._text + " เมื่อวาน : " + data.header.item[0].yesterday._text)
            console.log("ราคาน้ำมัน " + data.header.item[0].type._text + " วันนี้ : " + data.header.item[0].today._text)
        });
    })
}

export default Oils