import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: "",
    role: "buyer",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSignInClick = () => {
    navigate("/");
  };
  const validateForm = () => {
    const { name,email, password, role } = formData;
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!role) newErrors.role = "Role is required";
    else if (password.length < 6)
      newErrors.password = "Must be at least 6 characters";
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/register",
        formData
      );
      if (response?.data?.status === "success") {
        alert(response?.data?.message);
        navigate("/"); // Redirect to sign-in after successful signup
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
      <div class="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <form onSubmit={handleSubmit}>
          <div class="flex flex-col justify-center p-4 md:p-8">
            <span class="mb-3 text-4xl font-bold">Sign up </span>
            <span class="font-light text-gray-400 mb-2">
              Welcome! Please enter your details
            </span>
            <div class="py-4">
              <span class="mb-2 text-md">Name</span>
              <input
                type="text"
                class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="name"
                id="name"
                onChange={handleInputChange}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name}</span>
              )}
            </div>
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
            <div class="py-4">
              <span class="mb-2 text-md">Role</span>
              <div>
                <select
                  onChange={handleInputChange}
                  class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                >
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </select>
              </div>
              {errors.role && (
                <span className="text-red-500 text-sm">{errors.role}</span>
              )}
            </div>
            <button
              class="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>

            <div class="text-center text-gray-400">
              Already have an account?
              <span
                class="font-bold text-blue-600 underline"
                onClick={handleSignInClick}
              >
                Sign In{" "}
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
