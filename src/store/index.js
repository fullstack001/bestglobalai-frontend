import { configureStore } from '@reduxjs/toolkit';
import ebookReducer from './ebookSlice';

export const store = configureStore({
  reducer: {
    ebook: ebookReducer,
  },
});

export default store;