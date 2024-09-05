import React, { useState } from "react";
import SideBar from "./sideBar";
import Search from "./search";
import WelcomeContent from "./welcomeContent";


function WelcomePage() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="h-screen flex bg-[#161516]">
      <SideBar />

 
        <div className=" m-2 w-full p-10  bg-gray-900  rounded-lg">
        
            <WelcomeContent
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
        

          
          <Search
            searchInput={searchInput}
            setSearchInput={setSearchInput}
        
          />
        </div>
      
    </div>
  );
}

export default WelcomePage;
