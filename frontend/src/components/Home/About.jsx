import React from 'react';
import aboutImage from '../../assets/pinkCakeAbout.webp'; 

const About = () => {
  return (
    <div className='max-w-[1320px] mx-auto py-12 px-6 md:py-20 flex flex-wrap items-center bg-white'>
      
      <div className='w-full md:w-1/2 flex justify-center'>
        <img className='w-full h-auto object-cover rounded-xl shadow-xl' src={aboutImage} alt="About Gabbata" />
      </div>

      <div className='w-full md:w-1/2 md:pl-12 mt-8 md:mt-0'>
        <h2 className='text-5xl font-extrabold text-gray-800 mb-6 leading-tight'>About Gabbata</h2>
        <p className='text-gray-600 mb-6 text-lg leading-relaxed'>
          Welcome to Gabbata, your ultimate destination for exploring the rich and diverse flavors of Ethiopian cuisine. At Gabbata, we are passionate about bringing the heart of Ethiopia to your kitchen through an extensive collection of traditional and modern recipes. Our goal is to inspire home cooks and food enthusiasts alike by offering easy-to-follow recipes that highlight the unique spices and ingredients that make Ethiopian cuisine so special.
        </p>
        <p className='text-gray-600 mb-6 text-lg leading-relaxed'>
          Our mission at Gabbata is to make Ethiopian cooking accessible and enjoyable for everyone. We strive to provide high-quality, authentic recipes that capture the essence of Ethiopian culinary traditions. Whether you're a seasoned cook or a beginner, our app offers detailed instructions and helpful tips to guide you through each recipe. With Gabbata, you can create delicious, memorable meals that celebrate Ethiopia’s rich culinary heritage.
        </p>
      </div>

    </div>
  );
}

export default About;
