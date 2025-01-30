import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CONTACTS, FAVORITES, RESENTS} from '../../utils/routes';
import AntDesign from '@react-native-vector-icons/ant-design';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import Ionicons from '@react-native-vector-icons/ionicons';

const TabBarIcon = ({name, focused, size, color}) => {
  switch (name) {
    case RESENTS:
      return <Ionicons name="time" color={color} size={size} />;

    case CONTACTS:
      return <Ionicons name="person" color={color} size={size} />;

    case FAVORITES:
      return <FontAwesome name="star" color={color} size={size} />;

    default:
      return <FontAwesome name="clock-o" size={size} color={color} />;
  }
};

export default TabBarIcon;

const styles = StyleSheet.create({});
