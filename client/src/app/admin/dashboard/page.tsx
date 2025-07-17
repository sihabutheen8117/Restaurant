"use client"

import React from 'react'
import DashCarts from '@/components/admin/dashboard/DashCarts'
import { inter } from '@/utils/fonts'
import BarChart from '@/components/admin/dashboard/graphs/BarChart'
import LineChart from '@/components/admin/dashboard/graphs/LineChart'
import RecentOrders from '@/components/admin/dashboard/RecentOrders'
import { useState , useEffect} from 'react'
import { useQuery } from '@tanstack/react-query'
import { get_dashboard_analytics_orders_customers } from '@/reactQuery/queries'

const page = () => {

  const [ total_customers_range , set_total_customers_range ] = useState("1") ; 
  const [ total_orders_range , set_total_orders_range ] = useState("1") ; 

  const analytics_query = useQuery({
    queryKey: ["admin_analytics", total_customers_range], 
    queryFn: () => get_dashboard_analytics_orders_customers({
      range: total_customers_range
    })
  });

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
          <LineChart range={total_orders_range}/>
          <div className={`absolute top-3 left-3 ${inter.className} font-semibold `}>
            Total Orders
          </div>
          <select title='food' name="food" className='absolute font-semibold top-3 right-3'
          onChange={(e) => set_total_orders_range(e.target.value)}
          >
            <option value="1">last month</option>
            <option value="3">last 3 month</option>
            <option value="6">last 6 month</option>
            <option value="12">last 12 month</option>
          </select>
        </div>
        <div className='w-1/2 mx-3 relative bg-white pt-7 rounded-xl shadow-lg'>
          <BarChart range={total_customers_range} />
          <div className={`absolute top-0 left-0 ${inter.className} font-semibold p-3`}>
            Total Customers
          </div>
          <select title='food' name="food" className='absolute font-semibold top-3 right-3'
          onChange={(e) => set_total_customers_range(e.target.value)}
          >
            <option value="1">last month</option>
            <option value="3">last 3 month</option>
            <option value="6">last 6 month</option>
            <option value="12">last 12 month</option>
          </select>
        </div>
      </div>
      {/* <div className='bg-white rounded-xl shadow-xl m-3 my-5 px-3'>
        <RecentOrders/>
      </div> */}
    </div>
  )
}

export default page
