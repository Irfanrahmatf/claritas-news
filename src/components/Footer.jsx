import React from 'react';
import { FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="px-4 lg:px-8 mb-8 mt-20">
      <footer className="bg-black text-white py-12 rounded-3xl max-w-[1280px] mx-auto">
        <div className="px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Logo and Description */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Claritas News</h3>
              <p className="text-gray-400 text-sm max-w-md">
                Read and share ideas from independent voices, world-class publications, and experts from around the globe.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-lg font-medium mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm">Documentation</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm">Feedback</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm">Support</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm">Terms & Policies</a>
                </li>
              </ul>
            </div>

            {/* Column 3: Social Media */}
            <div>
              <h4 className="text-lg font-medium mb-4">Connect With Us</h4>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <FaTwitter className="text-gray-400 hover:text-white" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <FaFacebookF className="text-gray-400 hover:text-white" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <FaInstagram className="text-gray-400 hover:text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-center text-gray-400 text-sm">
              © {new Date().getFullYear()} Claritas News. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;