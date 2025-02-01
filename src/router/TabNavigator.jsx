import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ADDNEWCONTACT, CONTACTS, FAVORITES, RESENTS} from '../utils/routes';
import Resents from '../screens/resents';
import Contacts from '../screens/contacts';
import Favorites from '../screens/favorites';
import TabBarIcon from '../components/router/TabBarIcon';
import {colors} from '../theme/colors';
import Ionicons from '@react-native-vector-icons/ionicons';
import {Pressable} from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={CONTACTS}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => (
          <TabBarIcon
            name={route.name}
            color={color}
            size={size}
            focused={focused}
          />
        ),
        tabBarActiveTintColor: '#344CB7',
        tabBarInactiveTintColor: '#777',
      })}>
      <Tab.Screen name={RESENTS} component={Resents} />
      <Tab.Screen
        name={CONTACTS}
        component={Contacts}
        options={({navigation}) => ({
          headerRight: ({focused, size, color}) => (
            <Pressable
              onPress={() => navigation.navigate(ADDNEWCONTACT)}
              style={{
                marginHorizontal: 15,
              }}>
              <Ionicons name="person-add" size={35} color={colors.GREEN} />
            </Pressable>
          ),
        })}
      />
      <Tab.Screen name={FAVORITES} component={Favorites} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
