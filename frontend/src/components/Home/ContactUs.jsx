import React, { useState } from 'react';
import { IoIosSend, IoMdMap } from 'react-icons/io';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('All fields are required.');
      return;
    }
    // Simulate form submission
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setError('');
  };

  return (
    <div className="bg-gray-100 py-12 px-6 lg:px-12">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center text-gray-900">Contact Us</h2>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-start space-y-8 lg:space-y-0 lg:space-x-8">
          <div className="lg:w-1/3 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">Get in Touch</h3>
            <div className="flex items-center mb-4">
              <FaPhone className="text-gray-700 text-2xl mr-3" />
              <span className="text-gray-800">+251 913 173 163</span>
            </div>
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-gray-700 text-2xl mr-3" />
              <span className="text-gray-800">tizazab@example.com</span>
            </div>
            <div className="flex items-center">
              <IoMdMap className="text-gray-700 text-2xl mr-3" />
              <span className="text-gray-800">Signal Camp, A.A, Ethiopia</span>
            </div>
          </div>
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-6 text-gray-900">Send Us a Message</h3>
              {submitted && (
                <p className="mb-4 text-green-600 font-medium">Thank you for your message! We will get back to you soon.</p>
              )}
              {error && (
                <p className="mb-4 text-red-600 font-medium">{error}</p>
              )}
              <div className="mb-6">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-6">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out"
                  placeholder="Your Email"
                />
              </div>
              <div className="mb-6">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out"
                  rows="6"
                  placeholder="Your Message"
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform transform hover:scale-105 flex items-center justify-center"
              >
                <IoIosSend className="mr-2 text-xl" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
