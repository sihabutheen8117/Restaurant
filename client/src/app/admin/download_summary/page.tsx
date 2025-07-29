import React from 'react'
import FetchSummary from '@/components/admin/FetchSummary'
import { inter } from '@/utils/fonts'

const page = () => {
  return (
    <div>
      <div className={`font-semibold text-xl ${inter.className}`}>
        Download Orders Summary
      </div>
      <FetchSummary/>
    </div>
  )
}

export default page
