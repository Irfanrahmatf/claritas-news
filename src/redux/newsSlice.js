import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import * as newsService from '../services/newsService';

// Helper function to add unique id and category
const formatNewsData = (articles, category) => {
  return articles.map(article => ({
    ...article,
    id: uuidv4(),  // Generate unique ID for each article
    category      // Attach category
  }));
};

// Async thunks for fetching news
export const fetchIndonesiaNews = createAsyncThunk(
  'news/fetchIndonesiaNews',
  async (page = 1, { rejectWithValue }) => {
    try {
      const toDate = new Date().toISOString();
      const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

      const response = await newsService.getIndonesiaNews(page, fromDate, toDate);
      return formatNewsData(response.articles, 'indonesia'); // Set category to 'indonesia'
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status || 500,
        details: error.response?.data || 'Unknown error',
      });
    }
  }
);

export const fetchProgrammingNews = createAsyncThunk(
  'news/fetchProgrammingNews',
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await newsService.getProgrammingNews(page);
      return formatNewsData(response.articles, 'programming'); // Set category to 'programming'
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status || 500,
        details: error.response?.data || 'Unknown error'
      });
    }
  }
);

export const fetchLatestNews = createAsyncThunk(
  'news/fetchLatestNews',
  async (page = Math.floor(Math.random() * 5) + 1, { rejectWithValue }) => {
    try {
      const response = await newsService.getLatestNews(page);
      return formatNewsData(response.articles, 'latest'); // Set category to 'latest'
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status || 500,
        details: error.response?.data || 'Unknown error',
      });
    }
  }
);

// Async thunk for fetching NYC News
export const fetchNYCNews = createAsyncThunk(
  'news/fetchNYCNews',
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await newsService.getNYCNews(page);
      return formatNewsData(response.articles, 'nyc'); // Set category to 'nyc'
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status || 500,
        details: error.response?.data || 'Unknown error',
      });
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    indonesiaNews: [],
    programmingNews: [],
    latestNews: [],
    nycNews: [], // State untuk menyimpan data NYC News
    loading: false,
    error: null,
    currentPage: {
      indonesia: 1,
      programming: 1,
      latest: 1,
      nyc: 1 // Halaman untuk NYC News
    }
  },
  reducers: {
    incrementPage: (state, action) => {
      state.currentPage[action.payload] += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      // Indonesia News
      .addCase(fetchIndonesiaNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIndonesiaNews.fulfilled, (state, action) => {
        state.loading = false;
        state.indonesiaNews = state.currentPage.indonesia === 1
          ? action.payload
          : [...state.indonesiaNews, ...action.payload];
      })
      .addCase(fetchIndonesiaNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Programming News
      .addCase(fetchProgrammingNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProgrammingNews.fulfilled, (state, action) => {
        state.loading = false;
        state.programmingNews = state.currentPage.programming === 1
          ? action.payload
          : [...state.programmingNews, ...action.payload];
      })
      .addCase(fetchProgrammingNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Latest News
      .addCase(fetchLatestNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestNews.fulfilled, (state, action) => {
        state.loading = false;
        state.latestNews = state.currentPage.latest === 1
          ? action.payload
          : [...state.latestNews, ...action.payload];
      })
      .addCase(fetchLatestNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // NYC News
      .addCase(fetchNYCNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNYCNews.fulfilled, (state, action) => {
        state.loading = false;
        state.nycNews = state.currentPage.nyc === 1
          ? action.payload
          : [...state.nycNews, ...action.payload];
      })
      .addCase(fetchNYCNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { incrementPage } = newsSlice.actions;
export default newsSlice.reducer;