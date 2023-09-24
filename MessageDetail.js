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
  const [decryptedMessage, setDecryptedMessage] = useState(null);

  const watchLocation = async (location) => {
    if (location && location.coords && location.coords.latitude && location.coords.longitude) {
      const { latitude, longitude } = location.coords;
    //displau location to viewer
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      setMessage(`Latitude: ${latitude}, Longitude: ${longitude}`);
      await decryptMessage(latitude, longitude);
    } else {
      console.error('no location data');
    }
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
    setSubscription(null); //enables stopping and starting again
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

  function keyFunc(latitude, longitude) {
    const scale = 1000;
    const changeLat = Math.round(latitude * scale);
    const changeLong = Math.round(longitude * scale);
    const absSum = Math.abs(changeLat) + Math.abs(changeLong);
    //find absolute sum
    const key = (absSum % 25) + 1;
                // 24      +    1 =25
    return key;
  }

  const decryptWithKey = (encryptedMessage, encryptionKey) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let decrypted = '';
  
    for (let i = 0; i < encryptedMessage.length; i++) {
      const char = encryptedMessage[i].toLowerCase();
      const isUpperCase = encryptedMessage[i] === encryptedMessage[i].toUpperCase();
  
      if (alphabet.includes(char)) {
        const currentIndex = alphabet.indexOf(char);
        const decryptedIndex = (currentIndex - encryptionKey + alphabet.length) % alphabet.length;
        const decryptedChar = alphabet[decryptedIndex];
  
        decrypted += isUpperCase ? decryptedChar.toUpperCase() : decryptedChar;
      } else {
        decrypted += char;
      }
    }
    return decrypted;
  };
  const decryptMessage = async (latitude, longitude) => {
    if (!latitude || !longitude) {
      setDecryptedMessage('location Data:');
      return;
    }
    const encryptionKey = keyFunc(latitude, longitude);
    console.log(`Encryption Key: ${encryptionKey}`);
    //check key after each run in console?? 
    if (message && message.result) {
    const decrypted = decryptWithKey(message.result, encryptionKey);
    setDecryptedMessage(`Decrypted Message: ${decrypted}`);
    }
  };

  return (
    <View style={{ flexDirection: 'column' }}>
      <View>
        <Text>Original Message: {message.originalMessage}</Text>
        <Text>Result: {message.result}</Text>
        <Text>{messages}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Button title="Decrypt" onPress={decryptMessage} />
        <Button title="Start Tracking" onPress={startTracking} />
        <Button title= "Stop Tracking" onPress = {stopTracking}/>
      </View>
      {decryptedMessage && (
        <View>
          <Text>{decryptedMessage}</Text>
        </View>
      )}
    </View>
  );
}