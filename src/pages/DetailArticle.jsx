import * as React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DetailArticle = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { article } = location.state || {};
  const savedArticles = useSelector((state) => state.saved.savedArticles);
  
  const displayArticle = article || savedArticles.find((a) => a.id === id);

  if (!displayArticle) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Article not found</h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            Return to Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {displayArticle.title}
            </h1>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <span>{displayArticle.author}</span>
              <span>•</span>
              <span>{new Date(displayArticle.publishedAt).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
              {displayArticle.category && (
                <>
                  <span>•</span>
                  <span className="capitalize">{displayArticle.category}</span>
                </>
              )}
            </div>
          </div>

          {/* Article Image */}
          {displayArticle.urlToImage && (
            <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
              <img
                src={displayArticle.urlToImage}
                alt={displayArticle.title}
                className="w-full h-[400px] object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-6">
              {displayArticle.description}
            </p>
            
            {/* Link to original article */}
            <div className="mt-8 flex justify-center">
              <a
                href={displayArticle.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                Read Full Article
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DetailArticle;