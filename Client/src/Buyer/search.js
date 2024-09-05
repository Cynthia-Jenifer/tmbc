import React from "react";
import { useNavigate } from "react-router-dom";
import Shop from "../Images/Shop.png";

function Search({ ...props }) {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/products");
  };
  return (
    <div className="flex items-center bg-[#161516]  p-2 m-20  rounded-full w-3/4 justify-center">
      <input
        type="text"
        placeholder="Ask me anything..."
        value={props.searchInput||""}
        // onChange={(e) => props.setSearchInput(e.target.value)||""}
        className="bg-transparent text-white px-4 py-2  flex-grow border border-[#474347] bg-[#161516] rounded-full"
      />
      <button
        className="flex bg-white text-[#000000] rounded-full px-4 py-2 ml-4"
        onClick={handleSubmit}
      >
        <img
          src={Shop}
          alt=""
          width="20px"
          height="20px"
          style={{ marginRight: "5px" }}
        />
        Shop
      </button>
    </div>
  );
}

export default Search;
