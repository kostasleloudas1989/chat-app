import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './reducers';

// configure store
export const store = configureStore({ reducer: chatReducer });