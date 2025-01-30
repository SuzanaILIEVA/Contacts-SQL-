import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SQLite from 'react-native-sqlite-storage';
import {colors} from '../../theme/colors';
import Avatar from '../contacts/Avatar';
import {sizes} from '../../utils/constant';
import {convertFullName} from '../../utils/functions';
import Feather from '@react-native-vector-icons/feather';

const db = SQLite.openDatabase({
  name: 'ContactsDatabase',
});
const ResentItem = ({item}) => {
  const [user, setUser] = useState({});
  // Kullanıcıların veritabanından  getirilmesi için bir fonksiyon
  const getUser = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM users WHERE id=${item.resent_id}`,
        [],
        (sqlTxn, res) => {
          if (res.rows.length > 0) {
            for (let i = 0; i < res.rows.length; i++) {
              let item = res.rows.item(i);
              console.log(item.name);
              if (user) setUser(item);
            }
          }
        },
        error => console.log('Hata', error.message),
      );
    });
  };

  useEffect(() => {
    getUser(); // Kullanıcı getirildikten sonra fonksiyon çağrılır.
    // Her renderden sonra bu fonksiyon çağrılır ve veritabanındaki yeni güncellemeler gözükecektir.
  }, []);
  return (
    <Pressable style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar name={user.name} surname={user.surname} size={sizes.SMALL} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {convertFullName(user.name, user.surname)}
        </Text>
        <Text style={styles.job}>{item.date}</Text>
      </View>
      <View style={styles.callTypeContainer}>
        {
          item?.callType === 'incoming' ? (
            <Feather
              name="phone-incoming"
              color={colors.GREEN}
              size={25}
              iconStyle="solid"
            />
          ) : (
            <Feather
              name="phone-outgoing"
              color={colors.BLUE}
              size={25}
              iconStyle="solid"
            />
          )

          // Missed call ise kırmızı, diğer durumda açık olacaktır.
        }
      </View>
    </Pressable>
  );
};

export default ResentItem;

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
  callTypeContainer: {
    marginHorizontal: 15,
  },
});
