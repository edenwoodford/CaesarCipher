import React from 'react';
import { StyleSheet, Text, Button, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

export default function History({ route, navigation }) {
  const cipherHistory = useSelector((state) => state.history);

  const goHome = () => {
    navigation.navigate('Home');
  };

  const QuestionView = ({ item, index }) => (
    <View>
      <Text>Original Message: {item.originalMessage}</Text>
      <Text>Encryption Key: {item.encryptionKey}</Text>
      <Text>Result: {item.result}</Text>
      <Button
        title="View Details"
        onPress={() => 
          
          {
          navigation.navigate('MessageDetail', { message: item });
        }}
      />
    </View>
  );

  return (
    <View>
      <Button title="Home" onPress={goHome} />
      <View >
        <Text>History of Questions</Text>
        <FlatList
          data={cipherHistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={QuestionView}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
