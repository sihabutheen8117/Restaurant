import React from 'react'
import { inter } from '@/utils/fonts'

const AdminPanel = () => {
  return (
    <div className='mt-4'>
      <div className={` ${inter.className}  font-semibold flex flex-col items-center gap-2 text-sm`}>
        <div className="group w-44 h-10 flex items-center gap-2 pl-4 hover:border-l-2 hover:border-amber-400 hover:bg-amber-50">
          <i className="fas fa-th-large text-gray-700 group-hover:text-amber-500 transition-colors duration-200"></i>
          <span className="text-black">Dashboard</span>
        </div>
        <div className=' group w-44 h-10 flex items-center gap-2 pl-4 hover:border-l-2 hover:border-amber-400 hover:bg-amber-50'>
          <i className="fas fa-bolt text-gray-700 group-hover:text-amber-500 transition-colors duration-200"></i>
          Live Orders
        </div>
        <div className=' group w-44 h-10 flex items-center gap-2 pl-4 hover:border-l-2 hover:border-amber-400 hover:bg-amber-50'>
          <i className="fas fa-utensils text-gray-700 group-hover:text-amber-500 transition-colors duration-200"></i>
          Manage Foods
        </div>
        <div className=' group w-44 h-10 flex items-center gap-2 pl-4 hover:border-l-2 hover:border-amber-400 hover:bg-amber-50'>
          <i className="fas fa-chart-line text-gray-700 group-hover:text-amber-500 transition-colors duration-200"></i>
          Analytics
        </div>
        <div className=' group w-44 h-10 flex items-center gap-2 pl-4 hover:border-l-2 hover:border-amber-400 hover:bg-amber-50'>
          <i className="fas fa-history text-gray-700 group-hover:text-amber-500 transition-colors duration-200"></i>
          Sales History
        </div>
        <div className=' group w-44 h-10 flex items-center gap-2 pl-4 hover:border-l-2 hover:border-amber-400 hover:bg-amber-50'>
          <i className="fas fa-gear text-gray-700 group-hover:text-amber-500 transition-colors duration-200"></i>
          Settings
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
