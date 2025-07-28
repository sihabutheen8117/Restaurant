"use client"
import React from 'react'
import { inter } from '@/utils/fonts'
import { getFoodDetailsForOrders } from '@/reactQuery/queries'
import {useMutation, useQuery , useQueryClient} from '@tanstack/react-query'
import { deleteOrder } from '@/reactQuery/queries'
import { payment_checkout } from '@/reactQuery/queries'

import { useState  , useRef } from 'react'

const ViewOrders = (props:any) => {

    const [ payment_type , set_payment_type ] = useState(false)

    const queryClient = useQueryClient() ;

    const delete_mutation = useMutation({
        mutationFn : deleteOrder ,
        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey : ['all_pending_orders']
            })
            props.close()
            props.handle_delete_success()
        }
    })

    const checkout_mutation = useMutation({
        mutationFn : payment_checkout ,
        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey : ['all_pending_orders']
            })
            props.close();
            props.checkout_success();
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
            <div>{props.order_adnl_details.user_name}</div>
            <div className='font-medium'>{props.order_adnl_details.order_type}</div>
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
                                    props.food_data.map( (item:any ,index : any)=>
                                    (
                                        <tr className='text-sm h-7' key={index}>
                                            <td className=''>{index+1}</td>
                                            <td>{item.food_name}</td>
                                            <td>&#8377; {
                                                item.price
                                            }</td>
                                            <td>{item.quantity}</td>
                                            <td>&#8377; { item.quantity * item.price}</td>
                                        </tr>
                                    ))
                                  }
                        
                                  {
                                    props.is_table== false &&
                                    <tr className={`${inter.className} font-semibold h-10 sticky bottom-0 z-10 bg-gray-100`}>
                                        <td className=''>{}</td>
                                        <td>{}</td>
                                        <td>Total</td>
                                        <td>{props.order_adnl_details.quantity}</td>
                                        <td>&#8377;  {props.order_adnl_details.total_cost}</td>
                                    </tr>
                                  }
                                  
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
        {
            props.is_table== true && 
            <div className="m-4 text-sm">
                <table className="min-w-[250px] border border-gray-300 rounded-md overflow-hidden w-fit text-sm shadow-sm">
                    <tbody>
                    <tr className="border-b border-gray-200 hover:bg-amber-100  transition-all duration-300">
                        <th className="text-left px-4 py-2 font-medium text-gray-600 bg-gray-100 w-32">Quantity</th>
                        <td className="px-4 py-2 text-gray-900">{props.order_adnl_details.quantity}</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-amber-100  transition-all duration-300">
                        <th className="text-left px-4 py-2 font-medium text-gray-600 bg-gray-100">Cost</th>
                        <td className="px-4 py-2 text-gray-900">&#8377; {props.order_adnl_details.total_cost}</td>
                    </tr>
                    <tr className="hover:bg-amber-100 transition-all duration-300">
                        <th className="text-left px-4 py-2 font-medium text-gray-600 bg-gray-100">Payment Type</th>
                        <td className="px-4 py-2 text-gray-900">{props.order_adnl_details.payment_type == true ? "UPI / Cards" : "Cash"}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        }

        <div className='flex w-full absolute bottom-2 justify-between text-sm'>
            <button className='bg-red-500 text-white px-3 py-1 rounded-xl mx-3'
            onClick={props.close}
            ><i className="fas fa-times"></i> cancel</button>
            <div className='mx-3 flex'>
                
                <button className='mr-4 text-white bg-red-500 px-2 py-1 rounded-lg flex gap-2 relative pl-8'
                onClick={() => handleDetails()}
                ><i className="fas fa-trash absolute left-3 top-2"></i> 
                        {delete_mutation.isPending ? 
                        <svg viewBox="25 25 50 50" className='svg_loading'>
                            <circle r="20" cy="50" cx="50" className='circle_loading stroke-white' ></circle>
                        </svg>
                        :
                        "delete"}
                </button>

                {
                    !props.isNotLive && 
                    <button className='bg-green-400 text-white px-3 py-1 rounded-lg flex gap-2 relative pl-10'
                    onClick={handle_checkout}
                    ><i className="fas fa-money-check-alt absolute left-3 top-2"></i> {
                        checkout_mutation.isPending ? 
                        <svg viewBox="25 25 50 50" className='svg_loading'>
                            <circle r="20" cy="50" cx="50" className='circle_loading stroke-white' ></circle>
                        </svg>
                        :
                        "check out"
                    }</button>
                }
            </div>
        </div>
    </div>
  )
}

export default ViewOrders
