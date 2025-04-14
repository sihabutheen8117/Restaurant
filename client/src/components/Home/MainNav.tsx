
import React from 'react'
import { lexend } from "@/utils/fonts";
import '@/styles/mainStyles.css'

const MainNav = () => {
  return (
    <nav className='m-5 flex justify-between'>
        <div className={`${lexend.className} text-2xl md:pl-10`}>
            Al-Khalid
        </div>
        <div className='flex gap-8'>
            <div>about</div>
            <div>contact</div>
            <div>certificates</div>
            <div>Order now</div>
        </div>
        <div className='pr-5 text-lg'>
            <button className='pr-5 font-semibold hover:text-neutral-600 fontrans'>
                log in
            </button>
            <button className={`lightYellow rounded-2xl font-semibold py-0.5 px-3 hover:text-neutral-600 fontrans`}>
                Sign in
            </button>
        </div>
    </nav>
  )
}

export default MainNav
