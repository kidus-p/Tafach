import React from 'react';

const HighlightedSection = () => {
  return (
    <div className="bg-gray-200 p-10 rounded-lg shadow-lg mt-16">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Featured Recipes</h2>
      <p className="text-gray-800 mb-8 text-center text-lg leading-relaxed">
        Dive into our curated selection of must-try recipes, each a standout in Ethiopian cuisine. From savory dishes to sweet delights, these highlights represent the essence of culinary excellence.
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        {/* Example highlighted items */}
        <div className="bg-white p-8 rounded-lg shadow-xl w-full md:w-1/3 transform transition-transform hover:scale-105">
          <img src="https://via.placeholder.com/300" alt="Spicy Injera" className="w-full h-48 object-cover rounded-t-lg mb-4" />
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Spicy Injera</h3>
          <p className="text-gray-700 mb-4">
            Experience the zest of traditional Ethiopian flatbread with a fiery kick. Perfectly paired with your favorite dishes for an unforgettable dining experience.
          </p>
          <a href="#spicy-injera" className="text-blue-700 hover:text-blue-900 font-medium">Discover the Recipe</a>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-xl w-full md:w-1/3 transform transition-transform hover:scale-105">
          <img src="https://via.placeholder.com/300" alt="Beef Tibs" className="w-full h-48 object-cover rounded-t-lg mb-4" />
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Beef Tibs</h3>
          <p className="text-gray-700 mb-4">
            Savor the rich flavors of sautéed beef, seasoned with aromatic spices and fresh vegetables. A quintessential Ethiopian dish that captivates the palate.
          </p>
          <a href="#beef-tibs" className="text-blue-700 hover:text-blue-900 font-medium">Explore the Recipe</a>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-xl w-full md:w-1/3 transform transition-transform hover:scale-105">
          <img src="https://via.placeholder.com/300" alt="Tej" className="w-full h-48 object-cover rounded-t-lg mb-4" />
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Tej</h3>
          <p className="text-gray-700 mb-4">
            Indulge in Tej, a traditional Ethiopian honey wine with a distinct flavor profile. Perfect for celebrations and moments of joy.
          </p>
          <a href="#tej" className="text-blue-700 hover:text-blue-900 font-medium">Learn More</a>
        </div>
      </div>
    </div>
  );
};

export default HighlightedSection;
