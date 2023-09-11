import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
export default function MessageDetail({route,navigation }) {
  const {message} = route.params;
  const dispatch = useDispatch();
  const deleteButton = () =>
  Alert.alert('Deletion', 'Are you sure you want to delete this? This is permanent.', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel was pressed'),
      style: 'cancel',
    },
    {text: 'Delete', onPress: () => console.log('Delete was Pressed')},
  ]);


  return (
    <View>
      <Text>Original Message: {message.originalMessage}</Text>
      <Text>Encryption Key: {message.encryptionKey}</Text>
      <Text>Result: {message.result}</Text>
      <Button title="Delete" onPress={deleteButton} />
    </View>
  );
}
