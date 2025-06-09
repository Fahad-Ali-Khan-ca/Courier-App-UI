// form
import { useState } from "react";
import { ImageBackground, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Form = () => {
    const [send_address, send_setAddress] = useState('');
    const [dest_address, dest_setAddress] = useState('');
    const [parcel_type, setParcelType] = useState('');
    const [parcel_weight, setParcelWeight] = useState('');
    const [rate, setRate] = useState('');
    const [addpOn, setAddOn] = useState('');
    const [total, setTotal] = useState('');
    const [sub_total, setSubTotal] = useState('');
    const [tax, setTax] = useState('');
    const [showResult, setShowResult] = useState(false);
    
}

export default Form;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    color: 'white',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});