"use client"

import { useState } from "react";
import ProfileMenu from "./ProfileMenu";
import { lexend } from "@/utils/fonts";
import '@/styles/mainStyles.css'
import Link from "next/link";



const UserNav = (props:any) => {

  const [toggle , unToggle ] = useState(false) ;
  const toggleProfile = () => {
    console.log("toggle")
    unToggle(!toggle)
  }

  return (
    <div className="pt-3 relative">
      {
        toggle && <div
        className="fixed inset-0 bg-black opacity-40 z-40"
        onClick={() => toggleProfile()}
        />
      }
      <div className="flex justify-between px-3 ">
        <div className={`${lexend.className} md:text-2xl text-lg pt-1 whitespace-nowrap`}>
            <span className={`text-[#FFF085] font-semibold`}>Al</span>-Khalid
        </div>
        <div className='relative flex'>
                {
                  props.isSearch && 
                  <input
                    placeholder="search here..."
                    className="md:w-96 w-52 px-4 py-1 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-[#FFF085]  focus:border-[#FFF085] transition"
                    onChange={(e) => props.search(e.target.value)}
                  />
                }
                {
                  props.isSearch &&
                  <button className="">
                    <i className="text-gray-400 absolute fas fa-search md:left-87 left-44 top-2"></i>
                  </button>
                }
                {
                  props.isSearch && 
                  <button className="hidden md:block text-xl">
                    <i className="fas fa-shopping-cart pl-7 md:text-2xl text-lg pr-2"></i>
                    (0)
                  </button>
                }
        </div>
        <div className=" hidden md:flex md:gap-2 ">
            <div className="pt-2">User Name</div>
            <div className="mt-1 w-8 h-8 rounded-full bg-red-700"></div>
            <button className="pl-3 font-semibold"
            onClick={toggleProfile}
            >
              {
                <div className="text-2xl">☰</div>
              }
            </button>
        </div>

        <div className="md:hidden">
          <button className="pl-3 font-semibold"
            onClick={toggleProfile}
            >
              {
                <div className="text-2xl">☰</div>
              }
          </button>
        </div>
        
      </div>

      <div className="fixed right-0 z-40 top-0">
        {
          toggle && <ProfileMenu toggle={toggleProfile}/>
        }
      </div>
      {
        props.isBack && 
          <button className="mt-2 ml-3 border-2 rounded-full px-2 "
          onClick={props.goBack}
          >
            <i className="fas fa-arrow-left"></i> Back
          </button>
      }
    </div>
  )
}

export default UserNav
