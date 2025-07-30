import React from 'react'
import { inter } from '@/utils/fonts'

const AddNewCategory = (props : any ) => {
  return (
    <div className={` ${inter.className} p-3 relative h-full`}>
      <div className='font-semibold'>
        New Category
      </div>
      <div className='mt-2 text-sm'>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name of the Category
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm shadow-sm
                focus:border-amber-300 focus:ring-1 focus:ring-amber-300 focus:outline-none"
        />
      </div>
      <div className='mt-2'>
        <div className='block text-sm font-medium text-gray-700 mb-1'>Add items to Category</div>
        <div className='flex w-full'>
          <div className='w-1/2 mr-1 border-r-2 border-gray-200'>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Search..."
              className="w-3/4 rounded-md border border-gray-300 px-2 py-1.5 text-sm shadow-sm
                    focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className='w-1/2 h-48 border-2 border-gray-300 rounded-lg overflow-y-auto text-sm py-1 text-gray-600'>
            <div className='border-b-2 border-gray-100 px-2 py-1 flex justify-between'>
              <span>chicken</span>
              <button className=' text-red-400 rounded-full hover:text-red-500 transition-colors duration-200'>
                <i className="fas fa-times-circle">{}</i>
              </button>
            </div>
            <div className='border-b-2 border-gray-100 px-2 py-1'>
              chicken
            </div>
            <div className='border-b-2 border-gray-100 px-2 py-1'>
              chicken
            </div>
            <div className='border-b-2 border-gray-100 px-2 py-1'>
              chicken
            </div>
            <div className='border-b-2 border-gray-100 px-2 py-1'>
              chicken
            </div>
            <div className='border-b-2 border-gray-100 px-2 py-1'>
              chicken
            </div>
            <div className='border-b-2 border-gray-100 px-2 py-1'>
              chicken
            </div>
            <div className='border-b-2 border-gray-100 px-2 py-1'>
              chicken
            </div>
            <div className='border-b-2 border-gray-100 px-2 py-1'>
              chicken
            </div>
            <div className='border-b-2 border-gray-100 px-2 py-1'>
              chicken
            </div>
            <div className='border-b-2 border-gray-100 px-2 py-1'>
              chicken
            </div>
            <div className='border-b-2 border-gray-100 px-2 py-1'>
              chicken
            </div>
            <div className='border-b-2 border-gray-100 px-2 py-1'>
              chicken
            </div>
            <div className='border-b-2 border-gray-100 px-2 py-1'>
              chicken
            </div>
            <div className='border-b-2 border-gray-100 px-2 py-1'>
              chicken
            </div>
          </div>
        </div>
        <div className='w-full text-right px-2 py-1 text-sm opacity-75'>
          Total : {324234}
        </div>
        
      </div>
      <div className='absolute bottom-3 right-7 text-sm text-white font-semibold'>
          <button className='mr-3 px-3 py-1 bg-green-400 rounded-xl hover:bg-green-500 transition-colors hover:duration-200'>
            <i className="fas fa-edit mr-1"></i>Create
          </button>
          <button className='mr-3 px-3 py-1 bg-red-400 rounded-xl hover:bg-red-500 transition-colors hover:duration-200'
          onClick={props.handleView}
          >
            <i className="fas fa-times-circle mr-1"></i>Cancel
          </button>
        </div>
    </div>
  )
}

export default AddNewCategory
