import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {convertFullName} from '../../utils/functions';
import {colors} from '../../theme/colors';
import Avatar from './Avatar';
import {useNavigation} from '@react-navigation/native';
import {CONTACTDETAILS} from '../../utils/routes';
import {sizes} from '../../utils/constant';

const ContactItem = ({item}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate(CONTACTDETAILS, {contact: item})}
      style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar name={item.name} surname={item.surname} size={sizes.SMALL} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {convertFullName(item.name, item.surname)}
        </Text>
        <Text style={styles.job}>{item.job}</Text>
      </View>
    </Pressable>
  );
};

export default ContactItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
    color: colors.BLACK,
  },
  job: {
    fontSize: 16,
    margin: 5,
    color: colors.DARKER,
  },
  infoContainer: {
    flex: 4,
  },
  avatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
