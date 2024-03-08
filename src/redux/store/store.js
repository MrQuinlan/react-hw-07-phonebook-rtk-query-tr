import { configureStore } from '@reduxjs/toolkit';
import { phoneBookAPI } from 'Service/ContactsAPI';

import filterReducer from '../slices/filterSlice';

const store = configureStore({
  contacts: [],
  filter: '',

  reducer: {
    [phoneBookAPI.reducerPath]: phoneBookAPI.reducer,
    filter: filterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(phoneBookAPI.middleware),
});

// setupListeners(store.dispatch);

export default store;
