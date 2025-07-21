import React from 'react'
import Contruction from '@/components/admin/Contruction'
import { inter } from '@/utils/fonts'
import ManualEntry from '@/components/admin/manual_entry/ManualEntry'

const page = () => {
  return (
    <div>
      <div className={` ${inter.className} font-semibold text-lg flex justify-between`}>
        Manual Entry
      </div>
      <div className=''>
        <ManualEntry/>
      </div>
    </div>
  )
}

export default page
