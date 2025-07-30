"use client"

import { playfair } from "@/utils/fonts"
import { useState } from "react"

const UserMenu = (props : any) => {

  const [ price_order , serPrice_order ] = useState(props.filters?.price_order || 0 ) ;
  const [rating, setRating] = useState(props.filters?.ratings || 0);

  const totalStars = 5;

  const handleApply = () => {
    props.setFilter({
      price_order : price_order ,
      ratings : rating ,
      price_range : rupees
    })
    props.close()
  }
  
  const handleClick = (index : number) => {
    setRating(index + 1);
  };

  const changeRange = (rup : string ) => {
    setRupees(parseInt(rup))
  }

  const [rupees , setRupees ] = useState(props.filters?.price_range || 10)
  
  return (
    <div className="mt-14 md:mt-4 ml-3 md:fixed md:top-11">
        
      <div className="w-full h-screen py-1 border-r-2 border-gray-200">
        <div className="">
          <div className="flex justify-between mx-2">
            <div className={`${playfair.className} font-semibold`}>
              price
            </div>
            <button className="bg-green-400 text-white rounded-full px-2 hover:bg-green-500"
            onClick={handleApply}
            >
              apply
            </button>
          </div>
          <div className="flex gap-2 whitespace-nowrap flex-wrap mt-3"
          >
            <button className={`border-2 rounded-full px-2 
              ${price_order == -1 ? "bg-amber-100 text-amber-600 border-amber-400" : "border-gray-400"}
            `}
            onClick={() => serPrice_order(-1)}
            >
              low to high
            </button>
            <button className={`border-2 rounded-full px-2
              ${price_order == 1 ? "bg-amber-100 text-amber-600 border-amber-400" : "border-gray-400"}
            `}
            onClick={() => serPrice_order(1)}
            >
              high to low
            </button>
          </div>
        </div>

        <div className="mt-9">
          <div className="relative w-full font-semibold">
            <div className="absolute left-0 top-[-25]">₹0</div>
            <div className="absolute right-6 top-[-25]">₹2000</div>
          </div>
          <div className="relative">
            <input 
              type="range" 
              min="10"
              max="2000"
              step="50"
              className="w-48"
              value={rupees}
              onChange={(e)=>changeRange(e.target.value)}
            />
            <div className="absolute text-black font-bold text-sm transition-all top-6"
              style={{
                left: `calc(${(Number(rupees) - 10) / (2000 - 10) * 75}% ) `, 
              }}>
                ₹{rupees}
             </div>
          </div>
        </div>

        <div className=" mt-5">
          <div className={`${playfair.className} font-semibold`}>ratings</div>
          <div className="flex mt-3">
            {[...Array(totalStars)].map((_, index) => (
                <button key={index} onClick={() => handleClick(index)}>
                  {index < rating ? (
                    // Filled star
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-6 text-yellow-400"
                    >
                      <path d="M12 .587l3.668 7.431L24 9.748l-6 5.848L19.335 24 12 19.771 4.665 24 6 15.596 0 9.748l8.332-1.73z" />
                    </svg>
                  ) : (
                    // Hollow star
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="w-6 text-yellow-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 
                        4.674a1 1 0 00.95.69h4.911c.969 0 1.371 
                        1.24.588 1.81l-3.976 2.89a1 1 0 
                        00-.364 1.118l1.518 
                        4.674c.3.921-.755 1.688-1.538 
                        1.118l-3.976-2.89a1 1 0 
                        00-1.176 0l-3.976 2.89c-.783.57-1.838-.197-1.538-
                        1.118l1.518-4.674a1 1 0 
                        00-.364-1.118L2.98 10.101c-.783-.57-.38-
                        1.81.588-1.81h4.911a1 1 0 
                        00.95-.69l1.518-4.674z"
                      />
                    </svg>
                  )}
                </button>
              ))}
              <div className="pl-2 font-semibold">& Up</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default UserMenu
