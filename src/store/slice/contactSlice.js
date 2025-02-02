import {createSlice} from '@reduxjs/toolkit';
import {deleteContact} from '../actions/contactAction';

const initialState = {
  contacts: [],
  resents: [],
  favorites: [],
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

    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action) => {
      if (!state.favorites.some(fav => fav.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        fav => fav.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(deleteContact.pending, state => {})
      .addCase(deleteContact.fulfilled, state => {})
      .addCase(deleteContact.rejected, state => {});
  },
});

export const {
  setContact,
  setPending,
  setResent,
  setFavorites,
  addFavorite,
  removeFavorite,
} = contactSlice.actions;

export default contactSlice.reducer;
