import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import defaultScreenStyle from '../../styles/defaultScreenStyle';
import SQLite from 'react-native-sqlite-storage';
import ResentItem from '../../components/resents/ResentItem';
import {useDispatch, useSelector} from 'react-redux';
import {setPending, setResent} from '../../store/slice/contactSlice';
import {colors} from '../../theme/colors';
import {height} from '../../utils/constant';
import {cleanDeletedCalls} from '../../store/actions/contactAction';
import {useFocusEffect} from '@react-navigation/native';

const db = SQLite.openDatabase({
  name: 'ContactsDatabase',
});
const Resents = () => {
  const dispatch = useDispatch();
  // const [resents, setResents] = useState([]);
  const {resents, pending} = useSelector(state => state.contactStore);

  // Aramalarin veritabanından  getirilmesi için  fonksiyon
  console.log('RESENTS=>', resents);

  const getResents = () => {
    dispatch(setPending(true));
    db.transaction(txn => {
      txn.executeSql(
        `SELECT calls.*, users.name, users.surname FROM calls 
       LEFT JOIN users ON calls.resent_id = users.id 
       WHERE users.id IS NOT NULL`, // Sadece mevcut kullanıcılar
        [],
        (sqlTxn, res) => {
          console.log('resent Gelen Veri:', res.rows.length);
          let fetchedResent = [];
          for (let i = 0; i < res.rows.length; i++) {
            fetchedResent.push(res.rows.item(i));
          }
          dispatch(setResent(fetchedResent)); // Redux store güncelle
        },
        error => console.log('Hata:', error.message),
      );
      dispatch(setPending(false));
    });
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(cleanDeletedCalls()); // Eski kayıtları temizle
      getResents(); // Güncel verileri getir
    }, []),
  );
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
          data={resents}
          renderItem={({item}) => <ResentItem item={item} />}
        />
      )}
    </View>
  );
};

export default Resents;

const styles = StyleSheet.create({});
