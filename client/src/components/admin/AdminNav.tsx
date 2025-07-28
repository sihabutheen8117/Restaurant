"use client"

import { useState } from "react";
import ProfileMenu from "../User/ProfileMenu";
import { lexend } from "@/utils/fonts";
import '@/styles/mainStyles.css'
import { useRouter } from "next/navigation";

const navSearch = [
  { 
    "route_name" : "Dashboard" ,
    "link" : "dashboard" 
  } ,
  { 
    "route_name" : "Live Orders" ,
    "link" : "liveorders" 
  } ,
  { 
    "route_name" : "ManageFoods" ,
    "link" : "managefoods" 
  } ,
  { 
    "route_name" : "Analytics" ,
    "link" : "analytics" 
  } ,
  { 
    "route_name" : "Manual Entries" ,
    "link" : "manual_entry" 
  } ,
  { 
    "route_name" : "Settings" ,
    "link" : "settings" 
  } ,
  { 
    "route_name" : "New Orders" ,
    "link" : "liveorders" 
  } ,
  { 
    "route_name" : "Served Orders" ,
    "link" : "liveorders" 
  } ,
  { 
    "route_name" : "Reset" ,
    "link" : "settings" 
  } ,
  { 
    "route_name" : "Export Data" ,
    "link" : "analytics" 
  } 
]

const AdminNav = () => {
  
    const [toggle , unToggle ] = useState(false) ;
    const toggleProfile = () => {
      console.log("toggle")
      unToggle(!toggle)
    }

    const router = useRouter() ;

    const [ search , set_search ] = useState("") ;
  
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
                      onChange={ (e) =>  set_search(e.target.value)}
                  />
                  <button className="">
                    <i className="text-gray-400 absolute fas fa-search md:left-87 left-44 top-2">{}</i>
                  </button>
                  { search != "" && 
                    <div className="absolute z-30 top-10 w-full bg-white rounded-xl font-medium border-2 border-gray-200">
                    {

                      navSearch.map( (hinds : any , index : any) => {
                        if( hinds.route_name.toLowerCase().includes( search.toLowerCase() ) )
                        {return (
                        <div className="flex justify-center py-2 border-b-2 rounded-xl border-gray-200 hover:bg-amber-100" key={index}
                        onClick={() =>{ 
                          router.push(`../admin/${hinds.link}`) ;
                          set_search("")
                        } }
                        >
                          { hinds.route_name}
                        </div>
                      )}
                    })
                    }
                  </div>}
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
