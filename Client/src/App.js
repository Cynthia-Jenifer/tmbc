import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from './route';
import Signin from "./Auth/signin";
import Signup from "./Auth/signup";
import NotFound from "./Auth/notfound";
import Buyer from './Buyer/index'
import ProductCard from './Buyer/productCard'
import ProductDetails from './Buyer/productDetails'


import Seller from './Seller/index'


function App() {
  const [user, setUser] = useState(null);
  console.log(user,"check")

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
   <div>
      <Router>
        <Routes>
        <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Signin onLogin={handleLogin}/>} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/products"
            element={
             
                <ProductCard />
           
            }
          />
          <Route
            path="/product-detail"
            element={
             
                <ProductDetails />
            
            }
          />


          <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              role={user?.role}
              allowedRoles={['admin', 'user']}
            >
              {user?.role === 'admin' ? (
                <Seller />
              ) : (
                <Buyer />
              )}
            </ProtectedRoute>
          }
        />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
