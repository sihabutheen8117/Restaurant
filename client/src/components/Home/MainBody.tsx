
import React from 'react'
import '../../styles/mainStyles.css'
import {lexend} from '@/utils/fonts'
const MainBody = () => {
  return (
    <div className=''>
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
