import React from 'react';
import { View, Text } from 'react-native';

export default function MessageDetail({ route }) {
  const { message } = route.params;

  return (
    <View>
      <Text>Original Message: {message.originalMessage}</Text>
      <Text>Encryption Key: {message.encryptionKey}</Text>
      <Text>Result: {message.result}</Text>
    </View>
  );
}
