import { configureStore } from '@reduxjs/toolkit';
import savedReducer from './savedSlice';
import newsReducer from './newsSlice';

const store = configureStore({
  reducer: {
    saved: savedReducer,
    news: newsReducer,
  },
});

export default store;