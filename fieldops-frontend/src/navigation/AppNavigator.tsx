import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import JobListScreen from '../screens/JobListScreen';
import JobFormScreen from '../screens/JobFormScreen';
import CustomerListScreen from '../screens/CustomerListScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Jobs" component={JobListScreen} />
      <Stack.Screen name="AddJob" component={JobFormScreen} />
      <Stack.Screen name="Customers" component={CustomerListScreen} />
    </Stack.Navigator>    
  );
}
