import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Indonesia';
import Programming from './pages/Programming';
import Saved from './pages/Saved';
import SearchResults from './pages/Search';
import DetailArticle from './pages/DetailArticle'; 

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 300000,
      cacheTime: 900000,
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.error('Query error:', error);
      }
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/programming" element={<Programming />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/article/:id" element={<DetailArticle />} /> 
      </Routes>
    </QueryClientProvider>
  );
}

export default App;