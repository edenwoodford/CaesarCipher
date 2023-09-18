import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import {deleteHistory} from './model2';
import { AntDesign } from '@expo/vector-icons';
import * as Location from 'expo-location';


export default function MessageDetail({route,navigation }) {
  const {message} = route.params;
  const dispatch = useDispatch();
  const goBack = () => {
    navigation.navigate('History');
  };
  const [location, setLocation] = useState(null)
  const [messages, setMessage] = useState('Waiting...')


    useEffect(() => {
    (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
    setMessage('Permission to access location was denied')
    return
    }
    let location = await Location.getCurrentPositionAsync({accuracy:
    Location.Accuracy.Highest})
    setLocation(location)
    setMessage(JSON.stringify(location))
    })()
    }, [] );


  return (
    <View>
      <Text>Original Message: {message.originalMessage}</Text>
      <Text>Encryption Key: {message.encryptionKey}</Text>
      <Text>Result: {message.result}</Text>
    <Text>{messages}</Text>
     <AntDesign.Button name="banckward"  > Decrypt
  </AntDesign.Button>
    </View>
  );
  
  }
