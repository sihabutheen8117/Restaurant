"use client"


import React from 'react'
import '../../styles/mainStyles.css'
import {lexend ,kanit , poppins} from '@/utils/fonts'
import { useRef } from 'react'

type carosFoods = {
  image : string  ,
  title : string
}

const MainBody = () => {

  const slideFoods : carosFoods[] = [
    {
      image : "assets/caros_images/cheese_burger.webp",
      title : "Cheese burger"
    },
    {
      image : "assets/caros_images/lemon_cheesecake.webp",
      title : "Lemon Cheese cake"
    },
    {
      image : "assets/caros_images/bagel.webp",
      title : "Bagel"
    },
    {
      image : "assets/caros_images/butter-chicken.webp",
      title : "Butter chicker"
    },
    {
      image : "assets/caros_images/chocolate-icecream.webp",
      title : "Chocolate ice cream"
    },
    {
      image : "assets/caros_images/honey-pancakes.webp",
      title : "Honey pancakes"
    },
    {
      image : "assets/caros_images/pizza-salami.webp",
      title : "Pizza salami"
    },
  ]
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollByStep = (direction:any) => {
    if (!scrollRef.current) return;
    const scrollStep = 100; // width + spacing
    
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollStep : scrollStep,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className=''>

      <div className=''>
        <div className='flex w-full justify-center mt-8 mb-8'><span className={`${lexend.className} md:text-3xl text-2xl pr-3`}>Al-Khalid</span><span className='md:text-3xl text-2xl'>Special</span></div>
        <div className="car-container">
          
          <div className="car-cart relative md:h-100 h-60 overflow-y-hidden">
            
            <i className="fas fa-chevron-left car-left-button text-2xl absolute md:top-40 top-20 z-10 md:left-5 left-3"
            onClick={() => scrollByStep("left")}
            ></i>
            <div className="absolute md:inset-x-12 inset-x-8">
              <div id="car-strip" className='car-strip flex md:gap-6 gap-4 justify-start overflow-x-auto'
              ref={scrollRef}
              >
                {slideFoods.map((food, index) => (
                    <div key={index} className='car-items  flex-shrink-0 md:w-80 md:h-100 w-40 h-60 md:rounded-3xl rounded-2xl'>
                      <img src={food.image} alt={food.title} className='w-full bg-red-600 md:h-80 h-40 md:rounded-3xl rounded-2xl object-fit'/>
                      <div className={`w-full flex justify-center h-20 items-center ${poppins.className} md:text-xl`}>{food.title}</div>
                    </div>
                  ))}
             
              </div>
            </div>
            <i className="fas fa-chevron-right car-right-button text-2xl absolute md:top-40 top-20 z-10 md:right-5 right-3"
            onClick={() => scrollByStep("right")}
            ></i>
          </div>
        </div>
      </div>

      <div className={`flex justify-center font-semibold md:text-2xl md:mt-10 mt-5 ${kanit.className}`}>Certificates</div>
      <div className='wrapper md:mt-10 mt-5 md:mx-14 mx-4 pt-[10px]'>
        <div className='item item1 shadow-xl'> <img src="assets/certificates/fssai.png" alt='fssai' className={`w-full h-full object-contain`}/></div>
        <div className='item item2 shadow-xl flex items-center '> <div className={`${lexend.className} md:text-2xl md:pl-10 text-lg`}>Al-Khalid</div></div>
        <div className='item item3 shadow-xl'> <img src="assets/certificates/iso_white.png" alt='fssai' className={`w-full h-full object-contain`}/></div>
        <div className='item item4'></div>
        <div className='item item5'></div>
        <div className='item item6'></div>
        <div className='item item7'></div>
        <div className='item item8'></div>
        <div className="test test1"></div>
      </div>
      <div className={`md:m-10 m-3 flex relative`}>
        {/* <img src='assets/top_view_food.jpg' alt='top view food' className='md:rounded-4xl rounded-2xl w-64 h-64 object-cover'/> */}
        <div className={`md:rounded-4xl rounded-2xl  absolute inset-0 setAbout bg-cover bg-right bg-no-repeat h-96 w-full z-0`}>
        </div>
        <div className="md:rounded-4xl rounded-2xl absolute inset-0 bg-black/70 z-0"></div>
        <div id='about_us' className='z-10 md:rounded-4xl rounded-2xl text-white flex flex-col items-center w-full md:p-7 p-3 gap-2'>
          <div className={`${lexend.className} md:text-xl`}>About us</div>
          <div className='text-justify text-sm md:text-lg'>
          Welcome to <strong>al khalid</strong> restaurants, where every dish is a celebration of flavor and passion. Nestled in the heart of the city, 
          we’re a locally owned restaurant that brings together traditional recipes and modern culinary creativity.
          From our carefully selected ingredients to our warm, welcoming atmosphere, we’re here to offer more than just a meal — we offer an experience. Whether you're joining us for a casual lunch, a family dinner, or a special occasion, we promise food that’s always fresh and service that feels like home.
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainBody
