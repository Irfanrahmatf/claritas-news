import axios from 'axios';
import axiosRateLimit from 'axios-rate-limit';

// API key untuk News API
const NEWS_API_KEY = 'abf6c658217a49b29a04a5504e07876f';
const NEWS_BASE_URL = 'https://newsapi.org/v2';

// API key untuk NYC API (asumsikan Anda memiliki API key ini)
const NYC_API_KEY = '39eDgTG9zN1v3rK8E9sNSdApLrRAYuSR';
const NYC_BASE_URL = 'https://api.nytimes.com/svc'; // Ganti dengan URL NYC API yang sesuai

// Create axios instance with rate limiting (max 5 requests per second)
const newsApi = axiosRateLimit(axios.create({
  baseURL: NEWS_BASE_URL,
  headers: {
    'X-Api-Key': NEWS_API_KEY
  }
}), { maxRequests: 5, perMilliseconds: 1000 });

// Create axios instance for NYC API
const nycApi = axiosRateLimit(axios.create({
  baseURL: NYC_BASE_URL,
  headers: {
    'X-Api-Key': NYC_API_KEY
  }
}), { maxRequests: 5, perMilliseconds: 1000 });

// Helper function to handle API errors
const handleApiError = (error, defaultMessage) => {
  console.error('API Error:', error);
  throw new Error(
    error.response?.data?.message ||
    error.response?.statusText ||
    defaultMessage
  );
};

// Fetch Indonesia News (Top Headlines)
export const getIndonesiaNews = async (page = 1, from, to) => {
  try {
    const response = await newsApi.get('/everything', {
      params: {
        q: 'Indonesia', // Cari berita tentang Indonesia
        language: 'id', // Bahasa Indonesia
        sortBy: 'publishedAt', // Urutkan berdasarkan tanggal terbaru
        page,
        pageSize: 10,
        from, // Tanggal mulai
        to, // Tanggal akhir
      },
    });

    console.log('API Response (Indonesia News):', response.data); // Log respons API

    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to fetch Indonesia news');
  }
};

// Fetch Programming News (Everything)
export const getProgrammingNews = async (page = 1) => {
  try {
    const response = await newsApi.get('/everything', {
      params: {
        q: 'programming OR coding OR software development', // Query for programming-related news
        language: 'en', // Bahasa Inggris
        sortBy: 'publishedAt', // Urutkan berdasarkan tanggal terbaru
        page,
        pageSize: 10 // Number of articles per page
      }
    });

    if (!response.data.articles) {
      throw new Error('Invalid response format');
    }

    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to fetch programming news');
  }
};

// Fetch Technology News (Everything)
export const getTechnologyNews = async (page = 1) => {
  try {
    const response = await newsApi.get('/everything', {
      params: {
        q: 'technology', // Query for technology-related news
        language: 'en,id', // Bahasa Inggris dan Indonesia
        sortBy: 'publishedAt', // Urutkan berdasarkan tanggal terbaru
        page,
        pageSize: 10 // Number of articles per page
      }
    });

    if (!response.data.articles) {
      throw new Error('Invalid response format');
    }

    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to fetch technology news');
  }
};

// Fetch Latest News (Everything)
export const getLatestNews = async (page = 1) => {
  try {
    const response = await newsApi.get('/everything', {
      params: {
        q: 'Indonesia', // Cari berita tentang Indonesia
        language: 'id', // Bahasa Indonesia
        sortBy: 'publishedAt', // Urutkan berdasarkan tanggal terbaru
        page,
        pageSize: 10,
      },
    });

    console.log('API Response (Latest News):', response.data); // Log respons API

    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to fetch latest news');
  }
};

// Fetch NYC News (Custom API)
export const getNYCNews = async (page = 1) => {
  try {
    const response = await nycApi.get('/news', {
      params: {
        page,
        pageSize: 10 // Number of articles per page
      }
    });

    if (!response.data.articles) {
      throw new Error('Invalid response format');
    }

    console.log('API Response (NYC News):', response.data); // Log respons API

    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to fetch NYC news');
  }
};