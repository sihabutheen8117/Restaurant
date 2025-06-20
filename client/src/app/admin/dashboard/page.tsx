import React from 'react'
import DashCarts from '@/components/admin/dashboard/DashCarts'
import { inter } from '@/utils/fonts'
import BarChart from '@/components/admin/dashboard/graphs/BarChart'
import LineChart from '@/components/admin/dashboard/graphs/LineChart'
import RecentOrders from '@/components/admin/dashboard/RecentOrders'


const page = () => {
  return (
    <div>
      <div className={`font-semibold text-xl ${inter.className}`}>
        Dashboard
      </div>
      <div >
        <DashCarts/>
      </div>
      <div className='flex w-full justify-around mt-5'>
        <div className='w-1/2 mx-3 relative bg-white pt-7 rounded-xl shadow-lg'>
          <LineChart/>
          <div className={`absolute top-3 left-3 ${inter.className} font-semibold `}>
            Total Orders
          </div>
          <select title='food' name="food" className='absolute font-semibold top-3 right-3'>
            <option value="pizza">last 3 month</option>
            <option value="burger">last 5 month</option>
            <option value="pasta">last 12 month</option>
          </select>
        </div>
        <div className='w-1/2 mx-3 relative bg-white pt-7 rounded-xl shadow-lg'>
          <BarChart/>
          <div className={`absolute top-0 left-0 ${inter.className} font-semibold p-3`}>
            Total Orders
          </div>
          <select title='food' name="food" className='absolute font-semibold top-3 right-3'>
            <option value="pizza">last 3 month</option>
            <option value="burger">last 5 month</option>
            <option value="pasta">last 12 month</option>
          </select>
        </div>
      </div>
      <div className='bg-white rounded-xl shadow-xl m-3 my-5 px-3'>
        <RecentOrders/>
      </div>
    </div>
  )
}

export default page
