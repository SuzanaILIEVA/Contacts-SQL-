import {createAsyncThunk} from '@reduxjs/toolkit';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
  name: 'ContactsDatabase',
});

const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async contact_id => {
    try {
      db.transaction(txn => {
        txn.executeSql(
          `DELETE FROM users WHERE id = ${contact_id}`,
          [],
          (sqlTxn, res) => {
            console.log('silme basarili ');
            if (res.rows.length > 0) {
              for (let i = 0; i < res.rows.length; i++) {
                let item = res.rows.item(i);
                console.log('silinen kisi: ', item);
              }
            }
          },
          error => {
            console.log('Hata', error.message);
          },
        );
      });
    } catch (error) {}
  },
);

export {deleteContact};
