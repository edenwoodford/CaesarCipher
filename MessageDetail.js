import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import {deleteHistory} from './model2';
import { AntDesign } from '@expo/vector-icons';
export default function MessageDetail({route,navigation }) {
  const {message} = route.params;
  const dispatch = useDispatch();
  const goBack = () => {
    navigation.navigate('History');
  };
  const deleteButton = () => {
    Alert.alert('Deletion','Are you sure you want to delete this? This is permanent.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel was pressed'),
          style: 'cancel',
        },{
          text: 'Delete',
          onPress: () => {
            dispatch(deleteHistory({message}));
            navigation.goBack();
          },
        },]
    );
  };


  return (
    <View>
      <Text>Original Message: {message.originalMessage}</Text>
      <Text>Encryption Key: {message.encryptionKey}</Text>
      <Text>Result: {message.result}</Text>
     <AntDesign.Button name="deleteuser" title="Delete" onPress={deleteButton} > 
     delete
     </AntDesign.Button>
    </View>
  );
}
