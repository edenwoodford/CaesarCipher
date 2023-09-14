import React, { useState } from 'react';
import { Text, Button, View, FlatList, CheckBox } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteHistory } from './model2';
import { Entypo } from '@expo/vector-icons'; 



export default function History({ route, navigation }) {
  const cipherHistory = useSelector((state) => state.history);
  const dispatch = useDispatch();
  const goHome = () => {
    navigation.navigate('Home');
  };
  const [selected, setSelected] = useState([]);

  const clickBox = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((selectedItem) => selectedItem !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  const deletingOption = () => {
    if (selected.length === 0) {
      return;
    }
    selected.forEach((item) => {
      dispatch(deleteHistory({ message: item }));
    });
    setSelected([]);
  };
  const QuestionView = ({ item, index }) => (
    <View>
      <CheckBox
      value= {selected.includes(item)}
      onValueChange={() => clickBox(item)} />
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
    <View >
      <Button title="Home" onPress={goHome} />
      <Entypo.Button name="trash" onPress={deletingOption}>
        Delete Selected
      </Entypo.Button>
      <View>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'blue', fontSize: 40 }}> History of Questions </Text>
        <FlatList
          data={cipherHistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={QuestionView}
        />
      </View>
    </View>
  );
}

