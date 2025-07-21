
import React from 'react'
import { inter } from '@/utils/fonts'
import Link from 'next/link'


const AdminPanel = () => {

  return (
    <div className='mt-4'>
      <div className={` ${inter.className}  font-semibold flex flex-col items-center gap-2 text-sm`}>
        <Link href="dashboard">
          <div className="group w-44 h-10 flex items-center gap-2 pl-4 hover:border-l-2 hover:border-amber-400 hover:bg-amber-50">
            <i className="fas fa-th-large text-gray-700 group-hover:text-amber-500 transition-colors duration-200"></i>
            <span className="text-black">Dashboard</span>
          </div>
        </Link>
        <Link href="liveorders">
          <div className=' group w-44 h-10 flex items-center gap-2 pl-4 hover:border-l-2 hover:border-amber-400 hover:bg-amber-50'>
            <i className="fas fa-bolt text-gray-700 group-hover:text-amber-500 transition-colors duration-200"></i>
            Live Orders
          </div>
        </Link>
        <Link href="managefoods">
          <div className=' group w-44 h-10 flex items-center gap-2 pl-4 hover:border-l-2 hover:border-amber-400 hover:bg-amber-50'>
            <i className="fas fa-utensils text-gray-700 group-hover:text-amber-500 transition-colors duration-200"></i>
            Manage Foods
          </div>
        </Link>
        <Link href="analytics">
          <div className=' group w-44 h-10 flex items-center gap-2 pl-4 hover:border-l-2 hover:border-amber-400 hover:bg-amber-50'>
            <i className="fas fa-chart-line text-gray-700 group-hover:text-amber-500 transition-colors duration-200"></i>
            Analytics
          </div>
        </Link>
        <Link href="manual_entry">
          <div className=' group w-44 h-10 flex items-center gap-2 pl-4 hover:border-l-2 hover:border-amber-400 hover:bg-amber-50'>
            <i className="fas fa-edit text-gray-700 group-hover:text-amber-500 transition-colors duration-200"></i>
              Manual Entries
          </div>
        </Link>
        <Link href="settings">
          <div className=' group w-44 h-10 flex items-center gap-2 pl-4 hover:border-l-2 hover:border-amber-400 hover:bg-amber-50'>
            <i className="fas fa-gear text-gray-700 group-hover:text-amber-500 transition-colors duration-200"></i>
            Settings
          </div>
        </Link>
      </div>
    </div>
  )
}

export default AdminPanel
