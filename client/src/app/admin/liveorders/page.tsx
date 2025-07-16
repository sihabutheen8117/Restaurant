import React from 'react'
import { inter } from '@/utils/fonts'
import LiveOrders from '@/components/admin/liveorders/LiveOrders'

const page = () => {

  const isNotLive : boolean = false ;
  return (
    <div>
      <div className={` ${inter.className} font-semibold text-lg`}>
        Live Orders
      </div>
      
      <div className=''>
        <LiveOrders isNotLive={isNotLive}/>
      </div>
    </div>
  )
}

export default page
