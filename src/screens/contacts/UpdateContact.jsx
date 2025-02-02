import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import {Formik} from 'formik';
import React, {useEffect} from 'react';
import {Input, Button} from '@ui-kitten/components';
import {newContactSchema} from '../../utils/validationSchema';
import {useDispatch} from 'react-redux';
import {setContact, setPending} from '../../store/slice/contactSlice';
import {useNavigation} from '@react-navigation/native';

const db = SQLite.openDatabase({
  name: 'ContactsDatabase',
});
const UpdateContact = ({route}) => {
  const {contact} = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Kullanıcıların veritabanında guncellenmesi için fonksiyon
  const updateContact = values => {
    db.transaction(txn => {
      txn.executeSql(
        `UPDATE users SET name=?,surname=?,phone=?,email=?,address=?,job=? WHERE id=${contact.id}`,
        [
          values.name,
          values.surname,
          values.phone,
          values.email,
          values.address,
          values.job,
        ],
        (sqlTxn, res) => console.log('Kisi guncellendi '),
        error => console.log('Hata', error.message),
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
    return () => {
      getContacts();
    };
  }, []);

  return (
    <View>
      <ScrollView>
        <Formik
          initialValues={{
            name: contact.name,
            surname: contact.surname,
            email: contact.email,
            phone: String(contact.phone),
            address: contact.address,
            job: contact.job,
          }}
          validationSchema={newContactSchema}
          onSubmit={values => {
            updateContact(values);
            getContacts(); // Redux store’u güncelle
            Alert.alert('Contact Updated');
            navigation.goBack();
          }}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <View style={styles.inputContainer}>
              <Input
                size="medium"
                placeholder="Name"
                label={'Name'}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                style={styles.input}
                caption={errors.name}
                status={errors.name ? 'danger' : 'basic'}
              />
              <Input
                size="medium"
                placeholder="Surname"
                label={'Surname'}
                onChangeText={handleChange('surname')}
                onBlur={handleBlur('surname')}
                value={values.surname}
                style={styles.input}
                caption={errors.surname}
                status={errors.surname ? 'danger' : 'basic'}
              />
              <Input
                size="medium"
                placeholder="Phone"
                label={'Phone'}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                style={styles.input}
                caption={errors.phone}
                status={errors.phone ? 'danger' : 'basic'}
              />
              <Input
                size="medium"
                placeholder="Email"
                label={'Email'}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                style={styles.input}
                caption={errors.email}
                status={errors.email ? 'danger' : 'basic'}
              />
              <Input
                size="medium"
                placeholder="Address"
                label={'Address'}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                value={values.address}
                style={styles.input}
                caption={errors.address}
                status={errors.address ? 'danger' : 'basic'}
              />
              <Input
                size="medium"
                placeholder="Job"
                label={'Job'}
                onChangeText={handleChange('job')}
                onBlur={handleBlur('job')}
                value={values.job}
                style={styles.input}
                caption={errors.job}
                status={errors.job ? 'danger' : 'basic'}
              />

              <Button onPress={handleSubmit} style={styles.btn} size="medium">
                UPDATE
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default UpdateContact;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
  input: {
    marginBottom: 10,
  },
  btn: {
    marginVertical: 30,
    padding: 10,
  },
});
