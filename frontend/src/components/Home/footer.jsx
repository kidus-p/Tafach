import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white py-16'>
      <div className='max-w-7xl mx-auto px-6 md:px-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
          {/* Company Info */}
          <div>
            <h4 className='text-2xl font-bold mb-6'>Company</h4>
            <ul className='space-y-4'>
              <li>
                <a
                  href='#'
                  className='group relative inline-block text-white hover:text-gray-300 transition-colors duration-300'
                >
                  About Us
                  <span className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='group relative inline-block text-white hover:text-gray-300 transition-colors duration-300'
                >
                  Careers
                  <span className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='group relative inline-block text-white hover:text-gray-300 transition-colors duration-300'
                >
                  Blog
                  <span className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='group relative inline-block text-white hover:text-gray-300 transition-colors duration-300'
                >
                  Contact
                  <span className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className='text-2xl font-bold mb-6'>Support</h4>
            <ul className='space-y-4'>
              <li>
                <a
                  href='#'
                  className='group relative inline-block text-white hover:text-gray-300 transition-colors duration-300'
                >
                  Help Center
                  <span className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='group relative inline-block text-white hover:text-gray-300 transition-colors duration-300'
                >
                  FAQ
                  <span className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='group relative inline-block text-white hover:text-gray-300 transition-colors duration-300'
                >
                  Returns
                  <span className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='group relative inline-block text-white hover:text-gray-300 transition-colors duration-300'
                >
                  Shipping
                  <span className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className='text-2xl font-bold mb-6'>Contact</h4>
            <ul className='space-y-4'>
              <li>
                <a
                  href='mailto:info@example.com'
                  className='text-white hover:text-gray-300 transition-colors duration-300'
                >
                  info@example.com
                </a>
              </li>
              <li>
                <a
                  href='tel:+123456789'
                  className='text-white hover:text-gray-300 transition-colors duration-300'
                >
                  +1 (234) 567-89
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-white hover:text-gray-300 transition-colors duration-300'
                >
                  123 Main St, City
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className='text-2xl font-bold mb-6'>Follow Us</h4>
            <div className='flex space-x-6'>
              <a
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-white hover:text-blue-500 transition-colors duration-300 text-3xl transform hover:scale-110'
              >
                <i className='fab fa-facebook-f'></i>
              </a>
              <a
                href='https://twitter.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-white hover:text-blue-400 transition-colors duration-300 text-3xl transform hover:scale-110'
              >
                <i className='fab fa-twitter'></i>
              </a>
              <a
                href='https://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-white hover:text-pink-500 transition-colors duration-300 text-3xl transform hover:scale-110'
              >
                <i className='fab fa-instagram'></i>
              </a>
              <a
                href='https://linkedin.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-white hover:text-blue-600 transition-colors duration-300 text-3xl transform hover:scale-110'
              >
                <i className='fab fa-linkedin-in'></i>
              </a>
              <a
                href='https://youtube.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-white hover:text-red-500 transition-colors duration-300 text-3xl transform hover:scale-110'
              >
                <i className='fab fa-youtube'></i>
              </a>
              <a
                href='https://github.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-white hover:text-gray-400 transition-colors duration-300 text-3xl transform hover:scale-110'
              >
                <i className='fab fa-github'></i>
              </a>
            </div>
          </div>
        </div>

        <div className='mt-12 border-t border-gray-700 pt-6 text-center text-sm'>
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
