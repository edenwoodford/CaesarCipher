import React, { useState } from 'react';
import { styles } from './style.js';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CaeserCipher from './CaeserCipher.js';
import History from './history.js';
import MessageDetail from './MessageDetail.js';
import { store } from './store.js';
import {Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { ActivityIndicator } from 'react-native';

const persistor = persistStore(store)
const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={CaeserCipher}
              options={{ title: 'Page 1' }}
            />
            <Stack.Screen
              name="History"
              component={History}
              options={{ title: 'Page 2' }}
            />
            <Stack.Screen name= "MessageDetail" component = {MessageDetail}
            options = {{title: "Page 3"}} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}