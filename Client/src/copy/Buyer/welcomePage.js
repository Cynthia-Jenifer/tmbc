import React, { useState } from "react";
import SideBar from "./sideBar";
import Search from "./search";
import WelcomeContent from "./welcomeContent";
import ProductCard from "./productCard";
import ProductDetails from "./productDetails";

function WelcomePage() {
  const [searchInput, setSearchInput] = useState("");
  const [showProduct, setShowProduct] = useState(false);
  const [productDetail, setProductDetail] = useState(false);

  return (
    <div className="h-screen flex bg-[#161516]">
      <SideBar />
      {productDetail && <ProductDetails />}

      {!productDetail && (
        <div className=" m-2 w-full p-10  bg-gray-900  rounded-lg">
          {!showProduct && (
            <WelcomeContent
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
          )}

          {showProduct && (
            <ProductCard
              productDetail={productDetail}
              setProductDetail={setProductDetail}
            />
          )}
          <Search
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            showProduct={showProduct}
            setShowProduct={setShowProduct}
          />
        </div>
      )}
    </div>
  );
}

export default WelcomePage;
