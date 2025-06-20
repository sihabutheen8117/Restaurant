import React from 'react'
import { inter } from '@/utils/fonts'
import LiveOrders from '@/components/admin/liveorders/LiveOrders'

const page = () => {

  const isNotLive : boolean = false ;
  return (
    <div>
      <div className={` ${inter.className} font-semibold text-lg`}>
        Live Orders
      </div>
      <div className='w-fit mt-2 rounded-2xl bg-gray-200 p-1.5 px-3'>
        <button className={` ${inter.className} text-sm px-2 bg-white rounded-xl py-2 mr-2 font-semibold opacity-75 hover:opacity-100 hover:shadow-md transition-all duration-200`}>New Orders</button>
        <button className={` ${inter.className} text-sm px-2 bg-white rounded-xl py-2 mr-2 font-semibold opacity-75 hover:opacity-100 hover:shadow-md transition-all duration-200`}>Served Orders</button>
        <button className={` ${inter.className} text-sm px-2 bg-white rounded-xl py-2 font-semibold opacity-75 hover:opacity-100 hover:shadow-md transition-all duration-200`}>Cancelled Orders</button>
      </div>
      <div className=''>
        <LiveOrders isNotLive={isNotLive}/>
      </div>
    </div>
  )
}

export default page
