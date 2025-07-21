"use client"

import UserNav from "@/components/User/UserNav"
import UserHeading from "@/components/User/UserHeading"
import UserMenu from "@/components/User/UserMenu"
import Banner from "@/components/User/Banner"
import UserProduct from "@/components/User/UserProduct"
import { useState } from "react"
import { UserFilters } from "@/reactQuery/itemInterfaces"
import { CartItems } from "@/reactQuery/itemInterfaces"
import React, { Suspense } from 'react';

const page = () => {

  const defaultFilters: UserFilters = {
    price_order: 0,
    price_range: 10,
    ratings: 0
  };

  const [togFilter  ,setTogFilter ] = useState(false)
  const [ search , setSearch ] = useState('') ;
  const [ user_cart , set_user_cart ] = useState<CartItems[]>([])
  const [ filters , setFilters ] = useState<UserFilters>(defaultFilters) ;

  const handleFilter = () => {
    setTogFilter(!togFilter)
  }
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        {
          togFilter && <div
          className="fixed inset-0 bg-black opacity-40 z-10"
          onClick={handleFilter}
          />
        }
        <div className="z-20">
          <UserNav search={(data:string) => setSearch(data)} isSearch={true} isBack={false}/>
        </div>
        <div className="md:flex w-full relative">
          <div className="w-1/6 h-screen hidden md:block">
            <UserMenu setFilter={(data:UserFilters) => setFilters(data)} close={() => setTogFilter(false)} />
          </div>
          {
            togFilter && <div
            className="fixed right-0 z-50 bg-white top-0"
            >
              <UserMenu setFilter={(data:UserFilters) => setFilters(data)} filters={filters} close={() => setTogFilter(false)}/>
              <div className="absolute top-5 right-4"
              onClick={handleFilter}
              >
                <i className="fa-solid fa-xmark text-xl font-semibold"></i>
              </div>
            </div>
          }
          <div className="w-full md:w-5/6">
            <div className="md:hidden flex justify-end mx-2.5 mt-14 gap-4">
              {
                (
                  filters.price_order !== defaultFilters.price_order ||
                  filters.price_range !== defaultFilters.price_range ||
                  filters.ratings !== defaultFilters.ratings
                ) && 
                <button className=" bg-red-400 text-white rounded-xl px-2 pb-1 relative pr-8"
                onClick={ () => setFilters(defaultFilters) }
                >
                  remove
                  <i className="fa-solid fa-xmark text-xl font-semibold absolute top-1 pl-2"></i>
                </button>
              }
              <button
              onClick={handleFilter}
              >
                filter
                <i className="fas fa-filter pt-2 pl-2"></i>
              </button>
            </div>
            <div className="">
            <div className="md:block hidden">
              <UserHeading/>
            </div>
            </div>
            <div className="md:mt-28 mt-2 mb-20">
                <div className="mb-4 mt-1">
                  <Banner/>
                </div>
                <div className="md:px-7 px-2 md:my-7 md:mx-3">
                  <UserProduct search={search} filters={filters} user_cart={user_cart} set_user_cart={set_user_cart}/> 
                </div> 
            </div>
          </div>
          
        </div>    
      </div>
    </Suspense>
  )
}

export default page
