import * as React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { FaBars, FaTimes } from 'react-icons/fa';
import Search from '../pages/Search';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navbarClass = classNames(
    'bg-black text-white max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center rounded-3xl px-4 lg:px-8 py-4 md:py-0 md:h-[88px] shadow-lg',
    'mt-10'
  );

  const navItems = [
    { name: 'Indonesia', path: '/' },
    { name: 'Programming', path: '/programming' },
    { name: 'Saved', path: '/saved' }
  ];

  return (
    <div className="px-4 lg:px-8">
      <nav className={navbarClass}>
        {/* Logo and Hamburger */}
        <div className="w-full md:w-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold font-inter hover:text-gray-300 transition-colors">
            Claritas News
          </Link>
          <button
            className="md:hidden text-white hover:text-gray-300 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Center Navigation Links */}
        <div className={`${isMenuOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 mt-4 md:mt-0`}>
          {navItems.map((item) => (
            <Link
              to={item.path}
              key={item.name}
              className="text-lg font-medium font-inter hover:text-gray-300 transition-colors text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Search Input */}
        <Search />
      </nav>
    </div>
  );
};

export default Navbar;