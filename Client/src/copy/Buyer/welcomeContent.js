import React,{useState} from 'react'
import Dress from "../Images/Dress.png";
import Bulb from "../Images/Bulb.png";
import Star from "../Images/Star.png";

const Category = [
    {
      id: 1,
      title: "Trending smart watches 2024",
      imageSrc: Star,
    },
    {
      id: 2,
      title: "Portable vacuum cleaner",
      imageSrc: Bulb,
    },
    {
      id: 3,
      title: "Black T-shirts under 300",
      imageSrc: Dress,
    },
  ];

function WelcomeContent({...props}) {

    const handleCategoryClick = (title) => {
      props.setSearchInput(title);
    };
  return (
    <><div className="font-Satoshi font-medium text-3xl  leading-10 text-[#CE5ED5] ">
          Hello, { localStorage.getItem('name')}
      </div><div className="font-Satoshi font-medium text-3xl  leading-10 text-[#828282] pt-2">
              How can I help you today?
          </div><div className="flex gap-5 mt-10 mb-20">
              {Category.map((item) => (
                  <div key={item.title} onClick={() => handleCategoryClick(item.title)} className="  bg-[#343434] rounded-xl  w-[200px] h-[150px] p-2">
                      <div className="font-Satoshi font-medium text-base  text-[#EDEDED] h-10">
                          {item.title}
                      </div>
                      <div className="grid justify-items-end pt-12">
                          <img
                              src={item.imageSrc}
                              alt=""
                              className="rounded-full bg-black p-[5px]"
                              style={{ width: "30px", height: "30px" }} />
                      </div>
                  </div>
              ))}
          </div></>
  )
}

export default WelcomeContent