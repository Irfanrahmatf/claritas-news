import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const allContent = [
  {
    id: 1,
    title: "Introduction to React Hooks",
    category: "Programming",
    description: "Learn about React Hooks and how to use them effectively"
  },
  {
    id: 2,
    title: "Belajar JavaScript Modern",
    category: "Programming",
    description: "Panduan lengkap JavaScript ES6+"
  },
  {
    id: 3,
    title: "Politik Indonesia Terkini",
    category: "Indonesia",
    description: "Berita politik terbaru dari Indonesia"
  },
  {
    id: 4,
    title: "Ekonomi Digital Indonesia",
    category: "Indonesia",
    description: "Perkembangan ekonomi digital di Indonesia"
  }
];

const Search = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [showResults, setShowResults] = React.useState(false);
  const searchRef = React.useRef(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim()) {
      const filtered = allContent.filter(item => 
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.category.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filtered);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const categorySearch = allContent.find(item => 
      item.category.toLowerCase() === searchTerm.toLowerCase()
    );

    if (categorySearch) {
      navigate(`/${searchTerm.toLowerCase()}`, { 
        state: { searchResults: searchResults }
      });
    } else {
      navigate('/search', { 
        state: { 
          searchTerm,
          searchResults 
        }
      });
    }
    setShowResults(false);
  };

  return (
    <div ref={searchRef} className="relative w-full md:w-auto">
      <form onSubmit={handleSearchSubmit}>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaSearch className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="rounded-full pl-10 pr-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-gray-400 w-full md:w-[200px] transition-all duration-300"
            placeholder="Search"
          />
        </div>

        {/* Search Results Dropdown */}
        {showResults && searchResults.length > 0 && (
          <div className="absolute mt-2 w-full md:w-[300px] bg-white rounded-lg shadow-lg z-50 max-h-[400px] overflow-y-auto">
            {searchResults.map((result) => (
              <div
                key={result.id}
                className="p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  navigate('/search', { 
                    state: { 
                      searchTerm: result.title,
                      searchResults: [result] 
                    }
                  });
                  setShowResults(false);
                }}
              >
                <h4 className="text-sm font-medium text-gray-900">{result.title}</h4>
                <p className="text-xs text-gray-500">{result.category}</p>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default Search;