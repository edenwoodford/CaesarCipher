import { StyleSheet, Button,View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

export default function History({ navigation }) {

  const goHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View>
      <Button title="Home" onPress={goHome} />
      
    </View>
  );
}
