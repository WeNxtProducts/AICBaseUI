import { configureStore } from '@reduxjs/toolkit';
import { configurePersistor, persistedReducer } from './persistConfig';

const store = configureStore({
 reducer: persistedReducer,
 middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
   serializableCheck: false,
  }),
});

export const persistor = configurePersistor(store);

export default store;
