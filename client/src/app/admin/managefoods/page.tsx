"use client"

import React from 'react'
import { inter } from '@/utils/fonts'
import ViewManageFoods from '@/components/admin/managefoods/ViewManageFoods'
import { useState } from 'react'
import EditFoods from '@/components/admin/managefoods/EditFoods'
import AddNewCategory from '@/components/admin/managefoods/AddNewCategory'
import { EDGE_RUNTIME_WEBPACK } from 'next/dist/shared/lib/constants'

const page = () => {

    const [view , setView ] = useState(false) ;
    const [selectFloat , setSelectFload] : any = useState();

    const handleNewFood = () => {
        handleView() 
        setSelectFload(<EditFoods/>)
    }

    const handleNewCategory = () => {
        handleView() 
        setSelectFload(<AddNewCategory/>)
    }
    
    const handleView = () => {
        setView( !view ) 
    }

    const category : string[] = [
        "all" , "drinks" , "lunch" , "breakfast" , "dinner" , "spice" , "sweet" , "snacks" , "cakes" , "all" , "drinks" , "lunch" , "breakfast" , "dinner" , "spice" , "sweet" , "snacks" , "cakes", "all" , "drinks" , "lunch" , "breakfast" , "dinner" , "spice" , "sweet" , "snacks" , "cakes"
    ]

  return (
    <div className='flex flex-col w-full'>
        {
           
           view && <div 
           >
               <div className='fixed inset-0 bg-black opacity-40 z-10'
               onClick={handleView}> </div>
               <div className='z-50 bg-white fixed inset-x-50 inset-y-20 rounded-xl'>
                {
                    selectFloat
                }
               </div>
           </div>
       }
      <div className={` ${inter.className} font-semibold text-lg flex justify-between`}>
        <div>Manage Foods</div>
        <div className='flex gap-7'>
            <div className="relative max-w-xs group focus-within:text-amber-500 text-sm">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 group-focus-within:text-amber-500">
                    <i className="fas fa-search"></i>
                </div>
            </div>
            <button className='group py-1.5 px-2 bg-white text-sm rounded-lg shadow-lg hover:bg-amber-50'
            onClick={handleNewFood}
            >
                <i className="group-hover:text-amber-500 transition-all duration-200 fas fa-plus pr-2"></i> New Food
            </button>
            <button className='group py-1.5 px-2 bg-white text-sm rounded-lg shadow-lg hover:bg-amber-50'
            onClick={handleNewCategory}
            >
                <i className="group-hover:text-amber-500 transition-all duration-200 fas fa-plus pr-2"></i> New category
            </button>
        </div>
      </div>
      <div className='flex flex-nowrap gap-2 w-full overflow-x-auto py-2 my-1'>
      {
            category.map( (items , index ) =>( 
                <div className='border-2 border-gray-400 rounded-full whitespace-nowrap px-2' key={index}>
                    {items}
                </div>
            ))
        }
      </div>
        <div className=''>
            <ViewManageFoods/>
        </div>
    </div>
  )
}

export default page
