import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CONTACTS, FAVORITES, RESENTS} from '../utils/routes';
import Resents from '../screens/resents';
import Contacts from '../screens/contacts';
import Favorites from '../screens/favorites';
import TabBarIcon from '../components/router/TabBarIcon';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
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
      <Tab.Screen name={CONTACTS} component={Contacts} />
      <Tab.Screen name={FAVORITES} component={Favorites} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
