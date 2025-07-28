"use client"

import React from 'react';
import styled from 'styled-components'; 
import Link from 'next/link';
import { useEffect } from 'react';

const Page = () => {

  useEffect( ()=>{
      sessionStorage.setItem("user_cart" , "") ;
      sessionStorage.setItem("food_quantity" , ""  )
  } ,[])

  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <StyledWrapper>
      <div className="card">
        <Link href={'../user/client'}>
          <button type="button" className="dismiss">×</button>
        </Link>
        <div className="header">
          <div className="image">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#000000" d="M20 7L9 18L4 13" />
            </svg>
          </div>
          <div className="content">
            <span className="title">Order Placed</span>
            <p className="message">Thank you for your purchase. Your food will be delivered within few minutes to your table.</p>
          </div>
          <div className="actions">
            <Link href={'../user/history'}>
              <button type="button" className="history">My Orders</button>
            </Link>
            <Link href={'../user/client'}>
              <button type="button" className="track">Go to Home</button>
            </Link>
            
          </div>
        </div>
      </div>
    </StyledWrapper>
    </div>
  );

};

const StyledWrapper = styled.div`
  .card {
    overflow: hidden;
    position: relative;
    text-align: left;
    border-radius: 0.5rem;
    max-width: 290px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
    background-color: #fff;
  }

  .dismiss {
    position: absolute;
    right: 10px;
    top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    background-color: #fff;
    color: black;
    border: 2px solid #d1d5db;
    font-size: 1rem;
    font-weight: 300;
    width: 30px;
    height: 30px;
    border-radius: 7px;
    transition: 0.3s ease;
  }

  .dismiss:hover {
    background-color: #ee0d0d;
    border: 2px solid #ee0d0d;
    color: #fff;
  }

  .header {
    padding: 1.25rem 1rem 1rem 1rem;
  }

  .image {
    display: flex;
    margin-left: auto;
    margin-right: auto;
    background-color: #e2feee;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    border-radius: 9999px;
    animation: animate 0.6s linear alternate-reverse infinite;
    transition: 0.6s ease;
  }

  .image svg {
    color: #0afa2a;
    width: 2rem;
    height: 2rem;
  }

  .content {
    margin-top: 0.75rem;
    text-align: center;
  }

  .title {
    color: #066e29;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
  }

  .message {
    margin-top: 0.5rem;
    color: #595b5f;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .actions {
    margin: 0.75rem 1rem;
  }

  .history {
    display: inline-flex;
    padding: 0.5rem 1rem;
    background-color: #1aa06d;
    color: #ffffff;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 500;
    justify-content: center;
    width: 100%;
    border-radius: 0.375rem;
    border: none;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  .track {
    display: inline-flex;
    margin-top: 0.75rem;
    padding: 0.5rem 1rem;
    color: #242525;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 500;
    justify-content: center;
    width: 100%;
    border-radius: 0.375rem;
    border: 1px solid #d1d5db;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  @keyframes animate {
    from {
      transform: scale(1);
    }

    to {
      transform: scale(1.09);
    }
  }
`;

export default Page;
