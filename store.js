// store.js
import { configureStore } from '@reduxjs/toolkit';
import boardSlice from './Slice/boardSlice';

const store = configureStore({
  reducer: {
   board : boardSlice,

  },
});

export default store;


