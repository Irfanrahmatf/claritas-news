import * as React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Saved = () => {
  // Ambil savedArticles dari Redux state
  const savedArticles = useSelector((state) => state.saved.savedArticles);

  // Debugging: Log savedArticles saat komponen dimuat
  React.useEffect(() => {
    console.log('Saved Articles:', savedArticles); // Tambahkan ini untuk debugging
  }, [savedArticles]);

  // Ambil data dari localStorage jika tersedia
  const [cachedSavedArticles, setCachedSavedArticles] = React.useState(
    JSON.parse(localStorage.getItem('savedArticles')) || []
  );

  React.useEffect(() => {
    // Perbarui localStorage setiap kali savedArticles berubah
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
    setCachedSavedArticles(savedArticles);
  }, [savedArticles]);

  const handleReadClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-[1280px] mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Saved Articles</h1>
            <p className="text-gray-600 text-sm sm:text-base">Your collection of saved articles and resources</p>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Source
                    </th>
                    <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="hidden md:table-cell px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-4 sm:px-6 py-3 text-center text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cachedSavedArticles.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-4 sm:px-6 py-4 text-center text-sm text-gray-500">
                        No saved articles yet.
                      </td>
                    </tr>
                  ) : (
                    cachedSavedArticles.map((article, idx) => (
                      <tr
                        key={article.id}
                        className={`hover:bg-gray-50 transition-colors ${
                          idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}
                      >
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                          {article.source?.name || 'Unknown Source'}
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-900">
                          <div className="font-medium line-clamp-2">{article.title}</div>
                          {/* Mobile-only description */}
                          <div className="md:hidden mt-1 text-xs text-gray-500 line-clamp-2">
                            {article.description}
                          </div>
                        </td>
                        <td className="hidden md:table-cell px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-500">
                          <div className="line-clamp-2">
                            {article.description}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-center whitespace-nowrap">
                          <button
                            onClick={() => handleReadClick(article.url)}
                            className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-black rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
                          >
                            Read
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Saved;