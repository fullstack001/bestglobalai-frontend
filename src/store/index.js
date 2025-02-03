import { configureStore } from '@reduxjs/toolkit';
import ebookReducer from './ebookSlice';
import openPanelReducer from './openPanelSlice';


export const store = configureStore({
  reducer: {
    ebook: ebookReducer,
    openPanel: openPanelReducer,

  },
});

export default store;