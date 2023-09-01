import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { styles } from './style.js';
import { StyleSheet, Text, View, Image, Button, TextInput } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CaeserCipher from './CaeserCipher';

export default function App() {

  const Stack = createNativeStackNavigator();
  return (
  <NavigationContainer>
  <Stack.Navigator>
  <Stack.Screen
  name="Home"
  component={CaeserCipher}
  options={{title: 'Page 1'}}
  />
  {/* <Stack.Screen
  name="History"
  component={History}
  options={{title: 'Question History'}}
  /> */}
  </Stack.Navigator>
  </NavigationContainer>
  );
  }