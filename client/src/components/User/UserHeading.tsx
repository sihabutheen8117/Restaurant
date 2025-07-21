"use client" 

import { get_all_categories } from '@/reactQuery/queries'
import { useQuery } from '@tanstack/react-query'

const UserHeading = (props:any) => {

    const all_categories = useQuery({
            queryKey : ['categories'] ,
            queryFn : get_all_categories
        })

    const category = ["All", ...(all_categories.data?.data || [])];
    
    return (
      <div className="md:mt-3 mt-1 fixed z-20 top-12 bg-white w-full">
        <div className="flex md:gap-3 gap-1.5 overflow-x-auto md:px-8 px-3 md:py-2 py-1.5">
          {category.map((items, index) => (
            <button
              className={`border-2 rounded-full whitespace-nowrap flex py-0.5 px-2 text-xs ${props.cat_filter == items ? "border-amber-400 bg-amber-300 text-white" : "border-gray-400 "}`}
              key={index}
              onClick={() => props.set_cat_filter(items)}
            >
              {items}
            </button>
          ))}
        </div>
      </div>
    );
  };
  

export default UserHeading
