import React from 'react'
import { Lexend

 } from 'next/font/google'
import { lexend } from '@/utils/fonts'
const MainFooter = () => {
  return (
    <div>
      <div className='bg-gray-900 w-full md:py-5 p-3'>
        <div className='flex text-white flex-col items-center'>
          <div className="grid md:grid-cols-3 w-full grid-cols-2">
            <div className={`${lexend.className} md:text-3xl text-lg flex justify-center items-center`}>
              Al-Khalid
            </div>
            <div className='flex flex-col justify-center items-center gap-2'>
              Places 
              <ul className='list-disc'>
                <li>chennai , tambaram</li>
                <li>kadayanallur , rayyan street</li>
                <li>tenkasi , cutralam</li>
              </ul>
            </div>
            <div className='md:col-span-1 col-span-2'>
              <div className='py-2'>Don't forgot to follow us on</div>
              
              <div className='flex gap-2 py-2'>
                <img src="https://cdn.simpleicons.org/facebook" alt="Facebook" className="md:w-5 md:h-5 w-3 h-3"/>
                <a href='https://www.facebook.com' target="_blank" rel="noopener noreferrer">al-khalid-resturants</a>
              </div>
              <div className='flex gap-2 py-2'>
                <img src="https://cdn.simpleicons.org/instagram" alt="Facebook" className="md:w-5 md:h-5 w-3 h-3"/>
                <a href='ww.intagram.com' target="_blank" rel="noopener noreferrer">al-khalid-restaurants</a>
              </div>
              <div className='flex gap-2 py-2'>
                <img src="https://cdn.simpleicons.org/youtube" alt="Facebook" className="md:w-5 md:h-5 w-3 h-3"/>
                <a href='https://www.youtube.com/@al_ashabul_ikhwan' target="_blank" rel="noopener noreferrer">al-khalid-restaurants</a>
              </div>
              <div className='flex gap-2 py-2'>
                <img src="https://cdn.simpleicons.org/whatsapp" alt="Facebook" className="md:w-5 md:h-5 w-3 h-3"/>
                <a href='https://wa.me/+919791954287' target="_blank" rel="noopener noreferrer">al-khalid-restaurants</a>
              </div>

            </div>
          </div>
          <div>
            &copy; 2025 by Al-Khalid pvt Lmt.
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainFooter
