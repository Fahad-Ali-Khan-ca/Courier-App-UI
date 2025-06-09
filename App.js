import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import Modal from "react-native-modal";
import { Colors } from "react-native/Libraries/NewAppScreen";



export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView   stickyHeaderIndices ={[0]}>
        <StatusBar style="auto" />

        <View style = { styles.main }>
        <Text style={styles.text}> Courier Calc </Text>

          </View>
        


      </ScrollView>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',

  },
  text : {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  main : {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 25,
  }
});
