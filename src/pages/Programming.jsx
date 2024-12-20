import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaBookmark } from 'react-icons/fa';
import { fetchProgrammingNews, fetchNYCNews } from '../redux/newsSlice';
import { saveArticle, unsaveArticle } from '../redux/savedSlice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ArticleCard = ({ article, isBookmarked, toggleBookmark }) => {
  const navigate = useNavigate();

  const handleReadMore = (e) => {
    e.preventDefault();
    navigate(`/article/${article.id}`, {
      state: { article }
    });
  };

  return (
    <div className="mb-8">
      <div className="relative h-64 rounded-lg overflow-hidden">
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(article);
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors"
          aria-label={isBookmarked(article) ? 'Remove bookmark' : 'Add bookmark'}
        >
          <FaBookmark
            className={`w-5 h-5 transition-colors ${
              isBookmarked(article) ? 'text-yellow-400' : 'text-white'
            }`}
          />
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
        <p className="text-gray-600 mb-3">{article.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            By {article.author} - {new Date(article.publishedAt).toLocaleDateString('id-ID')}
          </span>
          <button
            onClick={handleReadMore}
            className="text-sm font-medium flex items-center gap-2"
          >
            Read More
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 12L10 8L6 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const Programming = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const savedArticles = useSelector((state) => state.saved.savedArticles);
  const programmingNews = useSelector((state) => state.news.programmingNews);
  const nycNews = useSelector((state) => state.news.nycNews);

  const [cachedProgrammingNews, setCachedProgrammingNews] = React.useState(
    JSON.parse(localStorage.getItem('programmingNews')) || []
  );
  const [cachedNYCNews, setCachedNYCNews] = React.useState(
    JSON.parse(localStorage.getItem('nycNews')) || []
  );

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (cachedProgrammingNews.length > 0 || cachedNYCNews.length > 0) {
          console.log('Using cached data from localStorage');
        } else {
          try {
            await dispatch(fetchNYCNews());
          } catch (nycError) {
            console.warn('NYC API failed, switching to News API.');
            await dispatch(fetchProgrammingNews());
          }
        }
      } catch (err) {
        console.error('Error fetching programming news:', err);
        setError('Error fetching programming news');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, cachedProgrammingNews, cachedNYCNews]);

  React.useEffect(() => {
    if (programmingNews.length > 0) {
      localStorage.setItem('programmingNews', JSON.stringify(programmingNews));
    }
    if (nycNews.length > 0) {
      localStorage.setItem('nycNews', JSON.stringify(nycNews));
    }
  }, [programmingNews, nycNews]);

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

  if (loading && programmingNews.length === 0 && nycNews.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-gray-600">Loading articles...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-red-500">{error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  const articlesToDisplay =
    cachedNYCNews.length > 0 ? cachedNYCNews : cachedProgrammingNews.length > 0 ? cachedProgrammingNews : nycNews.length > 0 ? nycNews : programmingNews;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-[1280px] mx-auto px-4 py-12">
        <div className="text-center mb-12 mt-10">
          <h1 className="text-4xl font-bold mb-4">Programming News</h1>
          <p className="text-gray-600">
            Latest updates from the world of technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articlesToDisplay
            .filter((article) => article.urlToImage)
            .map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                isBookmarked={isBookmarked}
                toggleBookmark={toggleBookmark}
              />
            ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Programming;
