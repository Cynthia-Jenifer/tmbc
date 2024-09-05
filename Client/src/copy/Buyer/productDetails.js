import React from 'react'
import Shirt from '../Images/Shirt.png';
import Logo from "../Images/Logo.png";
import Search from "./search";


function ProductDetails({productDescription}) {
console.log(productDescription,"check this")
  return (
    <>
      <div className=" m-2 flex flex-col bg-[#292929] p-8 rounded-lg text-white">
      {/* Title */}
      <h1 className="font-Satoshi font-bold text-3xl mb-6">
       {productDescription?.product_name}
      </h1>

      <div className="flex">
        {/* Thumbnails */}
        <div className="flex flex-col gap-4">
          <img
            src={Shirt}
            alt="Thumbnail 1"
            className="w-16 h-16 rounded-lg"
          />
          <img
            src={Shirt}
            alt="Thumbnail 2"
            className="w-16 h-16 rounded-lg"
          />
          <img
            src={Shirt}
            alt="Thumbnail 3"
            className="w-16 h-16 rounded-lg"
          />
        </div>

        {/* Main Product Image */}
        <div className="ml-8">
          <img
            src={Shirt}
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
        <button className="px-4 py-2 bg-[white] text-black rounded font-semibold">
          Overview
        </button>
        <button className="px-4 py-2 bg-gray-800 text-[white] rounded font-semibold">
          Specifications
        </button>
        <button className="px-4 py-2 bg-gray-800 text-[white] rounded font-semibold">
          Reviews
        </button>
      </div>

      {/* Product Description */}
      <div className="text-gray-400 mb-6">
        <h2 className="font-bold text-xl mb-2">Product Description</h2>
        <p>
          Tees Collection specialize in making men's clothes with characteristics of fashionable,
          comfortable and elegant. To show a kind of fashionable and special dressing style, appear
          the person's vigorous and vitality personality, and express his active and optimistic attitude
          of life. Wear our professional design high quality men's shirts, you will become more elegant
          and fascinating. Our designers are attention to every detail of the design and pursue exquisite
          sewing process.
        </p>
      </div>

      {/* Buy Now Button */}
      <div className="flex justify-center">
        <button className="w-full py-3 bg-white text-black rounded-full font-semibold">
          Buy Now
        </button>
      </div>
    </div>
    </>
  
  )
}

export default ProductDetails