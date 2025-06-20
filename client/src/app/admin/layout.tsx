"use client"

import AdminNav from "@/components/admin/AdminNav"
import { useState } from "react"
import AdminPanel from "@/components/admin/AdminPanel"



export default function AdminLayout({
    children ,
}:{
    children : React.ReactNode
}) {
    
    const [togFilter  ,setTogFilter ] = useState(false)

    const handleFilter = () => {
        setTogFilter(!togFilter)
    }
    return <>
    {
        togFilter && <div
        className="fixed inset-0 bg-black opacity-40 z-10"
        onClick={handleFilter}
        />
      }
      <div className="z-20">
        <AdminNav/>
        <div className="flex"> 
          <div className="w-52 h-screen border-r-2 border-gray-100">
            <AdminPanel/>
          </div>
          <div className="m-3 flex-1 bg-gray-50">
            {children}
          </div>
        </div>
      </div>
   
    </>
}
