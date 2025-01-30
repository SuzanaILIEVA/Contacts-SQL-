import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../theme/colors';
import Avatar from '../../components/contacts/Avatar';
import {sizes} from '../../utils/constant';
import {convertFullName} from '../../utils/functions';
import CircleIconButton from '../../components/ui/CircleIconButton';
import Ionicons from '@react-native-vector-icons/ionicons';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

const Calls = ({route, navigation}) => {
  const {contact} = route.params;
  // console.log('CONATCT INFO ', contact);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Avatar
          name={contact?.name}
          surname={contact?.surname}
          size={sizes.LARGE}
        />
        <Text style={styles.name}>
          {convertFullName(contact.name, contact.surname)}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <CircleIconButton
          onPress={() => navigation.goBack()}
          color={colors.GREEN}
          icon={<Ionicons name="call" color={colors.WHITE} size={30} />}
        />
        <CircleIconButton
          onPress={() => navigation.goBack()}
          color={colors.RED}
          icon={
            <FontAwesome6
              name="phone-slash"
              iconStyle="solid"
              color={colors.WHITE}
              size={25}
            />
          }
        />
      </View>
    </View>
  );
};

export default Calls;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.WHITE,
    marginBottom: 10,
    marginTop: 20,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
  },
});
