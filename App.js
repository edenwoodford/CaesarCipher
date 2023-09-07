
import React, { useState } from 'react';
import { styles } from './style.js';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CaeserCipher from './CaeserCipher.js';
import History from './history.js';
import { store } from './store.js';
import {Provider} from "react-redux";
const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <Provider store = {store} >

  <NavigationContainer>
  <Stack.Navigator>
  <Stack.Screen
  name="Home"
  component={CaeserCipher}
  options={{title: 'Page 1'}}
  />
  <Stack.Screen
  name="History"
  component={History}
  options={{title: 'Page 2'}}
  /> 
  </Stack.Navigator>
  </NavigationContainer>
  </Provider>
  );
  }