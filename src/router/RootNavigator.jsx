import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CALLS, CONTACTDETAILS, TABNAVIGATOR} from '../utils/routes';
import TabNavigator from './TabNavigator';
import ContactDetail from '../screens/contacts/ContactDetail';
import {colors} from '../theme/colors';
import Calls from '../screens/calls';

const Stack = createNativeStackNavigator();
const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'Geri',
        headerTintColor: colors.BLACK,
      }}>
      <Stack.Screen
        name={TABNAVIGATOR}
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name={CONTACTDETAILS} component={ContactDetail} />
      <Stack.Screen
        name={CALLS}
        component={Calls}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
