import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import defaultScreenStyle from '../../styles/defaultScreenStyle';
import SQLite from 'react-native-sqlite-storage';

import {colors} from '../../theme/colors';
import ContactItem from '../../components/contacts/ContactItem';
import {useDispatch, useSelector} from 'react-redux';
import {setContact, setPending} from '../../store/slice/contactSlice';
import {height} from '../../utils/constant';

// Uygulama içindeki kişi (contact) bilgilerini saklamak için
// 'ContactsDatabase' adlı SQLite veritabanını açar veya yoksa oluşturur.
const db = SQLite.openDatabase({
  name: 'ContactsDatabase',
});

const Contacts = () => {
  const {contacts, pending} = useSelector(state => state.contactStore);
  const dispatch = useDispatch();

  /**
   * not:
   * VARCHAR(n) ve TEXT Kullanımı:

SQLite'da VARCHAR(100) veya VARCHAR(500) gibi uzunluk belirtmek => VARCHAR(n), TEXT gibi davranır. SQLite, VARCHAR için maksimum uzunluğu dikkate almaz.
Alternatif olarak TEXT kullanabilirsiniz:
`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      name TEXT, 
      surname TEXT, 
      phone TEXT, 
      email TEXT, 
      address TEXT, 
      job TEXT
    )` 
    not 2:
    tabloyu oluştururken sütuna COLLATE NOCASE ile büyük/küçük harf duyarsızlık ekleyebilirsiniz:
    CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  name TEXT COLLATE NOCASE
  Bu şekilde, "Ali", "ali", "ALI" gibi değerler eşleşir.
);
   */
  // Veritabanındaki 'contacts' tablosunu oluşturur.
  const createContactsTable = () => {
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT , name VARCHAR(100), surname VARCHAR(500),phone VARCHAR(100), email VARCHAR(100), address VARCHAR(500), job VARCHAR(100))',
        [],
        (sqlTxn, res) => console.log('Tablo Olusturuldu'),
        error => console.log('Hata', error.message),
      );
    });
  };

  // Veritabanındaki 'calls' tablosunu oluşturur.
  const createResentsTable = () => {
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS calls (id INTEGER PRIMARY KEY AUTOINCREMENT , date VARCHAR(100), resent_id INTEGER , callType VARCHAR(100))',
        [],
        (sqlTxn, res) => console.log('calls Tablo Olusturuldu'),
        error => console.log('Hata', error.message),
      );
    });
  };

  const createFavoriteTables = () => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS favorites (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         contact_id INTEGER NOT NULL,
         FOREIGN KEY (contact_id) REFERENCES users(id) ON DELETE CASCADE
      );`,
        [],
        () => console.log('Favorites tablosu oluşturuldu'),
        error => console.log('Hata (favorites tablo):', error.message),
      );
    });
  };

  // Kullanıcıların veritabanından  getirilmesi için fonksiyon
  const getContacts = () => {
    dispatch(setPending(true));
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM users',
        [],
        (sqlTxn, res) => {
          console.log('Gelen Veri ', res.rows.length);
          if (res.rows.length > 0) {
            let fetchedUsers = [];
            for (let i = 0; i < res.rows.length; i++) {
              fetchedUsers.push(res.rows.item(i));
            }
            dispatch(setContact(fetchedUsers));
          }
          dispatch(setPending(false));
          // console.log('Kullanıcılar getirildi', res.rows);
        },
        error => {
          console.log('Hata', error.message);
          dispatch(setPending(false));
        },
      );
    });
  };

  useEffect(() => {
    createContactsTable();
    createResentsTable();
    createFavoriteTables();
    getContacts();
  }, []);

  return (
    <View style={defaultScreenStyle.container}>
      {pending ? (
        <ActivityIndicator
          color={colors.BLACK}
          size={'large'}
          style={{marginTop: height * 0.2}}
        />
      ) : (
        <FlatList
          ListEmptyComponent={
            <Text style={styles.not}>No people added yet!</Text>
          }
          data={contacts}
          renderItem={({item}) => <ContactItem item={item} />}
        />
      )}
    </View>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.BLUE,
    padding: 20,
    borderRadius: 100,
    margin: 10,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  not: {
    marginTop: 40,
    textAlign: 'center',
    color: colors.BLACK,
    fontSize: 20,
    flexWeight: 'bold',
  },
});
