import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signin({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  console.log(formData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignupClick=()=>{
    navigate('/signup');
  }
  const validateForm = () => {
    const { email, password } = formData;
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Must be at least 6 characters";
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };
  const handleSubmit = async (e,role) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/login",
        formData
      );
      if (response?.data?.status === "success") {
        alert(response?.data?.message);
        const token = response?.data?.token; // Assuming the token is returned in response.data.token
        const name = response?.data?.name;
        if (token) {
        localStorage.setItem('authToken', token); // Save the token in local storage
        localStorage.setItem('name', name);
      }

        const user = { ...formData,role }; // Example user object
        onLogin(user);
        navigate('/dashboard');
      } else {
        alert(response?.data?.message);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      // You can handle specific error messages here
      setErrors({ api: "Failed to submit form. Please try again." });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div
      class="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
    >
      <form onSubmit={(e) => handleSubmit(e, formData.role)}>
      <div class="flex flex-col justify-center p-8 md:p-14">
        <span class="mb-3 text-4xl font-bold">Sign in</span>
      
        <div class="py-4">
          <span class="mb-2 text-md">Email</span>
          <input
            type="text"
            class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            name="email"
            id="email"
            onChange={handleInputChange}
          />
                {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
        </div>
        <div class="py-4">
          <span class="mb-2 text-md">Password</span>
          <input
            type="password"
            name="password"
            id="password"
            class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            onChange={handleInputChange}
          />
                {errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
        </div>
        {/* <div class="flex justify-between w-full py-4">
         
          <span class="font-bold text-md">Forgot password</span>
        </div> */}
        <button
          class="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
          onClick={(e) => handleSubmit(e, "admin")}

        >
          Login as Seller
        </button>
        <button
          class="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
          onClick={(e) => handleSubmit(e, "user")}

        >
          Login as Buyer
        </button>
     
        <div class="text-center text-gray-400">
          Dont'have an account?
          <span class="font-bold text-blue-600 underline" onClick={handleSignupClick}>Sign up </span>
        </div>
      </div>
      </form>
   
    
    </div>
  </div>
  )
}

export default Signin