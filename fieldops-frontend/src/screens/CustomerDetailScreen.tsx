import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Customer } from '../types/Customer';

type RootStackParamList = {
  CustomerDetail: { customer: Customer };
};

type Props = NativeStackScreenProps<
  RootStackParamList,
  'CustomerDetail'
>;

const CustomerDetailScreen: React.FC<Props> = ({ route }) => {
  const { customer } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>{customer.name}</Text>
        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>{customer.phone}</Text>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>{customer.address}</Text>
      </View>
    </SafeAreaView>
  );
};

export default CustomerDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1E88E5',
  },
  label: {
    fontWeight: '600',
    marginTop: 10,
  },
  value: {
    color: '#555',
    marginTop: 4,
  },
});
