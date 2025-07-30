"use client"

import React from 'react'
import { inter } from '@/utils/fonts'
import { useQuery } from '@tanstack/react-query'
import { get_entry_orders } from '@/reactQuery/queries'
import ViewOrders from '../liveorders/ViewOrders'
import { useState } from 'react'
import ItemsNotFound from '@/components/Loaders/ItemsNotFound'

const Entries = (props:any) => {

  const entry_mutation = useQuery({
    queryKey : ["entries"],
    queryFn : get_entry_orders
  })

   const [view , setView ] = useState(false) ;
   const [ view_orders , set_view_orders ] = useState({}) ;
   const [ order_adnl_details , set_order_adnl_details ] = useState({}) ;
   const handleView = () => {
          setView(!view) ;
          console.log(view);
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
                <ViewOrders close={handleView} isNotLive={true} food_data={view_orders} order_adnl_details={order_adnl_details} is_table={true}/>
            </div>
        }
      <div className='rounded-lg bg-gray-100 shadow-lg p-2 mt-2'>
                  <div className={`${inter.className} mt-2`}>
                    <table className='border-collapse w-full'>
                        <thead className='text-sm'>
                            <tr className='opacity-75'>
                                <th className='text-left'>S.no</th>
                                <th className='text-left'>Customer Name</th>
                                <th className='text-left'>Date</th>
                                <th className='text-left'>Time</th>
                                <th className='text-left'>Total Amount</th>
                                <th className='text-left'>Number of items</th>
                                <th className='text-center'>View Orders</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm'>
                        {
                          entry_mutation.isSuccess && 
                          entry_mutation.data.data.map( (food:any , index :any ) => {

                            const date = new Date(food.createdAt);
                            
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

                            if( !food.user_name?.toLowerCase().includes(props.search.toLowerCase()) && props.search != "" )
                            {
                                return ;
                            }
                            return(
                              <tr className='h-10' key={index}>
                                  <td className='py-2'>{index+1}</td>
                                  <td>{food.user_name ? food.user_name : "error"}</td>
                                  <td>{formattedDate}</td>
                                  <td>{formattedTime}</td>
                                  <td>&#8377; {food.total_cost}</td>
                                  <td>{food.quandity}</td>
                                  <td className='h-10 text-center'
                                    ><i className="fas fa-eye"
                                    onClick={() => {
                                      set_view_orders(food.ordered_foods)
                                      handleView()
                                      set_order_adnl_details({
                                        quantity : food.quandity ,
                                        total_cost : food.total_cost,
                                        _id : food._id,
                                        user_name : food.user_name,
                                        order_type : food.order_type
                                      })
                                    }}
                                    ></i>
                                  </td>
                              </tr>
                            )
                          })
                        }
                        </tbody>
                    </table>
                  </div>
                  <div className=''>
                    {
                      entry_mutation.isSuccess && 
                      entry_mutation.data.data.length == 0 && 
                      <div className='w-full flex justify-center items-center'>
                          <div className=''> 
                              <ItemsNotFound/>
                          <div className={`text-center mb-2 text-xl ${inter.className} font-medium text-gray-600`}>No Foods Found!</div>
                          </div>
                      </div>
                    }
                  </div>
              </div>
    </div>
  )
}

export default Entries