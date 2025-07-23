import React from 'react'
import Contruction from '@/components/admin/Contruction'
import { inter } from '@/utils/fonts'
import AnalyticsView from '@/components/admin/analytics/AnalyticsView'


const page = () => {
  return (
    <div className=''>
   
      <div className={`font-semibold text-xl ${inter.className}`}>
        Analytics
      </div>
      <div className=''>
        <AnalyticsView/>
      </div>
    </div>
  )
}

export default page
