import React from 'react'
import { useNavigate } from "react-router-dom";
import Logo from "../Images/Logo.png";
import Home from "../Images/Home.png";
import Logout from "../Images/Logout.png";
import Search from "../Images/Search.png";
import Pipe from "../Images/Pipe.png";

function SideBar() {
    const navigate = useNavigate();


    const handleSignout=() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('name');
    alert("Logout Successfully")
        navigate('/');
      }
  return (
          <div className=" justify-center m-2 text-black p-4  bg-[#292929] rounded-lg  border-[#FFFFFF]">
        <img src={Logo} alt="" width="28px" height="28px" />
        <div className=" mt-5">
          <img
            src={Home}
            alt=""
            width="30px"
            height="30px"
            style={{ paddingTop: 30 }}
          />
          <img
            src={Search}
            alt=""
            width="20px"
            height="20px"
            style={{ paddingTop: 30 }}
          />
          <img
            src={Pipe}
            alt=""
            width="20px"
            height="20px"
            style={{ paddingTop: 30 }}
          />
          <img
            src={Logout}
            alt=""
            width="20px"
            height="20px"
            onClick={handleSignout}
            style={{ paddingTop: 30 }}
          />
        </div>
      </div>
  )
}

export default SideBar