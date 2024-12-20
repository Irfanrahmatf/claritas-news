import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaBookmark } from 'react-icons/fa';
import { fetchLatestNews } from '../redux/newsSlice'; // Pastikan ini sudah dikonfigurasi dengan News API
import { saveArticle, unsaveArticle } from '../redux/savedSlice';

const BlogGrid = ({ selectedTopic }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const savedArticles = useSelector((state) => state.saved.savedArticles);
  const latestNews = useSelector((state) => state.news.latestNews);

  // State untuk menyimpan artikel yang sudah diacak
  const [shuffledNews, setShuffledNews] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const randomPage = Math.floor(Math.random() * 5) + 1; // Ambil halaman secara acak (1-5)
        await dispatch(fetchLatestNews(randomPage)); // Kirim halaman acak ke fetchLatestNews
      } catch (err) {
        console.error('Error fetching latest news:', err);
        setError('Error fetching latest news');
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [dispatch]);

  // Fungsi untuk mengacak array (Fisher-Yates Shuffle)
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Acak artikel setiap kali latestNews berubah
  React.useEffect(() => {
    if (latestNews.length > 0) {
      const shuffled = shuffleArray(latestNews);
      setShuffledNews(shuffled);
    }
  }, [latestNews]);

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

  if (loading && latestNews.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-600">Loading articles...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (shuffledNews.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-600">No articles available</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shuffledNews
          .filter((article) => article.urlToImage) // Filter artikel yang memiliki gambar
          .filter((article) => selectedTopic ? article.category === selectedTopic : true) // Filter berdasarkan topik
          .slice(0, 9) // Batasi hanya 9 artikel
          .map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg shadow-md overflow-hidden relative hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => window.open(article.url, '_blank', 'noopener,noreferrer')}
            >
              <div className="relative">
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <div className="p-4">
                {/* <p className="text-sm text-gray-500 uppercase tracking-wider">
                  {article.category}
                </p> */}
                <h3 className="text-lg font-semibold text-gray-800 mt-1 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  By {article.author} - {new Date(article.publishedAt).toLocaleDateString('id-ID')}
                </p>
              </div>

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
            </div>
          ))}
      </div>
    </div>
  );
};

export default BlogGrid;