"use client"

import React from 'react'
import { inter } from '@/utils/fonts'
import { useQuery } from '@tanstack/react-query'
import { get_entry_orders } from '@/reactQuery/queries'

const Entries = (props:any) => {

  const entry_mutation = useQuery({
    queryKey : ["entries"],
    queryFn : get_entry_orders
  })

  return (
    <div>
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

                            return(
                              <tr className='h-10' key={index}>
                                  <td className='py-2'>{index+1}</td>
                                  <td>{food.user_name}</td>
                                  <td>{formattedDate}</td>
                                  <td>{formattedTime}</td>
                                  <td>&#8377; {food.total_cost}</td>
                                  <td>{food.quandity}</td>
                                  <td className='h-10 text-center'
                                    ><i className="fas fa-eye"
                                    // onClick={() => {
                                    //   set_view_orders(item.ordered_foods)
                                    //   handleView()
                                    //   set_order_adnl_details({
                                    //     quantity : item.quandity ,
                                    //     total_cost : item.total_cost,
                                    //     _id : item._id
                                    //   })
                                    // }}
                                    ></i>
                                  </td>
                              </tr>
                            )
                          })
                        }
                        </tbody>
                    </table>
                  </div>
              </div>
    </div>
  )
}

export default Entries