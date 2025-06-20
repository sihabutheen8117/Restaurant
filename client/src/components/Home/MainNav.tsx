
import React from 'react'
import { lexend ,anton} from "@/utils/fonts";
import '@/styles/mainStyles.css'



const MainNav = () => {
  return (
    <div className='setBgImg md:pt-2 pt-1 rounded-b-2xl md:rounded-b-4xl'>
        {/* <img src='/assets/main_food_table.jpg' alt='table' className='rounded-b-2xl md:rounded-b-4xl brightness-50 h-auto object-cover'/> */}
        <div className=''>
            <nav className='md:m-5 m-1 ml-4 flex justify-between text-white'>
                <div className={`${lexend.className} md:text-3xl md:pl-10 text-lg`}>
                    <span className={`text-[#FFF085] font-semibold`}>Al</span>-Khalid
                </div>
                <div className='md:flex gap-8 hidden'>
                    <div>About us</div>
                    <div>Contact</div>
                    <div>Certificates</div>
                    <div>Menu</div>
                </div>
                <div className='md:pr-5 pr-3 md:text-lg flex'>
                    <button className='md:pr-5 font-semibold hover:text-neutral-600 fontrans '>
                        log in
                    </button>
                    <button className={`vividOrange rounded-2xl font-semibold py-0.5 px-3 hover:text-neutral-600 fontrans hidden md:block`}>
                        Sign in
                    </button>
                </div>
            </nav>
        </div>
        <div className='flex justify-around items-center py-4'>
            <div className = {`md:text-6xl text-xl px-2 font-bold ${anton.className} text-white`}>
                <span className=''>Made with <span className='text-[#FFF085] md:text-7xl text-2xl'>Love</span> </span><br></br>
                <span><span className='text-[#FFF085] md:text-7xl text-2xl'>Served</span> with Joy</span><br></br>
                <button className={`md:text-xl text-sm ${lexend.className} border-2 rounded-2xl px-2 hover:text-amber-200 fontrans`}>Order now</button>
            </div>
            <img src='assets/main_food_1.png' alt="food_1" className='md:h-64 h-24 z-[2] bg-black bg-radial from-black from-30% to-[#F16767] to-70%'/>
            
        </div>
    </div>

  )
}

export default MainNav