"use client"

import React from 'react'
import { useState , useEffect } from 'react';
import ProfileElem from './profile/ProfileElem';

const ProfileMenu = (props : any) => {

  const [is_name, set_is_name] = useState<string | null>(null);
  
    useEffect(() => {
      const storedName = localStorage.getItem("user_name");
      set_is_name(storedName);
    }, []);

  return (
    <div className=''>
      <div className='bg-white w-65 h-screen pt-5 relative'>
        <div className="flex gap-2 absolute right-5 top-3">
            <div className="pt-2 text-lg font-medium">{  (is_name == "" || is_name == undefined || is_name == null) ? " please login , " :  `welcome , ${is_name.split(" ")[0]}` }</div>
            <button className="pl-1 font-semibold"
            onClick={()=>props.toggle()}
            >
              {
                <div className="text-3xl">&times;</div>
              }
            </button>
        </div>
        <div className='absolute top-20 w-full'>
          <ProfileElem/>
        </div>
      </div>
    </div>
  )
}

export default ProfileMenu
