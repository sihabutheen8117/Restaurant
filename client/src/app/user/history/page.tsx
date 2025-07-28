"use client"
import React , {Suspense} from 'react'
import { useState } from 'react'
import OrderDetails from '@/components/User/OrderDetails'
import UserNav from '@/components/User/UserNav'
import  { useRouter}  from 'next/navigation'
import { myOrders } from '@/reactQuery/queries'
import { useQuery } from '@tanstack/react-query'
import ItemsNotFound from '@/components/Loaders/ItemsNotFound'
import { inter } from '@/utils/fonts'
import MobileLoaders from '@/components/Loaders/MobileLoaders'
import RatingsPage from '@/components/User/RatingsPage'

const page = () => {

  const router = useRouter() ;

  const myOrdersQuery = useQuery({
    queryKey :  ["my_orders"] ,
    queryFn : () => myOrders()
  })

  const [ order_details , set_order_details ] = useState({}) ;
  const [ total__details ,set_total_details ] = useState({}) ;
  const [ view_ratings , set_view_ratings ] = useState(false) ;
  const [ ratings_details , set_ratings_details ] = useState({});
  const [order_id , set_order_id ] = useState()
  const [ israted , set_israted ] = useState(false) ;
  const [ rated_data , set_rated_data ] = useState([{}]) ;

  const handleGoBack = () => {
    router.push('/user/client');
  }
  const [ view , setView ] = useState(false) ;

  if(myOrdersQuery.isLoading)
  {
    return(
      <Suspense fallback={<div>Loading...</div>}>
        <div className='mt-24'>
            <div className="z-20">
              <UserNav isSearch={false} isBack={true} goBack={() => handleGoBack()}/>
            </div>
            <div className='mx-3 mt-4'>
              <MobileLoaders/>
              <MobileLoaders/>
              <MobileLoaders/>
            </div>
        </div>
      </Suspense>
    )    
  }
  if(!myOrdersQuery.isLoading && (myOrdersQuery.isSuccess && myOrdersQuery.data.data.length ==0 ) )
  {
    return(
      <Suspense fallback={<div>Loading...</div>}>
        <div className='mt-24'>
            <div className="z-20">
              <UserNav isSearch={false} isBack={true} goBack={() => handleGoBack()}/>
            </div>
            <div className='w-full h-9/12 flex items-center justify-center flex-col'>
              <ItemsNotFound/>
              <div className={`text-2xl font-medium tracking-wide ${inter.className} `}> No Orders Found !</div>
            </div>
        </div>
      </Suspense>
    )
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div >
      <div className="z-20">
        <UserNav isSearch={false} isBack={true} goBack={() => handleGoBack()}/>
      </div>

      {
        view && 
        <div className=''>
          <div className='fixed inset-0 bg-black opacity-15 z-40 h-screen'
          onClick={() => setView(!view)}>
          </div>
          <div className='fixed inset-x-10 inset-y-40 bg-white z-50'>
            <OrderDetails close={() => setView(!view)} food_details={order_details} total__details={total__details}/>
          </div>
        </div>
      }
      {
        view_ratings && 
        <div className=''>
          <div className='fixed inset-0 bg-black opacity-15 z-40 h-screen'
          onClick={() => set_view_ratings(!view_ratings)}>
          </div>
          <div className='fixed inset-x-10 inset-y-40 bg-white z-50'>
            <RatingsPage 
              ratings_details={ratings_details}
              order_id={order_id}
              israted={israted}
              rated_data={rated_data}
              close={() => set_view_ratings(false)}
              />
          </div>
        </div>
      }
      
      <div className='mx-4 mt-24 mb-10'>
      {
        myOrdersQuery.isSuccess &&
        myOrdersQuery.data.data.map( (items :any, index : any) => {
          console.log(items)
          const orderDate = new Date(items.createdAt);
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
                <div className='flex justify-between mx-2 opacity-70'>
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
                          set_order_details({
                             order_food_data : items.ordered_foods ,
                             status : items.order_status , 
                             order_id : items._id})
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
                <div className='my-1 text-green-600 '>
                  {
                    items.isRated == true && 
                    <div className='text-center'>
                      ThankYou for your ratings
                    </div>
                  }
                </div>
                {
                  items.order_status == "paid" &&
                  <button className={`py-1.5  text-white font-medium text-sm rounded-md w-full mt-1 ${items.isRated ? "bg-green-400" : "bg-blue-400" }`}
                  onClick={() => {
                    set_ratings_details({
                        food_data : items.ordered_foods ,
                    })
                    set_order_id(items._id)
                    set_view_ratings(true);
                    set_israted(items.isRated)
                    set_rated_data(items.ratings)
                  }}
                  >
                    {
                      items.isRated == true ?
                      "View your ratings"
                      :
                      "leave a ratings"
                    }
                  </button>
                }
            </div>
            )
        })
      }
      </div>
    </div>
    </Suspense>
  )
}

export default page
