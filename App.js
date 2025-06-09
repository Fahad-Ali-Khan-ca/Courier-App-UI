import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import Form from './form';

const App = () => (
    <View style={styles.container}>
     <Form />
      <StatusBar style="auto" />
    </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
  }
});

export default App;
