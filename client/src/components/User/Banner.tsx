"use client"

import React from 'react'
import '../../styles/mainStyles.css'
import { useRef } from 'react'

type carosFoods = {
  image : string  ,
  title : string
}


const Banner = (props : any) => {

   const slideFoods : carosFoods[] = [
      {
        image : "/assets/banner/new_banner.jpg",
        title : "Cheese burger"
      },
      {
        image : "/assets/banner/winter_offer.jpeg",
        title : "Chocolate ice cream"
      },
    ]
    const scrollRef = useRef<HTMLDivElement | null>(null);
  
    const scrollByStep = (direction:any) => {
      console.log(scrollRef.current);
      if (!scrollRef.current) return;
      const scrollStep = 1375; 
      
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          left: direction === "left" ? -scrollStep : scrollStep,
          behavior: "smooth",
        });
      }
    };

  return (
    <div className="">
      <div className="relative md:h-80 h-40 overflow-y-hidden">
                    
          <div className='w-12 absolute h-full '
               onClick={() => scrollByStep("left")}
          >
                 <i className="fas fa-chevron-left car-left-button text-4xl absolute md:top-35 top-15 z-10 md:left-5 left-3 opacity-60"
                  ></i>
                 </div>

                    <div className="absolute inset-x-2">
                      <div className='flex md:gap-6 gap-4 justify-start overflow-x-auto'
                      ref={scrollRef}
                      >
                        {slideFoods.map((food, index) => (
                            <div key={index} className='flex-shrink-0 md:w-full md:h-80 w-full h-40 md:rounded-3xl rounded-2xl'>
                              <img src={food.image} alt={food.title} className='w-full bg-red-600 md:h-80 h-40 md:rounded-3xl rounded-2xl object-fit object-cover'/>
                            </div>
                          ))}
                     
                      </div>
                    </div>

                    <div className='w-12 absolute h-full  right-0'
                    onClick={() => scrollByStep("right")}
                    >
                      <i className="fas fa-chevron-right car-right-button text-4xl absolute md:top-35 top-15 z-10 md:right-5 right-3 opacity-60"
                      ></i>
                    </div>
      </div>
    </div>
  )
}

export default Banner
