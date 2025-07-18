"use client"

import '@/styles/mainStyles.css'
import { lexend } from "@/utils/fonts";
import Link from 'next/link';
import { loginUser } from '@/reactQuery/queries'
import { useState , useEffect} from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const page = () => {

    const [ email , setEmail ]  = useState("") ;
    const [password , setPassword ] = useState("") ;
    const router = useRouter() ;
    
    const login_mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data: any) => {
          localStorage.setItem("user_name", data.user_name);
          router.push('../user/client'); // <-- Moved here
        },
      });


    const getLogin = () => {
        console.log("loggin button clicked")
        login_mutation.mutate( { user_email : email , user_password : password})
    }


  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="border-2 rounded-3xl md:h-fit md:w-2/3 p-3 relative">


        <div className="md:h-fit px-5 md:w-1/2">

            <div className="flex justify-between pt-3">
                <div className='text-xl font-bold'>
                    Login
                </div>
                <div className={`${lexend.className} md:hidden md:text-2xl md:pl-10 text-lg z-10`} >
                    <span className={`text-[#FFF085] font-semibold`}>Al</span>-Khalid
                </div>
            </div>

            <div className='pt-2 opacity-60 text-md'>do you want to be a regular customer ?</div>

            <div className='pt-3'>
                <label className="block text-sm font-medium text-gray-700 mb-1">email</label>
                <input
                    type="email"
                    placeholder="alkhalid@example.com"
                    className="w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-[#FFF085]  focus:border-[#FFF085] transition"
                    onChange={(e) =>setEmail(e.target.value)}
                />
            </div>

            <div className='pt-1'>
                <label className="block text-sm font-medium text-gray-700 mb-1">password</label>
                <input
                    type="password"
                    className="w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-[#FFF085]  focus:border-[#FFF085] transition"
                    onChange={ (e)=> setPassword(e.target.value)}
                />
            </div>

            <div className='flex justify-end w-full pt-1'>
                <button className=''>forgot password ?</button>
            </div>

            <div className='flex gap-2 px-2 pt-4'>
                <Link 
                href={"register"}
                className='border-2 rounded-full py-2 px-4 w-1/2 border-amber-400 text-amber-400 flex justify-center'>
                    Register
                </Link>
                <button className='border-2 rounded-full py-2 px-4 w-1/2 bg-amber-400 text-white flex justify-center w-full'
                disabled = {login_mutation.isPending}
                onClick={getLogin}
                >{
                    login_mutation.isPending ? 
                    <svg viewBox="25 25 50 50">
                        <circle r="20" cy="50" cx="50"></circle>
                    </svg>
                    :
                    "Login"
                }</button>
            </div>

            <div className='pt-3 opacity-50 py-2 w-full flex justify-center text-sm'>or Sign in with Google</div>
            <hr className='opacity-60'/>
            <div className='w-full flex justify-center pt-3'>
                <button className='flex rounded-full bg-gray-200 py-2 px-5 gap-2'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                        alt="Google Logo" 
                        className="w-6" 
                    />
                    <div className=''>
                        Sign in with Goole
                    </div>
                </button>
            </div>

        </div>


        <div className="hidden border-2 rounded-3xl md:w-1/2 md:h-full absolute right-0 top-0 bottom-0 img-login md:flex justify-center items-center">
           <div className="absolute inset-0 bg-black/50 rounded-3xl"></div>
            <div className={`${lexend.className} md:text-4xl md:pl-10 text-lg z-10 text-white`} >
                <span className={`text-[#FFF085] font-semibold`}>Al</span>-Khalid
            </div>
        </div>
      </div>
    </div>
  )
}

export default page
