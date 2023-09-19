import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { deleteHistory } from './model2';
import * as Location from 'expo-location';

export default function MessageDetail({ route, navigation }) {
  const { message } = route.params;
  const dispatch = useDispatch();
  const goBack = () => {
    navigation.navigate('History');
  };
  const [location, setLocation] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [messages, setMessage] = useState('Waiting...');
  
  const watchLocation = (location) => {
    setMessage(JSON.stringify(location));
  };

  const startTracking = async () => {
    result = await Location.watchPositionAsync({
      accuracy: Location.Accuracy.Highest,
      distanceInterval: 3,
    }, watchLocation);
    setSubscription(result);
  };

  const stopTracking = async () => {
    await subscription.remove();
    setMessage("Ready for tracking");
  };

  useEffect(() => {
    (async () => {
      let fg = await Location.requestForegroundPermissionsAsync();
      if (fg.status !== 'granted') {
        setMessage('Permission to access foreground location was denied');
        return;
      }
      setMessage("Ready for tracking");
    })();
  }, []); 

  return (
    <View style={{ flexDirection: 'column' }}>
      <View>
        <Text>Original Message: {message.originalMessage}</Text>
        <Text>Encryption Key: {message.encryptionKey}</Text>
        <Text>Result: {message.result}</Text>
        <Text>{messages}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Button title="Decrypt" />
        <Button title="Start Tracking" onPress={startTracking} />
        <Button title= "Stop Tracking" onPress = {stopTracking}/>
      </View>
    </View>
  );
}