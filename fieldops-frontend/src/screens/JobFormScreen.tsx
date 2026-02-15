import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import { Job } from '../types/Job';
import { Customer } from '../types/Customer';
import { fetchCustomers } from '../services/customerService';
import { createJob, updateJob } from '../services/jobService';

type RootStackParamList = {
  JobForm: { job?: Job };
  Jobs: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'JobForm'>;

const JobFormScreen: React.FC<Props> = ({ route, navigation }) => {
  const job = route.params?.job;
  const [title, setTitle] = useState(job?.title || '');
  const [description, setDescription] = useState(job?.description || '');
  const [scheduledDate, setScheduledDate] = useState(job?.scheduledDate || '');
  const [status, setStatus] = useState(job?.status || 'PENDING');
  const [customerId, setCustomerId] = useState(job?.customer.id || 0);
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetchCustomers().then(setCustomers);
  }, []);

  const handleSubmit = async () => {
    if (!title || !description || !scheduledDate || !customerId) {
      Alert.alert('Validation Error', 'All fields are required');
      return;
    }

    const jobData: Partial<Job> = {
      title,
      description,
      scheduledDate,
      status,
      customer: { id: customerId } as Customer,
    };

    try {
      if (job) await updateJob(job.id, jobData);
      else await createJob(jobData);
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', 'Failed to save job');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={styles.input} />
      <TextInput placeholder="Scheduled Date (YYYY-MM-DD)" value={scheduledDate} onChangeText={setScheduledDate} style={styles.input} />
      <Text>Status</Text>
      <Picker selectedValue={status} onValueChange={setStatus} style={styles.picker}>
        <Picker.Item label="PENDING" value="PENDING" />
        <Picker.Item label="IN_PROGRESS" value="IN_PROGRESS" />
        <Picker.Item label="COMPLETED" value="COMPLETED" />
      </Picker>
      <Text>Customer</Text>
      <Picker selectedValue={customerId} onValueChange={setCustomerId} style={styles.picker}>
        {customers.map(c => <Picker.Item key={c.id} label={c.name} value={c.id} />)}
      </Picker>
      <Button title="Save Job" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: '#CCC', marginBottom: 12, padding: 8, borderRadius: 6 },
  picker: { borderWidth: 1, borderColor: '#CCC', marginBottom: 12 },
});

export default JobFormScreen;
