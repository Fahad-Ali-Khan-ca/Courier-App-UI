import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  Alert,
  Switch,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { Picker } from '@react-native-picker/picker';


const Form = () => {
  const [sendingAddress, setSendingAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [parcelType, setParcelType] = useState('Package');
  const [weight, setWeight] = useState('');
  const [rate, setRate] = useState('Standard');
  const [signature, setSignature] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const rates = {
    Package: { Standard: 12.99, 'Xpress Post': 18.99, 'Priority Post': 24.99 },
    'Letter or Document': { Standard: 4.99, 'Xpress Post': 9.99, 'Priority Post': 14.99 }
  };

  const maxWeight = parcelType === 'Package' ? 44 : 1.1;

  const validateAndCompute = () => {
    if (!sendingAddress.trim() || !destinationAddress.trim()) {
      Alert.alert('Validation Error', 'Please enter both addresses.');
      return;
    }
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid weight.');
      return;
    }
    if (w > maxWeight) {
      Alert.alert('Validation Error', `Max weight for ${parcelType} is ${maxWeight} lbs.`);
      return;
    }
    setModalVisible(true);
  };

  const subTotal = () => rates[parcelType][rate] + (signature ? 2 : 0);
  const tax = () => subTotal() * 0.13;
  const total = () => subTotal() + tax();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>XPRESS POST</Text>

      <Text style={styles.label}>Sending Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter sending address"
        value={sendingAddress}
        onChangeText={setSendingAddress}
      />

      <Text style={styles.label}>Destination Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter destination address"
        value={destinationAddress}
        onChangeText={setDestinationAddress}
      />

      <View>
        <Text style={styles.label}>Parcel Type</Text>
        <Picker
          selectedValue={parcelType}
          style={styles.dropDownStyle}
          onValueChange={(itemValue) => {
            setParcelType(itemValue);
            setRate('Standard'); 
            setWeight(''); 
          }}
        >
          <Picker.Item label="Package" value="Package" />
          <Picker.Item label="Letter or Document" value="Letter or Document" />
        </Picker>
      </View>

      <View>
        <Text style={styles.label}>Weight (lbs)</Text>
        <TextInput
          style={styles.input}
          placeholder={`Enter weight (max ${maxWeight} lbs)`}
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />
      </View>

      <Text style={styles.label}>Choose Rate</Text>
      <Picker selectedValue={rate} style={styles.dropDownStyle} onValueChange={setRate}>
        {Object.keys(rates[parcelType]).map(r => (
          <Picker.Item
            key={r}
            label={`${r} ($${rates[parcelType][r].toFixed(2)})`}
            value={r}
          />
        ))}
      </Picker>

      <View style={styles.signatureRow}>
        <Text style={styles.label}>Signature Option (+$2)</Text>
        <Switch value={signature} onValueChange={setSignature} />
      </View>

      <TouchableOpacity style={styles.button} onPress={validateAndCompute}>
        <Text style={styles.buttonText}>Get Rate</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Order Summary</Text>
            <Text>From: {sendingAddress}</Text>
            <Text>To: {destinationAddress}</Text>
            <Text>Type: {parcelType}</Text>
            <Text>Weight: {weight} lbs</Text>
            <Text>Rate: ${rates[parcelType][rate].toFixed(2)}</Text>
            {signature && <Text>Signature: $2.00</Text>}
            <Text>Subtotal: ${subTotal().toFixed(2)}</Text>
            <Text>Tax (13%): ${tax().toFixed(2)}</Text>
            <Text style={styles.total}>Total: ${total().toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginTop: 5 },
  signatureRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 16 },
  modalBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: '80%', backgroundColor: '#fff', borderRadius: 10, padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  closeButton: { backgroundColor: '#FF3B30', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 15 },
  total: { fontWeight: 'bold', marginTop: 10 },
  dropDownStyle: { width: "95%", borderColor: "red", borderWidth: 2, borderRadius: 5, },
  
});

export default Form;
