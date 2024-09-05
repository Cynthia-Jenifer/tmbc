import React, { useState } from 'react';
import Shirt from '../Images/Shirt.png';
import Logo from "../Images/Logo.png";
import Search from "./search";
import SideBar from "./sideBar";
import { useLocation } from 'react-router-dom';


function ProductDetails() {
  const location = useLocation();
    const product = location.state?.product; 
    const [activeTab, setActiveTab] = useState('Overview');

    const images = product?.image_url && Array.isArray(product.image_url)
    ? product.image_url[0].split(',') // Handle the comma-separated string
    : [Shirt, Shirt, Shirt];
    const [mainImage, setMainImage] = useState(images[0]);

    const renderTabContent = () => {
      switch (activeTab) {
        case 'Overview':
          return (
            <div className="text-gray-400 mb-6 h-2/4">
              <h2 className="font-bold text-xl mb-2">Product Overview</h2>
              <p>{product?.description}</p>
            </div>
          );
        case 'Specifications':
          return (
            <div className="text-gray-400 mb-6 h-2/4">
              <h2 className="font-bold text-xl mb-2">Product Specifications</h2>
              <p>Here will be the product specifications like size, material, etc.</p>
            </div>
          );
        case 'Reviews':
          return (
            <div className="text-gray-400 mb-6 h-2/4">
              <h2 className="font-bold text-xl mb-2">Customer Reviews</h2>
              <p>Customer reviews will be shown here.</p>
            </div>
          );
        default:
          return null;
      }
    };
  
  return (
    <div className="h-screen flex bg-[#161516]">
      <SideBar />      <div className=" m-2 flex flex-col bg-[#292929] p-8 w-full rounded-lg text-white">
      {/* Title */}
      <h1 className="font-Satoshi font-bold text-3xl mb-6">
       {product?.product_name}
      </h1>

      <div className="flex">
        {/* Thumbnails */}
        <div className="flex flex-col gap-4">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-16 h-16 rounded-lg cursor-pointer"
                                onClick={() => setMainImage(image)} // Update main image on click
                            />
                        ))}
                    </div>


        {/* Main Product Image */}
        <div className="ml-8">
                        <img
                            src={mainImage} // Display the selected main image
                            alt="Main Product"
                            className="w-[400px] h-[400px] rounded-lg object-cover"
                        />
                    </div>
      </div>

      {/* Search and Shop Button */}
     <Search/>
    </div>
     
      <div className="bg-[#292929] m-2 w-2/4 text-white p-8 rounded-lg max-w-md mx-auto">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img
          src={Logo}
          alt="House of Models Logo"
          className="w-10 h-10"
        />
      </div>

      {/* Title */}
      <h1 className="text-center font-normal text-2xl mb-6">House of Models</h1>

      {/* Navigation Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
      <button
            className={`px-4 py-2 rounded font-semibold ${
              activeTab === 'Overview' ? 'bg-[white] text-black' : 'bg-gray-800 text-[white]'
            }`}
            onClick={() => setActiveTab('Overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 rounded font-semibold ${
              activeTab === 'Specifications' ? 'bg-[white] text-black' : 'bg-gray-800 text-[white]'
            }`}
            onClick={() => setActiveTab('Specifications')}
          >
            Specifications
          </button>
          <button
            className={`px-4 py-2 rounded font-semibold ${
              activeTab === 'Reviews' ? 'bg-[white] text-black' : 'bg-gray-800 text-[white]'
            }`}
            onClick={() => setActiveTab('Reviews')}
          >
            Reviews
          </button>
      </div>

      {/* Product Description */}
      <div className="text-gray-400 mb-6 h-2/4">
        <p>
        {renderTabContent()}
        </p>
      </div>

      {/* Buy Now Button */}
      <div className="flex justify-center">
        <button className="w-full py-3 bg-white text-black rounded-full font-semibold">
          Buy Now
        </button>
      </div>
    </div>
    </div>
  
  )
}

export default ProductDetails