"use client"

import React from 'react'
import { useState } from 'react';
import ProfileElem from './profile/ProfileElem';

const ProfileMenu = (props : any) => {

  return (
    <div className=''>
      <div className='bg-white w-65 h-screen pt-5 relative'>
        <div className="flex gap-2 absolute right-5 top-3">
            <div className="pt-2">User Name</div>
            <div className="mt-1 w-8 h-8 rounded-full bg-red-700"></div>
            <button className="pl-3 font-semibold"
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
