import { styles } from './style.js';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import addCypher from './model.js';

export default function CaeserCipher({navigation }) {

  const [input, setInput] = useState('');
  const [key, setKey] = useState('');
  const [ciphered, setCiphered] = useState('');

  const dispatch = useDispatch ();
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let letter = '';
  
  const HistoryButton = () => {
    navigation.navigate('History');
  };

  function shift(n) {
    for (let i = 0; i < alphabet.length; i++) {
      let offset = (i + n) % alphabet.length;
      letter += alphabet[offset];
    }
  }
  function encode(message) {
  let result = '';
    message = message.toLowerCase();
    for (let i = 0; i < message.length; i++) {
      let index = alphabet.indexOf(message[i]);
      result += letter[index];
    }
    dispatch (addCypher({result: result, input, ciphered}))
    return result;
  }

  function decode(message) {
    let result = '';
  message = message.toLowerCase();
    for (let i = 0; i < message.length; i++) {
      let index = letter.indexOf(message[i]);
      result += alphabet[index];
    } 
    dispatch (addCypher({result: result, input, ciphered}))
    return result;
  }

  function cipher(key, direction) {
    letter = '';
    shift(key);
    if (direction === 1) {
      setCiphered(encode(input));

    } else if (direction === -1) {
      setCiphered(decode(input));
    }
    else {
      
    }}

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 40, fontWeight: 'bold', marginBottom: 50 }}>Caesar Cipher Machine</Text>
      <Image style={{ resizeMode: 'contain', width: 300, height: 300 }}
        source={{ uri: 'https://pagoda-tech.com/site/1864pago/Enigma-plugboard-encryption.jpg' }}/>
      <TextInput style={{ padding: 8, marginBottom: 15, backgroundColor: '#D3D3D3', color: 'black', width: 400 }}
        placeholder="Enter the message to encrypt or decrypt here"
        value={ input} onChangeText={setInput} />
      <TextInput style={{ padding: 8, backgroundColor: '#D3D3D3', color: 'black', width: 400 }}
        placeholder=" Enter the encryption key here (1-25)"
        value={key} onChangeText={setKey}/>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Button title="Encrypt" onPress={() => cipher(parseInt(key, 10), 1)} />
        <Text style={{ color: 'white' }}> . . </Text>
        <Button title="Decrypt" onPress={() => cipher(parseInt(key, 10), -1)} /></View>
      <Text>Results here:  {ciphered}</Text>
      <View style={styles.container}>
      <Button
        title="See History" onPress={HistoryButton}
      />
    </View>
    </View>
  );
  }