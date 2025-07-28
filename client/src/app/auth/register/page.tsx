"use client"

import '@/styles/mainStyles.css'
import { lexend } from "@/utils/fonts";
import Link from 'next/link';
import { useState , useEffect } from 'react';
import {registerUser , register_google_oauth } from '@/reactQuery/queries'
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const page = () => {

    const [ name , setName ] = useState("")
    const [ email , setEmail] = useState("")
    const [ password , setPassword] = useState("")
    const [ is_err , set_err] = useState(false); 
    const [ err_message , set_err_message ] = useState("") ;

    const router = useRouter() ;

    const register_mutation = useMutation({
        mutationFn : registerUser,
        onSuccess: (data: any) => {
            sessionStorage.setItem("user_name", data.user_name);
            router.push('../user/client')
            set_err(false)
        },
        onError: (error:any, variables, context) => {
            set_err_message(error.response.data.message)
            set_err(true) ;
        }
    })

    const register_oauth_mutation = useMutation({
        mutationFn : register_google_oauth ,
        onSuccess : (data :any) => {
            window.location.href = data.data.url
        }
    })

    const handleRegister = () => {
        register_mutation.mutate({ user_name : name , user_email : email , user_password : password });
    }

    const handleOauthRegister = () => {
        console.log("clicked")
        register_oauth_mutation.mutate() ;
    }

  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="border-2 rounded-3xl md:h-fit md:w-2/3 flex">


        <div className="hidden border-2 rounded-3xl md:w-1/2 relative img-login md:flex justify-center items-center">
           <div className="absolute inset-0 bg-black/50 rounded-3xl"></div>
            <div className={`${lexend.className} md:text-4xl text-lg z-10 text-white`} >
                <span className={`text-[#FFF085] font-semibold`}>Al</span>-Khalid
            </div>
        </div>

        <div className="md:h-fit px-5 md:w-1/2 p-3">

            <div className="flex justify-between pt-3">
                <div className='text-xl font-bold'>
                    Register
                </div>
                <div className={`${lexend.className} md:hidden md:text-2xl md:pl-10 text-lg z-10`} >
                    <span className={`text-[#FFF085] font-semibold`}>Al</span>-Khalid
                </div>
            </div>

            <div className='pt-2 opacity-60 text-md'>do you want to be a regular customer ?</div>

            <div className='pt-3'>
                <label className="block text-sm font-medium text-gray-700 mb-1">name</label>
                <input
                    placeholder="al khalid"
                    className="w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-[#FFF085]  focus:border-[#FFF085] transition"
                    onChange={(e) => setName(e.target.value) }
                />
            </div>
            
            <div className='pt-1'>
                <label className="block text-sm font-medium text-gray-700 mb-1">email</label>
                <input
                    type="email"
                    placeholder="alkhalid@example.com"
                    className="w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-[#FFF085]  focus:border-[#FFF085] transition"
                    onChange={(e) => setEmail(e.target.value) }
                />
            </div>

            <div className='pt-1'>
                <label className="block text-sm font-medium text-gray-700 mb-1">password</label>
                <input
                    type="password"
                    className="w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-[#FFF085]  focus:border-[#FFF085] transition"
                    onChange={(e) => setPassword(e.target.value) }
                />
            </div>

            <div className='pt-1'>
                <label className="block text-sm font-medium text-gray-700 mb-1">re-enter password</label>
                <input
                    type="password"
                    className="w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-[#FFF085]  focus:border-[#FFF085] transition"
                />
            </div>

            <div className=''>
                {
                    is_err && 
                    <div className='bg-red-100 rounded-lg flex w-full justify-center mt-2 '>
                        <div className='text-red-500 text-sm py-1.5'>
                            {
                                err_message
                            }
                        </div>
                    </div>
                }
            </div>

            <div className='flex gap-2 px-2 pt-4'>
                <Link href={"login"} className='border-2 rounded-full py-2 px-4 w-1/2 flex justify-center  border-amber-400 text-amber-400'>
                    Login
                </Link>
                
                <button className='border-2 rounded-full py-2 px-4 bg-amber-400 text-white flex justify-center w-full'
                disabled = {register_mutation.isPending}
                onClick={handleRegister}
                >{
                    register_mutation.isPending ? 
                    <svg viewBox="25 25 50 50" className='svg_loading'>
                        <circle r="20" cy="50" cx="50" className='circle_loading stroke-white'></circle>
                    </svg>
                    :
                    "Register"

                }</button>
            </div>

            <div className='pt-3 opacity-50 py-2 w-full flex justify-center text-sm'>or Sign up with Google</div>
            <hr className='opacity-60'/>
            <div className='w-full flex justify-center pt-3'>
                <button className='flex rounded-full bg-gray-200 py-2 px-5 gap-2'
                onClick={handleOauthRegister}
                disabled = {register_oauth_mutation.isPending}
                >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                        alt="Google Logo" 
                        className="w-6" 
                    />
                    {
                        register_oauth_mutation.isPending ? 
                        <svg viewBox="25 25 50 50" className='svg_loading'>
                            <circle r="20" cy="50" cx="50" className='circle_loading stroke-black'></circle>
                        </svg>
                        :
                        <div className=''>
                            Sign up with Goole
                        </div>

                    }
                </button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default page
