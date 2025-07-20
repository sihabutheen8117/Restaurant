"use client"

import React from 'react'
import { inter } from '@/utils/fonts'
import ViewManageFoods from '@/components/admin/managefoods/ViewManageFoods'
import { useState } from 'react'
import AddNewFood from '@/components/admin/managefoods/AddNewFood'
import AddNewCategory from '@/components/admin/managefoods/AddNewCategory'
import { get_all_categories } from '@/reactQuery/queries'
import { useQuery } from '@tanstack/react-query'

const page = () => {

    const [view , setView ] = useState(false) ;
    const [selectFloat , setSelectFload] : any = useState();
    const [ search ,setSearch ] = useState<string>("");
    const [ cat_filter , set_cat_filter ] = useState("All") ;

    const all_categories = useQuery({
        queryKey : ['categories'] ,
        queryFn : get_all_categories
    })

    const handleNewFood = () => {
        handleView() 
        setSelectFload(<AddNewFood handleView={() => setView(false)} all_categories={all_categories.data}/>)
    }

    const handleNewCategory = () => {
        handleView() 
        setSelectFload(<AddNewCategory handleView={() => setView(false)}/>)
    }
    
    const handleView = () => {
        console.log('handle View clicked')
        setView( !view ) 
    }

    const category = ["All", ...(all_categories.data?.data || [])];

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
                onChange={(e) => setSearch(e.target.value ) }
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
            {/* <button className='group py-1.5 px-2 bg-white text-sm rounded-lg shadow-lg hover:bg-amber-50'
            onClick={handleNewCategory}
            >
                <i className="group-hover:text-amber-500 transition-all duration-200 fas fa-plus pr-2"></i> New category
            </button> */}
        </div>
      </div>
      <div className='flex flex-nowrap gap-2 w-full overflow-x-auto py-2 my-1'>
      {
            category.map( (items , index ) =>( 
                <button className={`border-2  rounded-full whitespace-nowrap px-2 text-sm ${ items == cat_filter ? "bg-amber-200 text-white border-amber-300" : "border-gray-400" } `} key={index}
                onClick={() => set_cat_filter(items)}
                >
                    {items}
                </button>
            ))
        }
      </div>
        <div className=''>
            <ViewManageFoods filter={search}  all_categories={all_categories.data} cat_filter={cat_filter}/>
        </div>
    </div>
  )
}

export default page
