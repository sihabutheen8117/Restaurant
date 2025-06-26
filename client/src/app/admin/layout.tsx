
import AdminNav from "@/components/admin/AdminNav"
// import { useState } from "react"
import AdminPanel from "@/components/admin/AdminPanel"


export default function AdminLayout({
    children ,
}:{
    children : React.ReactNode
}) {
    
    // const [togFilter  ,setTogFilter ] = useState(false)

    // const handleFilter = () => {
    //     setTogFilter(!togFilter)
    // }
    return <>
    {/* {
        togFilter && <div
        className="fixed inset-0 bg-black opacity-40 z-10"
        onClick={handleFilter}
        />
      } */}
      <div className="z-20">
        <AdminNav/>
        <div className="flex w-full h-screen">
          <div className="w-56 flex-shrink-0 border-r border-gray-200">
            <AdminPanel/>
          </div>
          <div className="flex-1 h-full overflow-auto p-4">
            {children}
          </div>
        </div>
      </div>
   
    </>
}
