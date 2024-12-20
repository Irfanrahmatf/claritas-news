import { createSlice } from '@reduxjs/toolkit';

const savedSlice = createSlice({
  name: 'saved',
  initialState: {
    savedArticles: JSON.parse(localStorage.getItem('savedArticles')) || [], // Ambil dari local storage
  },
  reducers: {
    saveArticle: (state, action) => {
      const articleExists = state.savedArticles.some(
        (article) => article.id === action.payload.id
      );
      if (!articleExists) {
        state.savedArticles.push(action.payload);
        localStorage.setItem('savedArticles', JSON.stringify(state.savedArticles)); // Simpan ke local storage
      }
    },
    unsaveArticle: (state, action) => {
      state.savedArticles = state.savedArticles.filter(
        (article) => article.id !== action.payload.id
      );
      localStorage.setItem('savedArticles', JSON.stringify(state.savedArticles)); // Update local storage
    },
  },
});

export const { saveArticle, unsaveArticle } = savedSlice.actions;
export default savedSlice.reducer;