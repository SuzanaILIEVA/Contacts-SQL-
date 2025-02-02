import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import SQLite from 'react-native-sqlite-storage';
import defaultScreenStyle from '../../styles/defaultScreenStyle';
import FavoriteItem from '../../components/favorites/FavoriteItem';
import {useDispatch, useSelector} from 'react-redux';
import {setFavorites} from '../../store/slice/contactSlice';

const db = SQLite.openDatabase({
  name: 'ContactsDatabase',
});
const Favorites = ({route}) => {
  // const {contact} = route.params;
  const dispatch = useDispatch();
  const {favorites} = useSelector(state => state.contactStore);

  //  **Favorileri SQLite'dan Çekme Fonksiyonu**
  const getFavorites = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT users.* FROM favorites 
         INNER JOIN users ON favorites.contact_id = users.id`,
        [],
        (sqlTxn, res) => {
          let fetchedFavorites = [];
          for (let i = 0; i < res.rows.length; i++) {
            fetchedFavorites.push(res.rows.item(i));
          }
          dispatch(setFavorites(fetchedFavorites));
        },
        error => console.log('Hata:', error.message),
      );
    });
  };

  // **Sayfa Açılınca Favorileri Yükle**
  useEffect(() => {
    getFavorites();
  }, []);
  return (
    <View style={defaultScreenStyle.container}>
      <FlatList
        data={favorites}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <FavoriteItem contact={item} onRemove={getFavorites} />
        )}
      />
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({});
