"use client"

import React from 'react'
import { inter } from '@/utils/fonts'
import NewEntry from './NewEntry'
import Entries from './Entries'
import { useQuery } from '@tanstack/react-query'
import { manual_entry_get_foods } from '@/reactQuery/queries'
import { useState } from 'react'


const ManualEntry = () => {

    const [ is_entry , set_is_entry  ] = useState(true) ;
    const [ search , set_search ] = useState("") ;
    const [ selected_food , set_selected_food ] = useState<any[]>([]) ;

    const food_data = useQuery({
        queryKey : ["manual_entry_foods"] ,
        queryFn : manual_entry_get_foods ,
    })

    const handleRemoveFood = (idToRemove: string) => {
        set_selected_food((prev) => prev.filter((food) => food._id !== idToRemove));
      };      

    const handleUpdateFoodQuandity = (updatedFood: any) => {
        set_selected_food((prev) =>
          prev.map((food) =>
            food._id === updatedFood._id ? { ...food, quandity : updatedFood.quandity } : food
          )
        );
      };


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
                        value={search}
                        className="w-full pl-10 pr-4 py-1 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                        onChange={ (e) => set_search(e.target.value)}
                      />
                      <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        { is_entry && (search != "" && food_data.isSuccess && food_data.data.data.length > 0) && (
                            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                {
                                food_data.data.data
                                    .filter((food:any) => food.food_name.toLowerCase().includes(search.toLowerCase()))
                                    .map((food :any , index : any) => (
                                    <li
                                        key={index}
                                        className="px-4 py-2 cursor-pointer hover:bg-amber-100"
                                        onClick={() =>
                                            set_selected_food((prev: any[]) => {
                                              const alreadyExists = prev.some((item) => item._id === food._id);
                                              set_search("")
                                              if (alreadyExists) return prev;
                                              return [...prev, {...food , quandity : '1' }];
                                            })
                                          }
                                    >
                                        {food.food_name}
                                    </li>
                                    ))}
                            </ul>
                        )}
                    </div>
        </div>
        <div className=''>
        {
            is_entry == true ?
            <NewEntry 
              selected_food={selected_food} 
              remove_food={ (_id:any) => handleRemoveFood(_id)} 
              handleUpdateFoodQuandity={(data:any) => handleUpdateFoodQuandity(data)} 
              reset={() => set_selected_food([])}
            />
            :
            <Entries
            search={search}
            />
        }
        </div>
    </div>
  )
}

export default ManualEntry
