import {createSlice} from '@reduxjs/toolkit';
import {deleteContact} from '../actions/contactAction';

const initialState = {
  contacts: [],
  resents: [],
  pending: false,
};
const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContact: (state, action) => {
      state.contacts = action.payload;
      state.pending = false;
    },
    setPending: (state, action) => {
      state.pending = action.payload;
    },
    setResent: (state, action) => {
      state.resents = action.payload;
      state.pending = false;
    },
    setPending: (state, action) => {
      state.pending = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(deleteContact.pending, state => {})
      .addCase(deleteContact.fulfilled, state => {})
      .addCase(deleteContact.rejected, state => {});
  },
});

export const {setContact, setPending, setResent} = contactSlice.actions;

export default contactSlice.reducer;
