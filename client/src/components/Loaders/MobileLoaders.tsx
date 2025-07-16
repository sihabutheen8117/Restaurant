"use client";

import React from "react";
import '@/styles/mainStyles.css'

const MobileLoaders = () => {
  return (
    <div className="loader rounded-2xl">
      <div className="wrapper">
        <div className="circle"></div>
        <div className="line-1"></div>
        <div className="line-2"></div>
        <div className="line-3"></div>
        <div className="line-4"></div>
      </div>
    </div>
  );
};

export default MobileLoaders ;
