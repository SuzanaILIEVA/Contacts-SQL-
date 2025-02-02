import {createAsyncThunk} from '@reduxjs/toolkit';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
  name: 'ContactsDatabase',
});

// const deleteContact = createAsyncThunk(
//   'contacts/deleteContact',
//   async contact_id => {
//     try {
//       db.transaction(txn => {
//         txn.executeSql(
//           `DELETE FROM users WHERE id = ${contact_id}`,
//           [],
//           (sqlTxn, res) => {
//             console.log('silme basarili ');
//             if (res.rows.length > 0) {
//               for (let i = 0; i < res.rows.length; i++) {
//                 let item = res.rows.item(i);
//                 console.log('silinen kisi: ', item);
//               }
//             }
//           },
//           error => {
//             console.log('Hata', error.message);
//           },
//         );
//       });
//     } catch (error) {}
//   },
// );

const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async contact_id => {
    try {
      db.transaction(txn => {
        // Önce kişiyi sil
        txn.executeSql(
          `DELETE FROM users WHERE id = ?`,
          [contact_id],
          () => console.log(`Kişi (ID: ${contact_id}) silindi.`),
          error => console.log('Hata:', error.message),
        );

        // Ardından bu kişiye ait tüm arama kayıtlarını temizle
        txn.executeSql(
          `DELETE FROM calls WHERE resent_id = ?`,
          [contact_id],
          () =>
            console.log(
              `Kişiye ait aramalar (resent_id: ${contact_id}) temizlendi.`,
            ),
          error => console.log('Hata:', error.message),
        );
      });
    } catch (error) {
      console.log('Hata:', error);
    }
  },
);

export const cleanDeletedCalls = createAsyncThunk(
  'contacts/cleanDeletedCalls',
  async () => {
    try {
      db.transaction(txn => {
        txn.executeSql(
          `DELETE FROM calls WHERE resent_id NOT IN (SELECT id FROM users)`,
          [],
          () =>
            console.log('Silinmiş kişilere ait arama kayıtları temizlendi.'),
          error => console.log('Hata:', error.message),
        );
      });
    } catch (error) {
      console.log('Hata:', error);
    }
  },
);

export {deleteContact};
