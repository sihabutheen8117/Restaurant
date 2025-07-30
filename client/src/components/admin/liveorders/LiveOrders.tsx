"use client"

import React from 'react'
import { inter } from '@/utils/fonts'
import { useState , useEffect } from 'react'
import { getAllOrdesDetails } from '@/reactQuery/queries'
import {  useQuery } from '@tanstack/react-query'
import  { useSocket } from "@/customHooks/useSocket"
import NewOrders from './NewOrders'
import ServerdOrders from './ServerdOrders'
const LiveOrders = (props : any) => {

    const {
      setOrders
    } : any = useSocket('admin', {
      name: "this is admin thats it"
    })

    const [ search , set_search ] = useState("") ;
    
    const [ is_live , set_is_live ] = useState(true);

    const get_all_orders = useQuery({
      queryKey : ["all_pending_orders"] ,
      queryFn : getAllOrdesDetails
    })

    useEffect(() => {
      if (get_all_orders.isSuccess) {
        setOrders(get_all_orders.data.data); 
      }
    }, [get_all_orders.data]);

    

  return (
    <div>
        <div className='w-fit mt-2 px-3 flex whitespace-nowrap'>
              <button className={` ${inter.className} text-sm px-2   py-2 mr-2 font-semibold opacity-75 border-b-2 ${ is_live==true ? "border-amber-400 bg-amber-50" : "border-gray-300 bg-white"}  `}
              onClick={() => set_is_live(true)}
              >New Orders</button>
              <button className={` ${inter.className} text-sm px-2  py-2 mr-2 font-semibold opacity-75 border-b-2 ${ is_live==false ? "border-amber-400 bg-amber-50" : "border-gray-300 bg-white"}  `}
              onClick={() => set_is_live(false)}
              >Served Orders</button>
              <div className="relative w-full max-w-sm ml-5">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-1 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  onChange={(e) => set_search(e.target.value)}
                />
                <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              </div>
        </div>
        <div className=''>
          {
            is_live ? 
            <NewOrders isNotLive={props.isNotLive} search={search}/>
            : 
            <ServerdOrders isNotLive={props.isNotLive} search={search}/>
          }
        </div>
    </div>
  )
}

export default LiveOrders
