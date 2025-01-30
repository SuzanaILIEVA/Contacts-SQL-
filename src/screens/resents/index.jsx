import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import defaultScreenStyle from '../../styles/defaultScreenStyle';
import SQLite from 'react-native-sqlite-storage';
import ResentItem from '../../components/resents/ResentItem';

const db = SQLite.openDatabase({
  name: 'ContactsDatabase',
});
const Resents = () => {
  const [resents, setResents] = useState([]);
  // Aramalarin veritabanından  getirilmesi için  fonksiyon
  console.log(resents);

  const getResents = () => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM calls',
        [],
        (sqlTxn, res) => {
          console.log('Gelen Veri ', res.rows.length);
          if (res.rows.length > 0) {
            let fetchedResent = [];
            for (let i = 0; i < res.rows.length; i++) {
              fetchedResent.push(res.rows.item(i));
            }
            setResents(fetchedResent); // Doğrudan yeni liste olarak ayarla.
          }

          // console.log('resents getirildi', res.rows);
        },
        error => console.log('Hata', error.message),
      );
    });
  };
  useEffect(() => {
    getResents(); // Aramaların getirilmesi için arka planda fonksiyon çağrıldı.
    // Bu fonksiyonda veritabanından aramaların getirilmesi sağlanacak.
  }, []);
  return (
    <View style={defaultScreenStyle.container}>
      <FlatList
        data={resents}
        renderItem={({item}) => <ResentItem item={item} />}
      />
    </View>
  );
};

export default Resents;

const styles = StyleSheet.create({});
