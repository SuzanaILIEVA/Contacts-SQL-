import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import defaultScreenStyle from '../../styles/defaultScreenStyle';
import SQLite from 'react-native-sqlite-storage';
import ResentItem from '../../components/resents/ResentItem';
import {useDispatch, useSelector} from 'react-redux';
import {setPending, setResent} from '../../store/slice/contactSlice';

const db = SQLite.openDatabase({
  name: 'ContactsDatabase',
});
const Resents = () => {
  const dispatch = useDispatch();
  // const [resents, setResents] = useState([]);
  const {resents, pending} = useSelector(state => state.contactStore);
  // Aramalarin veritabanından  getirilmesi için  fonksiyon
  console.log(resents);

  const getResents = () => {
    dispatch(setPending(true));
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM calls',
        [],
        (sqlTxn, res) => {
          console.log('resent Gelen Veri ', res.rows.length);
          if (res.rows.length > 0) {
            let fetchedResent = [];
            for (let i = 0; i < res.rows.length; i++) {
              fetchedResent.push(res.rows.item(i));
            }
            // setResents(fetchedResent); // Doğrudan yeni liste olarak ayarl
            dispatch(setResent(fetchedResent));
          }
          dispatch(setPending(false));
          // console.log('resents getirildi', res.rows);
        },
        error => console.log('Hata', error.message),
        dispatch(setPending(false)),
      );
    });
  };
  useEffect(() => {
    return () => {
      getResents(); // Aramaların getirilmesi için arka planda fonksiyon çağrıldı.
      // Bu fonksiyonda veritabanından aramaların getirilmesi sağlanacak.
    };
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
