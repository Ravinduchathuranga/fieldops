import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Jobs: undefined;
  AddJob: undefined;
  Customers: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  // Temporary static data (replace later with backend data)
  const totalJobs = 5;
  const pendingJobs = 1;
  const completedJobs = 2;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <Text style={styles.title}>FieldOps Pro</Text>
        <Text style={styles.subtitle}>
          Manage your field service operations efficiently
        </Text>

        {/* Summary Section */}
        <View style={styles.summaryContainer}>
          <View style={styles.card}>
            <Text style={styles.cardNumber}>{totalJobs}</Text>
            <Text style={styles.cardLabel}>Total Jobs</Text>
          </View>

          <View style={[styles.card, styles.pendingCard]}>
            <Text style={styles.cardNumber}>{pendingJobs}</Text>
            <Text style={styles.cardLabel}>Pending</Text>
          </View>

          <View style={[styles.card, styles.completedCard]}>
            <Text style={styles.cardNumber}>{completedJobs}</Text>
            <Text style={styles.cardLabel}>Completed</Text>
          </View>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Jobs')}
          >
            <Text style={styles.buttonText}>View Jobs</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('AddJob')}
          >
            <Text style={styles.buttonText}>Add New Job</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Customers')}
          >
            <Text style={styles.buttonText}>View Customers</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E88E5',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 24,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  card: {
    flex: 1,
    backgroundColor: '#1E88E5',
    padding: 16,
    borderRadius: 10,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  pendingCard: {
    backgroundColor: '#FB8C00',
  },
  completedCard: {
    backgroundColor: '#43A047',
  },
  cardNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 6,
  },
  buttonContainer: {
    marginTop: 10,
  },
  primaryButton: {
    backgroundColor: '#1E88E5',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#3949AB',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
