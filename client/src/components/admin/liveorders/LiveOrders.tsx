"use client"

import React from 'react'
import { inter } from '@/utils/fonts'
import { useState , useEffect } from 'react'
import ViewOrders from './ViewOrders'
import { getAllOrdesDetails } from '@/reactQuery/queries'
import {  useQuery } from '@tanstack/react-query'
import  { useSocket } from "@/customHooks/useSocket"

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
        {
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
        </div>
    </div>
  )
}

export default LiveOrders
