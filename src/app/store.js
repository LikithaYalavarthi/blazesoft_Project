import { configureStore } from '@reduxjs/toolkit';
import bookStoreReducer from '../features/bookStore';

export default configureStore({
  reducer: {
    bookStore : bookStoreReducer,
  },
});
