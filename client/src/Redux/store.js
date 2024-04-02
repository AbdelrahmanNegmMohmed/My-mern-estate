import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userslise.js';
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const rootReducer =combineReducers({user:userReducer})
const prisistConfig = {key:"root",storage,version:1,}
const prisistReducer = persistReducer(prisistConfig,rootReducer)
export const store = configureStore({
  reducer: prisistReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const perisistor = persistStore(store);