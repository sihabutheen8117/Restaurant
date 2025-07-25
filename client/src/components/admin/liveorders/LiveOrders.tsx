"use client"

import React from 'react'
import { inter } from '@/utils/fonts'
import { useState , useEffect } from 'react'
import ViewOrders from './ViewOrders'
import { getAllOrdesDetails } from '@/reactQuery/queries'
import {  useQuery } from '@tanstack/react-query'
import  { useSocket } from "@/customHooks/useSocket"
import NewOrders from './NewOrders'
import ServerdOrders from './ServerdOrders'
import MobileLoaders from '@/components/Loaders/MobileLoaders'
const LiveOrders = (props : any) => {

    const {socket,
      isConnected,
      orders,
      connectionStatus,
      setOrders
    } : any = useSocket('admin', {
      name: "this is admin thats it"
    })

    const [view , setView ] = useState(false) ;
    const [ view_orders , set_view_orders ] = useState({}) ;
    const [ order_adnl_details , set_order_adnl_details ] = useState({}) ;
    const [ search , set_search ] = useState("") ;
    
    const [ is_live , set_is_live ] = useState(true);

    const get_all_orders = useQuery({
      queryKey : ["all_pending_orders"] ,
      queryFn : getAllOrdesDetails
    })

    const handleView = () => {
        setView(!view) ;
        console.log(view);
    }

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
        {/* {
            view && 
            <div
            className="fixed inset-0 bg-black opacity-40 z-10"
            onClick={handleView}
            />
        }
        {
            view && 
            <div className=''>
                <ViewOrders close={handleView} isNotLive={props.isNotLive} food_data={view_orders} order_adnl_details={order_adnl_details}/>
            </div>
        }
        <div className='rounded-lg bg-gray-100 shadow-lg p-2 mt-2'>
            <div className={`${inter.className} mt-2`}>
              <table className='border-collapse w-full'>
                  <thead>
                      <tr className='opacity-75'>
                          <th className='text-left'>Order ID</th>
                          <th className='text-left'>Customer Name</th>
                          <th className='text-left'>Date</th>
                          <th className='text-left'>Time</th>
                          <th className='text-left'>Total Amount</th>
                          <th className='text-left'>Number of items</th>
                          {
                            props.isNotLive && 
                            <th className='text-left'>Type</th>
                          }
                          <th className=''>View Order</th>
                          {
                            props.isNotLive && 
                            <th className='text-left'>Delete</th>
                          }
                      </tr>
                  </thead>
                  <tbody className='text-sm'>
                  
                      {
                        orders &&
                        orders.map( (item:any , index : any) => {

                          console.log("orders data ")
                          console.log(orders)

                          const date = new Date(item.order_date);

                          // Convert to desired format (e.g., 'Jul 14, 2025' and '03:26 PM')
                          const formattedDate = date.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                          });

                          const formattedTime = date.toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          });
                          
                          return (
                          <tr className='h-10' key={index}>
                            <td className='py-2'>#02304</td>
                            <td>Ibrahim</td>
                            <td>{formattedDate}</td>
                            <td>{formattedTime}</td>
                            <td>&#8377; {item.total_cost}</td>
                            <td>{item.quandity}</td>
                            {
                              props.isNotLive && 
                              <td className='text-left'>manual</td>
                            }
                            <td className='flex justify-center h-10 items-center'
                            ><i className="fas fa-eye"
                            onClick={() => {
                              set_view_orders(item.ordered_foods)
                              handleView()
                              set_order_adnl_details({
                                quantity : item.quandity ,
                                total_cost : item.total_cost,
                                _id : item._id
                              })
                            }}
                            ></i></td>
                            {
                              props.isNotLive && 
                              <td className='text-left'><button className='mr-4 text-white bg-red-500 px-2 py-1 rounded-lg'><i className="fas fa-trash"></i></button></td>
                            }
                        </tr>
                        )})
                      }
                  </tbody>
              </table>
            </div>
        </div> */}
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
