"use client"
import React, { useState, useEffect, useRef } from 'react'
import NotificationLoader from '@/components/Loaders/NotificationLoader'

const Page = () => {
  const [error, set_error] = useState(false)
  const [visible, set_visible] = useState(false)
  
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSignin = () => {
    if (error && !visible) {
      set_visible(true)
      timeoutRef.current = setTimeout(() => {
        set_visible(false)
      }, 5000)
    }
  }

  const handleClose = () => {
    if(timeoutRef.current)
    {
      clearTimeout(timeoutRef.current)
    }
    set_visible(false) ;
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div>
      <div className='flex w-full h-screen justify-center items-center'>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2'>
            <button
              className='text-sm bg-red-500 text-white font-semibold rounded-lg px-4 py-2'
              onClick={() => set_error(!error)}
            >
              Make Error
            </button>
            <div className='block text-sm text-red-500'>
              {error && "Error"}
            </div>
          </div>
          <button
            className='text-sm bg-blue-500 text-white font-semibold rounded-lg px-4 py-2'
            onClick={handleSignin}
          >
            Sign in
          </button>
        </div>
      </div>

      {visible && <NotificationLoader state={"success"} information={"Hello every one"} close={ () => handleClose()}/>}

    </div>
  )
}

export default Page
