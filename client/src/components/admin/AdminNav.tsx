"use client"

import { useState } from "react";
import ProfileMenu from "../User/ProfileMenu";
import { lexend } from "@/utils/fonts";
import '@/styles/mainStyles.css'


const AdminNav = () => {
  
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
                  <input
                      placeholder="search here..."
                      className="md:w-96 w-52 px-4 py-1 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-[#FFF085]  focus:border-[#FFF085] transition"
                  />
                  <button className="">
                    <i className="text-gray-400 absolute fas fa-search md:left-87 left-44 top-2"></i>
                  </button>
          </div>
          <div className=" hidden md:flex md:gap-2 ">
              <div className="">User Name</div>
              <div className="bg-gray-400 text-white rounded-full w-8 h-8 relative">
                <i className="fas fa-user absolute top-2 right-2.5"></i>
              </div>
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
      </div>
    )
}

export default AdminNav
