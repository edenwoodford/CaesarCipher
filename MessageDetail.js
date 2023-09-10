import React from 'react';
import { View, Text, Button, Image,Flatlist, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
export default function MessageDetail({route,navigation }) {
  const {message} = route.params;
  const dispatch = useDispatch();
  const deleteButton = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this item? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            dispatch(deleteHistory(message));
            navigation.goBack(); 
          },
          style: 'destructive',
        },
      ]
    );
  };
  return (
    <View>
      <Text>Original Message: {message.originalMessage}</Text>
      <Text>Encryption Key: {message.encryptionKey}</Text>
      <Text>Result: {message.result}</Text>
      <Button title="Delete" onPress={deleteButton} />
    </View>
  );
}
