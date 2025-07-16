"use client"
import React from 'react'
import { useState } from 'react'

const PromptName = (props : any) => {

  const [ name , setName ] = useState("") ;

  const handleSummit = () => 
  {
    localStorage.setItem("user_name" , name );
    props.setUser(name)
    props.close() ;
  }

  return (
    <div className='m-3'>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Please Enter you Name : 
          </label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete='off'
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='flex justify-center mt-3'>
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            onClick={handleSummit}
          >
            Submit
          </button>
        </div>

    </div>
  )
}

export default PromptName
