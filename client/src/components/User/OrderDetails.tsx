
import React from 'react'
import { deleteOrder } from '@/reactQuery/queries'
import {  useMutation , useQueryClient} from '@tanstack/react-query';
import MobileLoaders from '../Loaders/MobileLoaders';

const OrderDetails = (props :any) => {

    const queryClient = useQueryClient()
    

    const delete_order_mutation = useMutation({
        mutationFn : deleteOrder ,
        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey : ['my_orders']
            })
            props.close()
        }
    })

    const handleDeleteOrder = () => {
        const confirmation = window.confirm("Are you sure , do you want to cancel this Order ? ")
        if(confirmation)
        {
            delete_order_mutation.mutate({
                _id : props.food_details.order_id
            })
        }
    }

  return (
    <div className='h-full'>
        <div className='flex justify-end mx-3 my-2'>
            <button className='border-2 rounded-xl px-2 py-1 border-gray-300 text-gray-500 hover:bg-gray-200'
            onClick={() => props.close()}
            >
                ×
        </button>
        </div>
        <div className='mx-5 h-9/12 overflow-y-auto border-t-2 border-b-2 border-gray-300'>
            {
             
            props.food_details.order_food_data.map( (item:any , index : any  ) => (
                <div className='border-2 border-gray-200 rounded-lg mb-2' key={index}>
                <div className=''>
                <div className='flex gap-2 h-8 bg-gray-300 px-2 justify-center' >
                      <div className='font-semibold text-xl'>
                        <div className=''>
                          {item.food_name}
                        </div>
                       </div> 
                  </div>
                </div>
                <div className='my-1 flex justify-center'>
                    <span className='opacity-75 text-sm'>Qt : </span>
                    {item.quantity}
                    <span className='mx-4'>×</span>
                    <span className='font-bold relative mx-1'>
                        <span className="absolute top-0.5 -left-2 text-xs text-gray-600 ">₹</span>
                        {item.price }
                    </span>
                    <span className='mx-4'>=</span>
                    <span className='font-bold relative mx-1'>
                        <span className="absolute top-0.5 -left-2 text-xs text-gray-600 ">₹</span>
                        { item.quantity *  item.price }
                    </span>
                </div>
            </div>
                ))
        }
        </div>
        <div className='flex justify-between mx-5 my-3'>
            <div className='mx-3 flex gap-4 '>
                        
                <div className='text-2xl font-bold relative'>
                    <span className="absolute top-1 -left-2.5 text-sm text-gray-600">₹</span>
                    {props.total__details.total_cost}
                </div>
                <div className='text-sm opacity-75 flex items-center'>
                    ( Qt : {props.total__details.quandity} )
                </div>
            </div>
            {
                props.food_details.status == "pending" 
                ?
                <button className='ml-4 bg-red-500 text-white rounded-xl py-1 px-2'
                onClick={()=>handleDeleteOrder()}
                disabled = {delete_order_mutation.isPending}
                >
                    {
                        delete_order_mutation.isPending ? 
                        <svg viewBox="25 25 50 50" className='svg_loading'>
                            <circle r="20" cy="50" cx="50" className='circle_loading stroke-white' ></circle>
                        </svg>
                        :
                        "Cancel Order"
                    }
                    
                </button>
                :
                <button className='ml-4  text-green-600 py-1 px-2 border-2 border-green-300 rounded-xl'>
                    successfull
                </button>
            }
        </div>
        
    </div>
  )
}

export default OrderDetails
