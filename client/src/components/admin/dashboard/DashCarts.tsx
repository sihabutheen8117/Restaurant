"use client"

import React from 'react'
import { inter } from '@/utils/fonts'
import { useQuery } from '@tanstack/react-query'
import { get_countables } from '@/reactQuery/queries'
import { useRouter } from 'next/navigation'


const DashCarts = () => {

    const router = useRouter() ;

    const get_countable_query = useQuery({
        queryKey : ["get_countables"] , 
        queryFn : get_countables 
      })


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
                    &#8377; {
                        get_countable_query.isSuccess && 
                        get_countable_query.data.data.total_sales
                    }
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
                    {
                        get_countable_query.isSuccess && 
                        get_countable_query.data.data.total_orders
                    }
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
                    {
                        get_countable_query.isSuccess && 
                        get_countable_query.data.data.total_menu
                    }
                </div>
            </div>
        </div>

        <div className='group rounded-lg flex gap-3 bg-white p-2 w-44 shadow-lg'>
            <div className='group-hover:bg-amber-100 transition-colors duration-200 w-12 aspect-square bg-gray-200 flex items-center justify-center rounded-lg'>
                <i className='group-hover:text-amber-500 transition-colors duration-200 fas fa-list'></i>
            </div>
            <div className=''>
                <div className='text-xs pb-1'>
                    Total Categories
                </div>
                <div className='font-semibold'>
                    {
                        get_countable_query.isSuccess && 
                        get_countable_query.data.data.total_categories
                    }
                </div>
            </div>
        </div>

        <div className='group rounded-lg flex gap-3 bg-white p-2 w-44 shadow-lg'>
            <div className='group-hover:bg-amber-100 transition-colors duration-200 w-12 aspect-square bg-gray-200 flex items-center justify-center rounded-lg'>
                <i className='group-hover:text-amber-500 transition-colors duration-200 fas fa-user'></i>
            </div>
            <div className=''>
                <div className='text-xs pb-1'>
                    Total Customers
                </div>
                <div className='font-semibold'>
                    {
                        get_countable_query.isSuccess && 
                        get_countable_query.data.data.total_customers
                    }
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default DashCarts
