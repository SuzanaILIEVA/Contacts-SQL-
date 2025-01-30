import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import defaultScreenStyle from '../../styles/defaultScreenStyle';
import SQLite from 'react-native-sqlite-storage';
import Ionicons from '@react-native-vector-icons/ionicons';
import {colors} from '../../theme/colors';
import ContactItem from '../../components/contacts/ContactItem';

// Uygulama içindeki kişi (contact) bilgilerini saklamak için
// 'ContactsDatabase' adlı SQLite veritabanını açar veya yoksa oluşturur.
const db = SQLite.openDatabase({
  name: 'ContactsDatabase',
});

const Contacts = () => {
  const [users, setUsers] = useState([]);

  /**
   * not:
   * VARCHAR(n) ve TEXT Kullanımı:

SQLite'da VARCHAR(100) veya VARCHAR(500) gibi uzunluk belirtmek gereksizdir çünkü VARCHAR(n), TEXT gibi davranır. SQLite, VARCHAR için maksimum uzunluğu dikkate almaz.
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
    tabloyu oluştururken sütuna büyük/küçük harf duyarsızlık ekleyebilirsiniz:
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

  // Kullanıcıların veritabanından  getirilmesi için bir fonksiyon
  const getContacts = () => {
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
            setUsers(fetchedUsers); // Doğrudan yeni liste olarak ayarla.
          }

          // console.log('Kullanıcılar getirildi', res.rows);
        },
        error => console.log('Hata', error.message),
      );
    });
  };
  // Kullanıcıların veritabanına eklenmesi için bir fonksiyon
  const addNewContact = (name, surname, phone, email, address, job) => {
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO users (name,surname,phone,email,address,job) VALUES (?,?,?,?,?,?)',
        [name, surname, phone, email, address, job],
        (sqlTxn, res) => console.log('Kisi Eklendi '),
        error => console.log('Hata', error.message),
      );
    });
  };

  useEffect(() => {
    createContactsTable();
    createResentsTable();
    getContacts();
  }, []);

  return (
    <View style={defaultScreenStyle.container}>
      <FlatList
        data={users}
        renderItem={({item}) => <ContactItem item={item} />}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          addNewContact(
            'Mehmet',
            'Kara',
            '0316852664',
            'mehmet@gmail.com',
            'Izmir',
            'Yazilim',
          )
        }>
        <Ionicons name="add" size={30} color={colors.BLACK} />
      </TouchableOpacity>
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
});
