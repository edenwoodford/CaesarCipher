import { StyleSheet, Text,Button,View } from 'react-native';
import React from 'react';
import { styles } from './style.js';
import { useSelector } from 'react-redux';

export default function History({ route, navigation }) {

  const goHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View>
      <Button title="Home" onPress={goHome} />
      <View style= {styles.container}>
        <Text> Original Message: {route.params.originalMessage} </Text>
        <Text> Encryption Key: {route.params.encryptionKey} </Text>
        <Text> Result: {route.params.result} </Text>
      </View>
    </View>
  );
}
