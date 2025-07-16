"use client"
import React from 'react'
import { inter } from '@/utils/fonts'
import { getFoodDetailsForOrders } from '@/reactQuery/queries'
import {useMutation, useQuery , useQueryClient} from '@tanstack/react-query'
import { deleteOrder } from '@/reactQuery/queries'
import { payment_checkout } from '@/reactQuery/queries'

import { useState } from 'react'

const ViewOrders = (props:any) => {

    const [ payment_type , set_payment_type ] = useState(false)
    const orders = useQuery({
        queryKey : ["admin_orders"] ,
        queryFn : () => getFoodDetailsForOrders(props.food_data)
    })

    const queryClient = useQueryClient() ;

    const delete_mutation = useMutation({
        mutationFn : deleteOrder ,
        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey : ['all_pending_orders']
            })
            props.close()
        }
    })

    const checkout_mutation = useMutation({
        mutationFn : payment_checkout ,
        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey : ['all_pending_orders']
            })
            props.close()
        }
    })

    const handle_checkout = () => {
        checkout_mutation.mutate( {
            payment_type : payment_type ,
            _id : props.order_adnl_details._id
        })
    }

    const handleDetails = () => {
        const confirmed = window.confirm('Are you sure you want to delete this order?');
        delete_mutation.mutate({ _id : props.order_adnl_details._id})
    }

  return (
    <div className='bg-white z-50 inset-x-72 inset-y-20 absolute rounded-lg'>
        <div className={` ${inter.className} justify-between mx-4 my-2 flex font-semibold `}>
            <div>kader Ismail</div>
            <div>#0012</div>
        </div>
        <div>
            <div className='rounded-lg bg-gray-100 shadow-lg p-2 m-2'>
                        <div className={`${inter.className} mt-2 overflow-x-auto h-56 `}>
                          <table className='border-collapse w-full'>
                              <thead className='sticky top-0 z-10 bg-gray-100'>
                                  <tr className='opacity-75 text-sm'>
                                      <th className='text-left'>S.no</th>
                                      <th className='text-left'>Food Name</th>
                                      <th className='text-left'>Price</th>
                                      <th className='text-left'>Quantity</th>
                                      <th className='text-left'>Total</th>
                                  </tr>
                              </thead>
                              <tbody className=' text-sm h-3 overflow-y-auto'>
                                  {
                                    orders.isSuccess && 
                                    orders.data.data.map( (item:any ,index : any)=>{
                                        
                                        const effectivePrice = item.offer_price == -1 ?item.price : item.offer_price
                                        
                                        return (
                                        <tr className='text-sm h-7' key={index}>
                                            <td className=''>{index+1}</td>
                                            <td>{item.food_name}</td>
                                            <td>&#8377; {
                                                effectivePrice
                                            }</td>
                                            <td>{item.quantity}</td>
                                            <td>&#8377; { item.quantity * effectivePrice }</td>
                                        </tr>
                                    )})
                                  }
                        
                                  <tr className={`${inter.className} font-semibold h-10 sticky bottom-0 z-10 bg-gray-100`}>
                                            <td className=''>{}</td>
                                            <td>{}</td>
                                            <td>Total</td>
                                            <td>{props.order_adnl_details.quantity}</td>
                                            <td>&#8377;  {props.order_adnl_details.total_cost}</td>
                                    </tr>
                                  
                              </tbody>
                          </table>
                        </div>
                    </div>
                    {
                        !props.isNotLive && 
                        <div className='mx-2'>
                        <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="remember"
                            name="remember"
                            checked={payment_type}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            onChange={() => set_payment_type(!payment_type)}
                        />
                        <label htmlFor="remember" className="text-sm text-gray-700">
                            online payment ( through UPI / Credit / Debit cards )
                        </label>
                        </div>
                    </div>
                    }
        </div>
        <div className='flex w-full absolute bottom-2 justify-between text-sm'>
            <button className='bg-red-500 text-white px-3 py-1 rounded-xl mx-3'
            onClick={props.close}
            ><i className="fas fa-times"></i> cancel</button>
            <div className='mx-3'>
                
                <button className='mr-4 text-white bg-red-500 px-2 py-1 rounded-lg'
                onClick={() => handleDetails()}
                ><i className="fas fa-trash"></i> Delete</button>
                {
                    !props.isNotLive && 
                    <button className='bg-green-400 text-white px-3 py-1 rounded-lg'
                    onClick={handle_checkout}
                    ><i className="fas fa-money-check-alt "></i>  check out</button>
                }
            </div>
        </div>
    </div>
  )
}

export default ViewOrders
