
import React from 'react'
import '../../styles/mainStyles.css'
import {lexend ,kanit} from '@/utils/fonts'

const MainBody = () => {
  return (
    <div className=''>
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
