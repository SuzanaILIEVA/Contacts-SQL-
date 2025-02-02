import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ADDNEWCONTACT,
  CALLS,
  CONTACTDETAILS,
  FAVORITES,
  TABNAVIGATOR,
  UPDATECONTACT,
} from '../utils/routes';
import TabNavigator from './TabNavigator';
import ContactDetail from '../screens/contacts/ContactDetail';
import {colors} from '../theme/colors';
import Calls from '../screens/calls';
import AddContact from '../screens/contacts/AddContact';
import Ionicons from '@react-native-vector-icons/ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {deleteContact} from '../store/actions/contactAction';
import UpdateContact from '../screens/contacts/UpdateContact';
import {addFavorite, removeFavorite} from '../store/slice/contactSlice';

const Stack = createNativeStackNavigator();
const RootNavigator = () => {
  const dispatch = useDispatch();

  const {favorites} = useSelector(state => state.contactStore);

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
      <Stack.Screen
        name={CONTACTDETAILS}
        component={ContactDetail}
        options={({navigation, route}) => {
          return {
            headerRight: ({focused, size, color}) => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 10,
                  paddingRight: 5,
                  gap: 10,
                }}>
                <Pressable
                  onPress={() =>
                    navigation.navigate(UPDATECONTACT, {
                      contact: route.params.contact,
                    })
                  }>
                  <Ionicons name="create" size={30} color={colors.BLUE} />
                </Pressable>
                <Pressable
                  onPress={() => {
                    dispatch(deleteContact(route.params.contact.id));
                    Alert.alert('Contact deleted');
                    navigation.goBack();
                  }}>
                  <Ionicons name="trash" size={30} color={colors.RED} />
                </Pressable>
              </View>
            ),
          };
        }}
      />
      <Stack.Screen
        name={CALLS}
        component={Calls}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name={ADDNEWCONTACT} component={AddContact} />
      <Stack.Screen name={UPDATECONTACT} component={UpdateContact} />
    </Stack.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
