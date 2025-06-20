"use client"

import React from 'react'
import { inter } from '@/utils/fonts'
import { useState } from 'react'
import ViewOrders from './ViewOrders'

const LiveOrders = (props : any) => {

    const [view , setView ] = useState(false) ;

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
                <ViewOrders close={handleView} isNotLive={props.isNotLive}/>
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
                      <tr className='h-10'>
                          <td className=''>#02302</td>
                          <td>Kader ismail</td>
                          <td>12-12-12</td>
                          <td>12:12 am</td>
                          <td>&#8377; 360</td>
                          <td className=''>5</td>
                          {
                            props.isNotLive && 
                            <td className='text-left'>manual</td>
                          }
                          <td className='flex justify-center h-10 items-center'
                          ><i className="fas fa-eye"
                          onClick={handleView}
                          ></i></td>
                          {
                            props.isNotLive && 
                            <td className='text-left'><button className='mr-4 text-white bg-red-500 px-2 py-1 rounded-lg'><i className="fas fa-trash"></i></button></td>
                          }
                          
                      </tr>
                      <tr className='h-10'>
                          <td className='py-2'>#02303</td>
                          <td>Azeem</td>
                          <td>12-12-12</td>
                          <td>12:12 am</td>
                          <td>&#8377; 160</td>
                          <td>9</td>
                          {
                            props.isNotLive && 
                            <td className='text-left'>manual</td>
                          }
                          <td className='flex justify-center h-10 items-center'
                          ><i className="fas fa-eye"
                          onClick={handleView}
                          ></i></td>
                          {
                            props.isNotLive && 
                            <td className='text-left'><button className='mr-4 text-white bg-red-500 px-2 py-1 rounded-lg'><i className="fas fa-trash"></i></button></td>
                          }
                      </tr>
                      <tr className='h-10'>
                          <td className='py-2'>#02304</td>
                          <td>Ibrahim</td>
                          <td>12-12-12</td>
                          <td>12:12 am</td>
                          <td>&#8377; 260</td>
                          <td>8</td>
                          {
                            props.isNotLive && 
                            <td className='text-left'>manual</td>
                          }
                          <td className='flex justify-center h-10 items-center'
                          ><i className="fas fa-eye"
                          onClick={handleView}
                          ></i></td>
                          {
                            props.isNotLive && 
                            <td className='text-left'><button className='mr-4 text-white bg-red-500 px-2 py-1 rounded-lg'><i className="fas fa-trash"></i></button></td>
                          }
                      </tr>
                  </tbody>
              </table>
            </div>
        </div>
    </div>
  )
}

export default LiveOrders
