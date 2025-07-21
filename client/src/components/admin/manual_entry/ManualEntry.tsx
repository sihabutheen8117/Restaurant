"use client"

import React from 'react'
import { inter } from '@/utils/fonts'
import NewEntry from './NewEntry'
import Entries from './Entries'

import { useState } from 'react'

const ManualEntry = () => {

    const [ is_entry , set_is_entry  ] = useState(true) ;
    const [ search , set_search ] = useState("") ;
    const [ selected_food , set_selected_food ] = useState() ;
    
    const food_names = [ "burger" , "pizza" , "Magii" , "Semiya" , "uppuma" , "pizzavar"];

  return (
    <div>
      <div className='w-full mt-2 px-3 flex justify-between whitespace-nowrap'>

                    <div className=''>
                        <button className={` ${inter.className} text-sm px-2   py-2 mr-2 font-semibold opacity-75 border-b-2 ${ is_entry==true ? "border-amber-400 bg-amber-50" : "border-gray-300 bg-white"}  `}
                        onClick={ () => set_is_entry(true)}
                        >New Entry</button>

                        <button className={` ${inter.className} text-sm px-2  py-2 mr-2 font-semibold opacity-75 border-b-2 ${ is_entry==false ? "border-amber-400 bg-amber-50" : "border-gray-300 bg-white"}  `}
                        onClick={ () => set_is_entry(false)}
                        >Entries</button>
                    </div>

                    <div className="relative w-full max-w-sm">
                      <input
                        type="text"
                        placeholder={ is_entry == true ? "search foods" : "search entries"}
                        className="w-full pl-10 pr-4 py-1 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                        onChange={ (e) => set_search(e.target.value)}
                      />
                      <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        { (search != "" && food_names.length > 0) && (
                            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                {food_names
                                    .filter(food => food.toLowerCase().includes(search.toLowerCase()))
                                    .map((food, index) => (
                                    <li
                                        key={index}
                                        className="px-4 py-2 cursor-pointer hover:bg-amber-100"
                                    >
                                        {food}
                                    </li>
                                    ))}
                            </ul>
                        )}
                    </div>
        </div>
        <div className=''>
        {
            is_entry == true ?
            <NewEntry/>
            :
            <Entries/>
        }
        </div>
    </div>
  )
}

export default ManualEntry
