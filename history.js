import { StyleSheet } from './style.js';
import { Text, View, Image,FlatList, Button, TextInput } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

export default function History({route}) {
    return (
        <View style={styles.container}>
          <Text>History Screen</Text>
          <FlatList
            data={route.params.answers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <Text>Original Message: {item.originalMessage}</Text>
                <Text>Encryption Key: {item.encryptionKey}</Text>
                <Text>Result: {item.result}</Text>
              </View>
            )}
          />
        </View>
      );
}