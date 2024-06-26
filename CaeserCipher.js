import { styles } from './style.js';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image,  Button, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addHistory } from './model2.js';
import { AntDesign } from '@expo/vector-icons';

export default function CaeserCipher({route, navigation }) {

  const [input, setInput] = useState('');
  const [key, setKey] = useState('');
  const [ciphered, setCiphered] = useState('');
  const history = useSelector((state) => state.history)


  const dispatch = useDispatch ();
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let letter = '';



  const HistoryButton = () => {
    navigation.navigate('History', {
      history:history
      
    });
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
  return result; 
}

function decode(message) {
  let result = '';
  message = message.toLowerCase();
  for (let i = 0; i < message.length; i++) {
    let index = letter.indexOf(message[i]);
    let originalIndex = (index - key + alphabet.length) % alphabet.length;
    result += alphabet[index];
  }
  return result; 
}

function cipher(key, direction) {
  letter = '';
  shift(key);
  if (direction === 1) {
    const encryptedMessage = encode(input);
    setCiphered(encryptedMessage);
    dispatch(addHistory({ originalMessage: input, encryptionKey: key, result: encryptedMessage }));
  } else if (direction === -1) {
    const decryptedMessage = decode(input);
    setCiphered(decryptedMessage);
    dispatch(addHistory({ originalMessage: input, encryptionKey: key, result: decryptedMessage }));
  } else {
      
    }}

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 40, fontWeight: 'bold', marginBottom: 50 }}>Caesar Cipher Machine</Text>
      <Image style={{ resizeMode: 'contain', width: 300, height: 300 }}
        source={{ uri: 'https://pagoda-tech.com/site/1864pago/Enigma-plugboard-encryption.jpg' }}/>
      <TextInput style={{ padding: 8, marginBottom: 15, backgroundColor: '#D3D3D3', color: 'black', width: 400 }}
        placeholder="Enter the message to encrypt or decrypt here"
        value={ input} onChangeText={setInput} />
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <AntDesign.Button name="forward" onPress={() => cipher(parseInt(key, 10), 1)} >
          Encrypt
        </AntDesign.Button>
        </View>
      <Text>Results here:  {ciphered}</Text>
      <View>
  <AntDesign.Button name="book" title="See History" onPress={() => HistoryButton()} >
    See History
    </AntDesign.Button>
    </View>
    </View>
  );
  }