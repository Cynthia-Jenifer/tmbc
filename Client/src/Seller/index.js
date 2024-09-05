import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Seller() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    product_name: "",
    model: "",
    price: "",
    rating:"",
    e_commerce_company:"Flipkart",
    description:"",
    category:"Black T-shirts under 300",

  });
  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);
  const [previewThumbnail, setPreviewThumbnail] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    });
    Promise.all(previews).then((previewImages) => {
      setPreviewImages(previewImages);
    });
  };

  const handleSignout=() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('name');
    alert("Logout Successfully")

    navigate('/');
  }

  const validateForm = () => {
  
    const {  product_name, model,price,rating,e_commerce_company,description,category } = formData;
    const newErrors = {};
    if (!product_name) newErrors.product_name = "Title is required";
    if (!model) newErrors.model = "Model is required";
    if (!price) newErrors.price = "Price is required";
    if (!rating) newErrors.rating = "Rating is required";
    if (!e_commerce_company) newErrors.e_commerce_company = "Platform is required";
    if (!description) newErrors.description = "Description is required";
    if (!category) newErrors.category = "Category is required";

    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setLoading(true);

      // Upload thumbnail image
      const thumbnailFormData = new FormData();
      if (thumbnail) {
        thumbnailFormData.append("file", thumbnail);
        const thumbnailResponse = await axios.post(
          "http://localhost:8080/upload",
          thumbnailFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        formData.thumbnail_url = thumbnailResponse?.data?.data?.imageURL;
      }

      // Upload images array
      const imagesUrls = [];
      for (const image of images) {
        const imageFormData = new FormData();
        imageFormData.append("file", image);
        const imageResponse = await axios.post(
          "http://localhost:8080/upload",
          imageFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        imagesUrls.push(imageResponse?.data?.data?.imageURL);
      }
      formData.image_url = imagesUrls; // Join URLs with a comma

      // Submit product data
      const productResponse = await axios.post(
        "http://localhost:8080/product",
        new URLSearchParams(formData).toString(), // Form-urlencoded
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (productResponse?.data?.status === "success") {
        alert(productResponse?.data?.message);
        navigate("/");
      } else {
        alert(productResponse?.data?.message);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setErrors({ api: "Failed to submit form. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <form onSubmit={handleSubmit}>
        <div className=" flex justify-between p-5">
        <div className=" text-xl font-bold">Hello, { localStorage.getItem('name')}</div>
        <div className="text-sm font-bold underline text-blue-600" onClick={handleSignout}>Sign out</div>
        </div>

      <div className="grid grid-cols-3 gap-5  md:p-14">
      
        <div >
          <span class="mb-2 text-md">Product Name</span>
          <input
            type="text"
            class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            name="product_name"
            id="product_name"
            onChange={handleInputChange}
          />
                {errors.product_name && (
                <span className="text-red-500 text-sm">{errors.product_name}</span>
              )}
        </div>
        <div >
          <span class="mb-2 text-md">Category</span>
       <select  class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
       name="category"
       value={formData.category}
       onChange={handleInputChange}
       >
        <option value="Trending smart watches 2024">Trending smart watches 2024</option>
        <option value="Portable vacuum cleaner">Portable vacuum cleaner</option>
        <option value="Black T-shirts under 300">Black T-shirts under 300</option>

        
       </select>
                {errors.category && (
                <span className="text-red-500 text-sm">{errors.category}</span>
              )}
        </div>
       
        <div >
          <span class="mb-2 text-md">Model</span>
          <input
            type="text"
            name="model"
            id="model"
            class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            onChange={handleInputChange}
          />
                {errors.model && (
                <span className="text-red-500 text-sm">{errors.model}</span>
              )}
        </div>
        <div >
          <span class="mb-2 text-md">Selling Platform</span>
          <select  class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
        name="e_commerce_company"
        value={formData.e_commerce_company}
        onChange={handleInputChange}
       >
        <option value="Meshoo">Meshoo</option>
        <option value="Flipkart">Flipkart</option>
        <option value="Amazon ">Amazon</option>

        
       </select>
                {errors.e_commerce_company && (
                <span className="text-red-500 text-sm">{errors.e_commerce_company}</span>
              )}
        </div>
        <div >
          <span class="mb-2 text-md">Price</span>
          <input
            type="text"
            name="price"
            id="price"
            class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            onChange={handleInputChange}
          />
                {errors.price && (
                <span className="text-red-500 text-sm">{errors.price}</span>
              )}
        </div>
        <div >
          <span class="mb-2 text-md">Rating</span>
          <input
            type="text"
            name="rating"
            id="rating"
            class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            onChange={handleInputChange}
          />
                {errors.rating && (
                <span className="text-red-500 text-sm">{errors.rating}</span>
              )}
        </div>
        <div class="py-4 ">
  <span class="mb-2 text-md">Description</span>
  <textarea
    name="description"
    id="description"
    class="w-full p-10 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
    onChange={handleInputChange}
  ></textarea>
  {errors.description && (
    <span className="text-red-500 text-sm">{errors.description}</span>
  )}
</div>

  
    <div className="py-4">
          <span className="mb-2 text-md">Thumbnail</span><br/>
          <input className="border p-2 h-40" type="file" onChange={handleThumbnailChange} />
          {previewThumbnail && (
            <div className="mt-4">
              <img
                src={previewThumbnail}
                alt="Thumbnail Preview"
                className="h-20 w-20"
              />
            </div>
          )}
        </div>
        
    
     <div className="py-4">
          <span className="mb-2 text-md">Product Images</span><br/>
          <input
          className="border p-2 h-40"
            type="file"
            multiple
            onChange={handleImagesChange}
            accept="image/*"
          />
          <div className="mt-4 flex space-x-2">
            {previewImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Preview ${index}`}
                className="h-20 w-20"
              />
            ))}
          </div>
        </div>
      
       
      </div>
      <div className="flex items-center justify-center">
      <button
          type="submit"
          className=" w-40  bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
      {errors.api && (
          <div className="text-red-500 text-center">{errors.api}</div>
        )}
    
      </form>
   
      </div>

  )
}

export default Seller