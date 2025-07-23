"use client"

import React from 'react'
import { inter } from '@/utils/fonts'
import { useState } from 'react'

//childs
import CustomerAnalytics from './childs/CustomerAnalytics'
import FoodsAnalytics from './childs/FoodsAnalytics'
import OrdersAnalytics from './childs/OrdersAnalytics'

function AnalyticsView() {

  const [ view , set_view ] = useState('1') ;

  return (
    <div>
      <div className='w-full mt-2 px-3 flex whitespace-nowrap justify-between'>
            <div className=''>

                <button className={` ${inter.className} text-sm px-2   py-2 mr-2 font-semibold opacity-75 border-b-2 ${ view == '1' ? "border-amber-400 bg-amber-50" : "border-gray-300 bg-white"}  `}
                    onClick={() => set_view('1')}
                >Foods</button>

                <button className={` ${inter.className} text-sm px-2  py-2 mr-2 font-semibold opacity-75 border-b-2 ${ view == '2' ? "border-amber-400 bg-amber-50" : "border-gray-300 bg-white"}  `}
                    onClick={() => set_view('2')}
                >Customers</button>

                <button className={` ${inter.className} text-sm px-2  py-2 mr-2 font-semibold opacity-75 border-b-2 ${ view == '3' ? "border-amber-400 bg-amber-50" : "border-gray-300 bg-white"}  `}
                    onClick={() => set_view('3')}
                >Orders</button>
            </div>

            <button className={`${inter.className} text-xs flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 rounded-lg shadow-md transition-all duration-200 font-semibold my-1`}>
                <i className="fa-solid fa-file-excel text-white text-sm"></i>
                <span>Export to Excel</span>
            </button>
        </div>

        <div className=''>
            {view === '1' && <FoodsAnalytics />}
            {view === '2' && <CustomerAnalytics />}
            {view === '3' && <OrdersAnalytics />}
        </div>
    </div>
  )
}

export default AnalyticsView
