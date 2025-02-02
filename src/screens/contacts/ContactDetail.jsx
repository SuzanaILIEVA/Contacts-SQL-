import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import SQLite from 'react-native-sqlite-storage';
import defaultScreenStyle from '../../styles/defaultScreenStyle';
import Avatar from '../../components/contacts/Avatar';
import {convertFullName} from '../../utils/functions';
import {height, sizes} from '../../utils/constant';
import {colors} from '../../theme/colors';
import CircleIconButton from '../../components/ui/CircleIconButton';
import Ionicons from '@react-native-vector-icons/ionicons';
import {CALLS} from '../../utils/routes';
import {useDispatch, useSelector} from 'react-redux';
import {
  addFavorite,
  removeFavorite,
  setContact,
  setPending,
} from '../../store/slice/contactSlice';

// Uygulama içindeki kişi (contact) bilgilerini saklamak için
// 'ContactsDatabase' adlı SQLite veritabanını açar veya yoksa oluşturur.
const db = SQLite.openDatabase({
  name: 'ContactsDatabase',
});

const ContactDetail = ({route, navigation}) => {
  const dispatch = useDispatch();

  // const {contact} = route.params;
  const {contacts, favorites} = useSelector(state => state.contactStore);
  const contact = contacts.find(c => c.id === route.params.contact.id);

  const isFavorite = favorites.some(fav => fav.id === contact.id);
  // aramalarin veritabanına eklenmesi için bir fonksiyon
  const addNewCall = (date, resent_id, callType) => {
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO calls (date,resent_id,callType) VALUES (?,?,?)',
        [date, resent_id, callType],
        (sqlTxn, res) => console.log('Arama Eklendi '),
        error => console.log('Hata', error.message),
      );
    });
  };

  const handleCall = () => {
    const now = new Date();
    const date = now.toDateString();
    addNewCall(date, contact?.id, 'incoming');
    navigation.navigate(CALLS, {contact: contact});
  };

  const getContacts = () => {
    dispatch(setPending(true));
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM users',
        [],
        (sqlTxn, res) => {
          // console.log('Gelen Veri ', res.rows.length);
          if (res.rows.length > 0) {
            let fetchedUsers = [];
            for (let i = 0; i < res.rows.length; i++) {
              fetchedUsers.push(res.rows.item(i));
            }
            dispatch(setContact(fetchedUsers));
          }
          dispatch(setPending(false));
        },
        error => {
          console.log('Hata', error.message);
          dispatch(setPending(false));
        },
      );
    });
  };
  useEffect(() => {
    return () => {
      getContacts();
    };
  }, []);
  return (
    <View style={defaultScreenStyle.container}>
      <ScrollView>
        <Pressable
          onPress={() => {
            if (isFavorite) {
              dispatch(removeFavorite(contact.id));
            } else {
              dispatch(addFavorite(contact));
            }
          }}
          style={{marginTop: 10}}>
          <Ionicons
            name={isFavorite ? 'star' : 'star-outline'}
            size={30}
            color={colors.GREEN}
          />
        </Pressable>
        <View style={styles.userContainer}>
          <Avatar
            name={contact?.name}
            surname={contact?.surname}
            size={sizes.LARGE}
          />
          <Text style={styles.fullName}>
            {convertFullName(contact?.name, contact?.surname)}
          </Text>
          <Text style={styles.job}>{contact?.job}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <CircleIconButton
            color={colors.GREEN}
            icon={
              <Ionicons
                name="chatbubble-ellipses"
                size={30}
                color={colors.WHITE}
              />
            }
          />
          <CircleIconButton
            color={colors.PURPLE}
            icon={<Ionicons name="mail" size={30} color={colors.WHITE} />}
          />
          <CircleIconButton
            onPress={handleCall}
            color={colors.BLUE}
            icon={<Ionicons name="call" size={30} color={colors.WHITE} />}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Name</Text>
          <Text style={styles.infoText}>{contact?.name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Surname</Text>
          <Text style={styles.infoText}>{contact?.surname}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Phone</Text>
          <Text style={styles.infoText}>{contact?.phone}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Email</Text>
          <Text style={styles.infoText}>{contact?.email}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Address</Text>
          <Text style={styles.infoText}>{contact?.address}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Job</Text>
          <Text style={styles.infoText}>{contact?.job}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ContactDetail;

const styles = StyleSheet.create({
  userContainer: {
    alignItems: 'center',
    padding: 10,
    height: height * 0.2,
    justifyContent: 'center',
    marginVertical: 20,
  },
  fullName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  job: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    color: colors.DARK_GRAY,
  },
  buttonContainer: {
    alignItems: 'center',
    height: height * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 10,
  },
  infoContainer: {
    backgroundColor: colors.GRAY,
    height: height * 0.1,
    marginTop: 10,
    borderRadius: 5,
    justifyContent: 'center',
    padding: 10,
  },
  infoTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.BLACK,
  },
  infoText: {
    fontSize: 17,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: colors.BLACK,
  },
});
