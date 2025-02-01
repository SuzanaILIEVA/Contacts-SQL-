import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Avatar from '../contacts/Avatar';
import {convertFullName} from '../../utils/functions';

const FavoriteItem = ({contact}) => {
  return (
    <View style={styles.container}>
      <Avatar name={contact.name} surname={contact.surname} size="small" />
      <Text style={styles.name}>
        {convertFullName(contact.name, contact.surname)}
      </Text>
    </View>
  );
};

export default FavoriteItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
