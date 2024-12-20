import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SearchResults = () => {
  const location = useLocation();
  const { searchTerm, searchResults } = location.state || { searchTerm: '', searchResults: [] };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-[1280px] mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Search Results</h1>
          <p className="text-gray-600">Results for "{searchTerm}"</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {searchResults.map((result) => (
            <div 
              key={result.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <span className="text-sm text-gray-500 mb-2 block">{result.category}</span>
                <h2 className="text-xl font-semibold mb-3">{result.title}</h2>
                <p className="text-gray-600 mb-4">{result.description}</p>
                <button className="text-black font-medium hover:underline">
                  Read more →
                </button>
              </div>
            </div>
          ))}
        </div>

        {searchResults.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No results found for your search.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults;