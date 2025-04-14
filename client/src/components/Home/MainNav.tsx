
import React from 'react'
import { lexend } from "@/utils/fonts";
import '@/styles/mainStyles.css'

const MainNav = () => {
  return (
    <nav className='m-5 flex justify-between'>
        <div className={`${lexend.className} text-lg md:pl-10`}>
            Al-Khalid
        </div>
        <div className='flex gap-8'>
            <div>about</div>
            <div>contact</div>
            <div>certificates</div>
            <div>Order now</div>
        </div>
        <div className='pr-5'>
            <button className='pr-5'>
                log in
            </button>
            <button className={`vividOrange rounded-2xl py-0.5 px-3`}>
                Sign in
            </button>
        </div>
    </nav>
  )
}

export default MainNav
