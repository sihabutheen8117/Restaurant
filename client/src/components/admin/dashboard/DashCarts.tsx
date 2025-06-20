import React from 'react'
import { inter } from '@/utils/fonts'

const DashCarts = () => {
  return (
    <div>
      <div className={`flex ${inter.className} gap-7 justify-center mt-5`}>
        <div className='group rounded-lg flex gap-3 bg-white p-2 w-40 shadow-lg'>
            <div className='group-hover:bg-amber-100 transition-colors duration-200 w-12 aspect-square bg-gray-200 flex items-center justify-center rounded-lg'>
                <i className='group-hover:text-amber-500 transition-colors duration-200 fas fa-dollar-sign'></i>
            </div>
            <div className=''>
                <div className='text-xs pb-1'>
                    Total Sales
                </div>
                <div className='font-semibold'>
                    &#8377; 23049
                </div>
            </div>
        </div>

        <div className='group rounded-lg flex gap-3 bg-white p-2 w-40 shadow-lg'>
            <div className='group-hover:bg-amber-100 transition-colors duration-200 w-12 aspect-square bg-gray-200 flex items-center justify-center rounded-lg'>
                <i className='group-hover:text-amber-500 transition-colors duration-200 fas fa-box'></i>
            </div>
            <div className=''>
                <div className='text-xs pb-1'>
                    Total Orders
                </div>
                <div className='font-semibold'>
                    2300
                </div>
            </div>
        </div>

        <div className='group rounded-lg flex gap-3 bg-white p-2 w-40 shadow-lg'>
            <div className='group-hover:bg-amber-100 transition-colors duration-200 w-12 aspect-square bg-gray-200 flex items-center justify-center rounded-lg'>
                <i className='group-hover:text-amber-500 transition-colors duration-200 fas fa-bell-concierge'></i>
            </div>
            <div className=''>
                <div className='text-xs pb-1'>
                    Total Menu
                </div>
                <div className='font-semibold'>
                    130
                </div>
            </div>
        </div>

        <div className='group rounded-lg flex gap-3 bg-white p-2 w-40 shadow-lg'>
            <div className='group-hover:bg-amber-100 transition-colors duration-200 w-12 aspect-square bg-gray-200 flex items-center justify-center rounded-lg'>
                <i className='group-hover:text-amber-500 transition-colors duration-200 fas fa-dollar-sign'></i>
            </div>
            <div className=''>
                <div className='text-xs pb-1'>
                    Total Workers
                </div>
                <div className='font-semibold'>
                    49
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default DashCarts
