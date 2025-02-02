import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Avatar from '../contacts/Avatar';
import {convertFullName} from '../../utils/functions';
import Ionicons from '@react-native-vector-icons/ionicons';
import {colors} from '../../theme/colors';
import SQLite from 'react-native-sqlite-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setFavorites} from '../../store/slice/contactSlice';

const db = SQLite.openDatabase({
  name: 'ContactsDatabase',
});
const FavoriteItem = ({contact, onRemove}) => {
  console.log('favori item ', contact.id);
  const favorites = useSelector(state => state.contactStore.favorites);

  const dispatch = useDispatch();

  const removeFavorite = contact => {
    db.transaction(txn => {
      txn.executeSql(
        'DELETE FROM favorites WHERE contact_id = ?',
        [contact.id],
        (sqlTxn, res) => {
          console.log('Favori kaldırıldı!');
          //  Redux state'teki favoriler listesinden sadece silinen kişiyi çıkar
          const updatedFavorites = favorites.filter(
            fav => fav.id !== contact.id,
          );
          dispatch(setFavorites(updatedFavorites));

          onRemove(); //Favoriler güncellensin diye `getFavorites()` çağırıyoruz
          setTimeout(() => {
            Alert.alert('Favorite deleted');
          }, 200);
        },
        error => console.log('Hata:', error.message),
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.firstrow}>
        <Avatar name={contact?.name} surname={contact?.surname} size="small" />
        <Text style={styles.name}>
          {convertFullName(contact?.name, contact?.surname)}
        </Text>
      </View>
      <Pressable
        onPress={() => {
          removeFavorite(contact);
        }}>
        <Ionicons name="trash" size={30} color={colors.RED} />
      </Pressable>
    </View>
  );
};

export default FavoriteItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
  },
  firstrow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
