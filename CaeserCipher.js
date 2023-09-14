import { styles } from './style.js';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Picker, Button, TextInput } from 'react-native';
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



  const HistoryButton = () => {console.log(history)
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
 <Picker
        selectedValue={key}
        onValueChange={(itemValue) => setKey(itemValue)}
        style={{ width: 400 }} >
          <Picker.Item label= "Please choose an encyption key " />
          <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        <Picker.Item label="6" value="6" />
        <Picker.Item label="7" value="7" />
        <Picker.Item label="8" value="8" />
        <Picker.Item label="9" value="9" />
        <Picker.Item label="10" value="10" />
        <Picker.Item label="11" value="11" />
        <Picker.Item label="12" value="12" />
        <Picker.Item label="13" value="13" />
        <Picker.Item label="14" value="14" />
        <Picker.Item label="15" value="15" />
        <Picker.Item label="16" value="16" />
        <Picker.Item label="17" value="17" />
        <Picker.Item label="18" value="18" />
        <Picker.Item label="19" value="19" />
        <Picker.Item label="20" value="20" />
        <Picker.Item label="21" value="21" />
        <Picker.Item label="22" value="22" />
        <Picker.Item label="23" value="23" />
        <Picker.Item label="24" value="24" />
        <Picker.Item label="25" value="25" />
        </Picker>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <AntDesign.Button name="forward" onPress={() => cipher(parseInt(key, 10), 1)} >
          Encrypt
        </AntDesign.Button>
        <Text style={{ color: 'white' }}> . . </Text>
        <AntDesign.Button name="banckward" onPress={() => cipher(parseInt(key, 10), -1)}>
          Decrypt
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