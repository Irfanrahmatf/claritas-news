import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { FaBookmark } from 'react-icons/fa';
import { fetchIndonesiaNews, fetchNYCNews } from '../redux/newsSlice'; // Pastikan ini sudah dikonfigurasi dengan News API
import { saveArticle, unsaveArticle } from '../redux/savedSlice';

const BentoGrid = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const savedArticles = useSelector((state) => state.saved.savedArticles);
  const indonesiaNews = useSelector((state) => state.news.indonesiaNews);
  const nycNews = useSelector((state) => state.news.nycNews);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Coba ambil data dari News API terlebih dahulu
        try {
          await dispatch(fetchIndonesiaNews());
        } catch (newsError) {
          console.warn('News API failed, switching to NYC API.');
          await dispatch(fetchNYCNews()); // Gunakan NYC API sebagai fallback
        }
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Error fetching news');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const isBookmarked = (article) => {
    return savedArticles.some((saved) => saved.id === article.id);
  };

  const toggleBookmark = (article) => {
    if (isBookmarked(article)) {
      dispatch(unsaveArticle(article));
    } else {
      dispatch(saveArticle(article));
    }
  };

  if (loading && indonesiaNews.length === 0 && nycNews.length === 0) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-8">{error}</div>;
  }

  // Gunakan data dari News API jika tersedia, jika tidak, gunakan NYC API
  const articlesToDisplay = indonesiaNews.length > 0 ? indonesiaNews : nycNews;

  if (articlesToDisplay.length === 0) {
    return <div className="text-center p-8">No news available</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {articlesToDisplay
          .filter((article) => article.urlToImage) // Filter artikel yang memiliki gambar
          .map((article, index) => (
            <div
              key={article.id}
              className={classNames(
                "relative rounded-3xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer",
                {
                  'sm:col-span-2 lg:col-span-2 lg:row-span-4': index === 0, // Artikel pertama lebih besar
                  'lg:row-span-2': index > 0 && index < 4, // Artikel berikutnya lebih kecil
                }
              )}
              onClick={() => window.open(article.url, '_blank', 'noopener,noreferrer')}
            >
              <div className="relative w-full h-full min-h-[200px] sm:min-h-[164px]">
                <img
                  src={article.urlToImage} // Gunakan urlToImage dari News API atau NYC API
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(article);
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors"
                  aria-label={isBookmarked(article) ? "Remove bookmark" : "Add bookmark"}
                >
                  <FaBookmark
                    className={`w-5 h-5 transition-colors ${
                      isBookmarked(article) ? "text-yellow-400" : "text-white"
                    }`}
                  />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {/* <span className="text-xs px-2 py-1 bg-white/20 rounded-full text-white">
                      {article.category || 'General'}
                    </span> */}
                    <span className="text-sm text-gray-200">
                      {new Date(article.publishedAt).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold line-clamp-2 mb-2">
                    {article.title}
                  </h3>
                  {/* <p className="text-sm text-gray-200 line-clamp-2">
                    {article.description || 'No description available'}
                  </p> */}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BentoGrid;