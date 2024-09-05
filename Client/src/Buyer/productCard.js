import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Amazon from '../Images/Amazon.png';
import Flipkart from '../Images/Flipkart.png';
import Myntra from '../Images/Myntra.png';
import Rating from '../Images/Rating.png';
import SideBar from "./sideBar";
import Search from "./search";
import { useNavigate } from "react-router-dom";
import ProductDetails from './productDetails';


function ProductCard() {
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState('Recommended');
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            let url = 'https://tmbc-backend.onrender.com/getProduct';
            let data = {};
    
            if (selectedCategory === 'Lowest Price') {
                data.sortBy = 'price';
            }
            if (selectedCategory === 'Top Rated') {
                data.sortBy = 'rating';
            }
    
            try {
                // Making a POST request with the payload
                const res = await axios.post(url, data, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    transformRequest: [(data) => {
                        return Object.entries(data)
                            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                            .join('&');
                    }],
                });
    
                setProducts(res?.data?.data || []);
            } catch (err) {
                console.error(err);
            }
        };
    
        fetchProducts();
    }, [selectedCategory]);
    
    
    const handleSubmit=(product)=>{
        setSelectedProduct(product);
        navigate('/product-detail', { state: { product } });

    }
    
    
 
    const renderCardContent = () => {
        return (
            <div className="flex gap-4 mt-5">
                {products.map((product, index) => (
                    <div key={product.id}  className="max-w-xs bg-black rounded-lg overflow-hidden shadow-lg relative w-[200px] h-[250px]" onClick={()=>handleSubmit(product)}>
                        <img
                            src={product?.e_commerce_company === 'Flipkart' ? Flipkart : product?.e_commerce_company === 'Amazon' ? Amazon : Myntra}
                            alt={`${product?.e_commerce_company} Logo`}
                            className="w-8 h-8 absolute top-3 left-3"
                        />
                        <img
                            src={product?.thumbnail_url}
                            alt={product?.product_name}
                            className="w-full h-[250px] object-cover"
                        />
                        <div className="absolute bottom-3 left-3">
                            <button className="flex bg-white text-[#000000] rounded-2xl px-1 font-Satoshi font-normal text-xs">
                                {product?.rating}
                                <img
                                    src={Rating}
                                    alt=""
                                    className='m-1'
                                />
                            </button>
                            <div className="font-Satoshi font-thin text-xs text-[#E3E3E3]">
                                {product?.model}
                            </div>
                            <div className="font-Satoshi text-[#FAF9F6]">
                                {product?.product_name}
                            </div>
                            <div className="flex gap-10">
                                <p className="text-xl font-bold text-[#FAF9F6]">₹{product?.price}</p>
                                <button className="bg-[#2C2C2C] text-[#FFFFFF] rounded-2xl px-2 py-2 font-Satoshi font-medium text-sm">Shop now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    

  return (
    <>   {selectedProduct ? (
        <ProductDetails product={selectedProduct} />
    ) : (
      <div className="h-screen flex bg-[#161516]">
      <SideBar />
    <div className=" m-2 w-full p-10  bg-gray-900  rounded-lg">
  
          
                    <div className="font-Satoshi font-medium text-3xl leading-10 text-[#FFFFFF]">List of Black T-shirt</div> 
                    <div className="flex gap-4 mt-5">
                        <button
                            className={`font-Satoshi font-medium text-sm p-2 rounded-2xl ${
                                selectedCategory === 'Recommended' ? 'bg-[#2C2C2C] text-[#FAF9F6]' : 'bg-[#2C2C2C] text-[#828282]'
                            }`}
                            onClick={() => setSelectedCategory('Recommended')}
                        >
                            Recommended
                        </button>
                        <button
                            className={`font-Satoshi font-medium text-sm p-2 rounded-2xl ${
                                selectedCategory === 'Lowest Price' ? 'bg-[#2C2C2C] text-[#FAF9F6]' : 'bg-[#2C2C2C] text-[#828282]'
                            }`}
                            onClick={() => setSelectedCategory('Lowest Price')}
                        >
                            Lowest Price
                        </button>
                        <button
                            className={`font-Satoshi font-medium text-sm p-2 rounded-2xl ${
                                selectedCategory === 'Top Rated' ? 'bg-[#2C2C2C] text-[#FAF9F6]' : 'bg-[#2C2C2C] text-[#828282]'
                            }`}
                            onClick={() => setSelectedCategory('Top Rated')}
                        >
                            Top Rated
                        </button>
                    </div>

                    <div className="mt-5">
                        {renderCardContent()}
                    </div>
                    <Search/>
                
        
        </div>
        </div>
    )}
    </>
 
  
        
                    
  )
}

export default ProductCard