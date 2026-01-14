import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
    theme: themeReducer,
  },
});