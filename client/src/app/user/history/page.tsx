"use client"
import React from 'react'
import { useState } from 'react'
import OrderDetails from '@/components/User/OrderDetails'
import UserNav from '@/components/User/UserNav'
import  { useRouter}  from 'next/navigation'
import { myOrders } from '@/reactQuery/queries'
import { useQuery } from '@tanstack/react-query'

const page = () => {

  const router = useRouter() ;

  const myOrdersQuery = useQuery({
    queryKey :  ["my_orders"] ,
    queryFn : () => myOrders()
  })

  const [ order_details , set_order_details ] = useState({}) ;
  const [ total__details ,set_total_details ] = useState({}) ;

  const handleGoBack = () => {
    router.push('/user/client');
  }

  const [ view , setView ] = useState(false) ;
  return (
    <div>
      <div className="z-20">
        <UserNav isSearch={false} isBack={true} goBack={() => handleGoBack()}/>
      </div>
      {
        view && 
        <div className=''>
          <div className='fixed inset-0 bg-black opacity-15 z-10 h-screen'
          onClick={() => setView(!view)}>
          </div>
          <div className='fixed inset-x-10 inset-y-40 bg-white z-50'>
            <OrderDetails close={() => setView(!view)} food_details={order_details} total__details={total__details}/>
          </div>
        </div>
      }
      
      <div className='mx-4 my-4'>
      {
        myOrdersQuery.isSuccess &&
        myOrdersQuery.data.data.map( (items :any, index : any) => {
          
          const orderDate = new Date(items.order_date);
          const formattedDate = orderDate.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
          const formattedTime = orderDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Asia/Kolkata',
          });
          return(
            <div className='w-full border-2 border-gray-200 rounded-xl p-2 mb-2' key={index}>
                <div className='flex justify-between'>
                    <div className=''> {formattedDate}</div>
                    <div className={` ${items.order_status == "pending" ? "text-red-400" : "text-green-400"} `}>{items.order_status} </div>
                    <div className=''>{formattedTime}</div>
                </div>
                <div className='flex justify-between mt-2'>
                    <div className='mx-3 flex gap-4 my-1'>
                        
                        <div className='text-2xl font-bold relative'>
                            <span className="absolute top-1 -left-2.5 text-sm text-gray-600">₹</span>
                            { items.total_cost}
                        </div>
                        <div className='text-sm opacity-75 flex items-center'>
                            (Qt : {items.quandity})
                        </div>
                    </div>
                    <div className='my-1'>
                        <button className='bg-green-400 text-white hover:bg-green-500 px-3 py-1 rounded-xl'
                        onClick={() => {
                          setView(!view)
                          set_order_details({ order_food_data : items.ordered_foods , status : items.order_status , order_id : items._id})
                          set_total_details({
                            total_cost : items.total_cost,
                            quandity : items.quandity
                          })
                        }}
                        >
                            Order details
                        </button>
                    </div>
                </div>
            </div>
            )
        })
      }
      </div>
    </div>
  )
}

export default page
