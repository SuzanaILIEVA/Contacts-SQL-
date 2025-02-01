import {configureStore} from '@reduxjs/toolkit';
import contactSlice from './slice/contactSlice';
const store = configureStore({
  reducer: {
    contactStore: contactSlice,
  },
});

export default store;
