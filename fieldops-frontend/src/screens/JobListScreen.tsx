import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { Job } from '../types/Job';
import { fetchJobs } from '../services/jobService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  JobForm: { job?: Job };
  Jobs: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Jobs'>;

const JobListScreen: React.FC<Props> = ({ navigation }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadJobs = async () => {
    setLoading(true);
    const data = await fetchJobs();
    setJobs(data);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadJobs();
    setRefreshing(false);
  };

  useEffect(() => { loadJobs(); }, []);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  return (
    <FlatList
      data={jobs}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('JobForm', { job: item })}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.status}</Text>          
        </TouchableOpacity>
      )}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFF', padding: 16, marginBottom: 12, borderRadius: 10 },
  title: { fontWeight: 'bold' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default JobListScreen;
