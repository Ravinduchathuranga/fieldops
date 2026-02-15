import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, SafeAreaView, RefreshControl } from 'react-native';
import { Customer } from '../types/Customer';
import { fetchCustomers } from '../services/customerService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  CustomerDetail: { customer: Customer };
  Customers: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Customers'>;

const CustomerListScreen: React.FC<Props> = ({ navigation }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadCustomers = async () => {
    setLoading(true);
    const data = await fetchCustomers();
    setCustomers(data);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCustomers();
    setRefreshing(false);
  };

  useEffect(() => { loadCustomers(); }, []);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={customers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('CustomerDetail', { customer: item })} style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.phone}</Text>
            <Text>{item.address}</Text>
          </TouchableOpacity>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F8' },
  card: { backgroundColor: '#FFF', padding: 16, margin: 8, borderRadius: 10 },
  name: { fontWeight: 'bold' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default CustomerListScreen;
