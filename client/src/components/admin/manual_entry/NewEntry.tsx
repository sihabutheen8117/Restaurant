"use client"

import React from 'react'
import { useState } from 'react'

const NewEntry = () => {
  return (
    <div className='m-2 mt-3'>

      <div className="w-full max-w-md ">
        <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 mb-1">
          Customer Name
        </label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          placeholder="name"
          className="w-full px-3 py-0.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none  focus:border-amber-300"
        />
      </div>

      <div className="flex items-center space-x-2 mt-3">
        <input
          id="checkbox1"
          type="checkbox"
          className="h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="checkbox1" className="text-sm font-medium text-gray-700">
          UPI / card payments
        </label>
      </div>

      <div className='font-medium text-gray-700 mt-2'>
        <div className=''>ordered foods</div>
      </div>

      <div className='border-2 rounded-xl w-1/2 border-gray-200 h-[55vh] relative'>
        <div className=''>
          hello
        </div>

        <div className='border-t-2 border-gray-200'>
          total
        </div>
      </div>

    </div>
  )
}

export default NewEntry
