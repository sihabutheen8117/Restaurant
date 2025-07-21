"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

const ProfileElem = () => {

    const router = useRouter() ;

    const handleMyOrder = () => {
        router.push('/user/history')
    }

    const handleUserCart = () => {
        router.push('/user/user_cart')
    }
  return (
    <div className='w-full'>
        <div className='relative h-screen w-full'>
            <div className='w-full h-screen '>
                <div className='hover:bg-gray-100 px-7 py-2'>
                    <i className="fas fa-user pr-5"></i>
                    Profile
                </div>
                <hr className='border-b-2 w-full border-gray-200'></hr> 
                <div className='hover:bg-gray-100 px-7 py-2'
                onClick={() => handleUserCart()}
                >
                    <i className="fas fa-shopping-cart pr-5"></i>
                    Cart
                </div> 
                <hr className='border-b-2 w-full border-gray-200'></hr> 
                <button className='hover:bg-gray-100 px-7 py-2 whitespace-nowrap'
                onClick={() => handleMyOrder()}
                >
                    <i className="fas fa-box pr-5"></i>
                    My Orders
                </button> 
                <hr className='border-b-2 w-full border-gray-200'></hr> 
            </div>
        </div>
    </div>
  )
}

export default ProfileElem
