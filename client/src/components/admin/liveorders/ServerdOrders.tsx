"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { get_seved_orders } from '@/reactQuery/queries'
import { inter } from '@/utils/fonts'
import { useState} from 'react'
import ViewOrders from './ViewOrders'
import MobileLoaders from '@/components/Loaders/MobileLoaders'

const ServerdOrders = (props : any ) => {

    const served_orders = useQuery({
        queryKey : ["completed_orders"] ,
        queryFn : get_seved_orders
    })
    const [view , setView ] = useState(false) ;
    const [ view_orders , set_view_orders ] = useState({}) ;
    const [ order_adnl_details , set_order_adnl_details ] = useState({}) ;
    const handleView = () => {
        setView(!view) ;
        console.log(view);
    }

    if(served_orders.isLoading )
      {
        
        return (
          <div className='h-screen bg-gray-100 m-2 rounded-4xl'>
            <div className='flex justify-center items-center h-8/12'>
              <MobileLoaders/>
            </div>
          </div>
        )
      }

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
                <ViewOrders close={handleView} isNotLive={true} food_data={view_orders} order_adnl_details={order_adnl_details}/>
            </div>
        }
      <div className='rounded-lg bg-gray-100 shadow-lg p-2 mt-2'>
                  <div className={`${inter.className} mt-2`}>
                    <table className='border-collapse w-full'>
                        <thead className='text-sm'>
                            <tr className='opacity-75'>
                                <th className='text-left'>Order ID</th>
                                <th className='text-left'>Customer Name</th>
                                <th className='text-left'>Date</th>
                                <th className='text-left'>Time</th>
                                <th className='text-left'>Total Amount</th>
                                <th className='text-left'>Number of items</th>
                                <th className='text-left'>Type</th>
                                <th className='text-left'>View Orders</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm'>
                        
                            {
                              served_orders.isSuccess &&
                              served_orders.data.data.map( (item:any , index : any) => {

                                const date = new Date(item.createdAt);
      
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

                                if(   !item.user_name?.toLowerCase().includes(props.search.toLowerCase()) && props.search != "" )
                                  {
                                    return ;
                                  }
                                
                                return (
                                <tr className='h-10' key={index}>
                                  <td className='py-2'>#02304</td>
                                  <td>{ item.user_name ? item.user_name : "errors" }</td>
                                  <td>{formattedDate}</td>
                                  <td>{formattedTime}</td>
                                  <td>&#8377; {item.total_cost}</td>
                                  <td>{item.quandity}</td>
                                  <td className='text-left'>{item.order_type}</td>
                                  
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
                                    ></i>
                                  </td>
                                  
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

export default ServerdOrders
