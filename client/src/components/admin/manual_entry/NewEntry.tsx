"use client"

import React from 'react'
import { inter } from '@/utils/fonts'
import { useState } from 'react'
import { place_entry } from '@/reactQuery/queries'
import { useMutation } from '@tanstack/react-query'

const NewEntry = (props:any) => {

  const [ order_details , set_order_details ] = useState({
    payment_type : false ,
    user_name : "" ,
  }) ;

  const place_entry_mutation = useMutation({
    mutationFn : place_entry
  })
  
  const handleCreateEntry = () => {
    const totals = props.selected_food.reduce(
      (acc: { totalQty: number; totalCost: number }, item: any) => {
        const qty = parseInt(item.quandity || 0);
        const price =
          item.offer_price === -1 ? item.price : item.offer_price;
        acc.totalQty += qty;
        acc.totalCost += qty * price;
        return acc;
      },
      { totalQty: 0, totalCost: 0 }
    );

    const order_data = props.selected_food.map( (items:any) => ({
      _id : items._id ,
      quantity : items.quandity  
    }))

    const final_data = {
      ...order_details ,
      quandity : totals.totalQty ,
      total_cost : totals.totalCost ,
      order_data : order_data
    }

    place_entry_mutation.mutate(final_data) ;

  }

  return (
    <div className='m-2 mt-3'>
      <div className="w-full max-w-md ">
        <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 mb-1">
          Customer Name
        </label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          placeholder="name"
          className="w-full px-3 py-0.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none  focus:border-amber-300"
          value={order_details.user_name}
          onChange={(e) => set_order_details( (prev:any) => ({ ...prev , user_name : e.target.value}) )}
        />
      </div>

      <div className="flex items-center space-x-2 mt-3">
        <input
          id="checkbox1"
          type="checkbox"
          checked={order_details.payment_type}
          className="h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          onChange={() => set_order_details( (prev:any) => ({ ...prev , payment_type : !prev.payment_type}) )}
        />
        <label htmlFor="checkbox1" className="text-sm font-medium text-gray-700">
          UPI / card payments
        </label>
      </div>

      <div className='font-medium text-gray-700 mt-2 w-2/3 flex justify-between'>
        <div className=''>ordered foods</div>
        <div className='text-sm'>
            <button className='bg-red-500 rounded-xl px-2 py-0.5 text-white'
            onClick={() => {
              set_order_details({
                payment_type : false ,
                user_name : "" ,
              })
              props.reset()
            }}
            >
              <i className="fas fa-rotate-left mr-1"></i>
              reset
            </button>
            <button className='ml-3 bg-green-500 rounded-xl px-2 py-0.5 text-white'
            onClick={() => handleCreateEntry()}
            >
              <i className="fas fa-edit mr-1"></i>  
              create Entry
            </button>
          </div>
      </div>

      <div className='border-2 rounded-xl w-2/3 border-gray-200 h-[55vh] relative mt-2'>
              <div className='rounded-lg bg-gray-100 shadow-lg p-2'>
                    <div className={`${inter.className}  mt-2 overflow-x-auto h-[55vh]`}>
                      <table className='border-collapse w-full'>
                          <thead className='sticky top-0 z-10 text-sm h-6 bg-gray-100'>
                              <tr className='opacity-75'>
                                  <th className='text-left w-10'>S.no</th>
                                  <th className='text-left'>Food</th>
                                  <th className='text-left'>Qt</th>
                                  <th className='text-left'>Price</th>
                                  <th className='text-left'>Total</th>
                                  <th className='text-center w-14'>remove</th>
                              </tr>
                          </thead>
                          <tbody className='text-sm overflow-y-auto'>
                            {
                              props.selected_food  && 
                                props.selected_food.map( (items :any , index : any) => {
                                  
                                  const effectivePrice = items.offer_price == -1 ? items.price : items.offer_price 
                                  
                                  return (
                                  <tr className='h-8' key={index}>
                                    <td>{index+1}</td>
                                    <td>{items.food_name}</td>
                                    <td><input
                                        type="number"
                                        id="user_name"
                                        name="user_name"
                                        value={items.quandity}
                                        className="w-16 px-2 py-0.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none  focus:border-amber-300"
                                        onChange={(e) => props.handleUpdateFoodQuandity({
                                          _id : items._id ,
                                          quandity : e.target.value
                                        })}
                                      />
                                    </td>
                                    <td>&#8377; {effectivePrice}</td>
                                    <td>&#8377; {effectivePrice * items.quandity }</td>
                                    <td className='text-center'> 
                                      <button
                                      onClick={() => props.remove_food(items._id)}
                                      ><i className="fas fa-trash text-red-500"></i></button>
                                    </td>
                                  </tr>
                                )})
                            }
                            {
                              (() => {

                                const totals = props.selected_food.reduce(
                                  (acc: { totalQty: number; totalCost: number }, item: any) => {
                                    const qty = parseInt(item.quandity || 0);
                                    const price =
                                      item.offer_price === -1 ? item.price : item.offer_price;
                                    acc.totalQty += qty;
                                    acc.totalCost += qty * price;
                                    return acc;
                                  },
                                  { totalQty: 0, totalCost: 0 }
                                );

                                return (
                                  <tr
                                    className={`${inter.className} font-semibold h-8 sticky bottom-0 z-10 bg-gray-100 border-t-2 border-gray-200`}
                                  >
                                    <td></td>
                                    <td>Total</td>
                                    <td className=''>{totals.totalQty}</td>
                                    <td></td>
                                    <td>&#8377; {totals.totalCost}</td>
                                    <td></td>
                                  </tr>
                                );
                              })()
                            }
                          </tbody>
                        </table>
                    </div>
                </div>

                
      </div>

    </div>
  )
}

export default NewEntry
