"use client"

import React from 'react'
import '../../../styles/mainStyles.css'
import EditFoods from './EditFoods'
import { useState } from 'react'

type reviewType = {
    id: string,
    reviewer_name: string ,
    review: string,
    date: string
}


type productTypes = {
        food_name: string ,
         rating: number,
         price: string ,
         offer_price: number ,
         describtion: string,
         ingredients: string[] ,
         reviews: reviewType[],
         images_url : string
}
const products : productTypes[]= [
    {
         food_name: "Butter Chicken",
         rating: 4.6,
         price: "360",
         offer_price: -1,
         describtion: "Creamy and mildly spiced tomato-based gravy with tender chicken chunks.",
         ingredients: ["Chicken", "tomato puree", "cream", "garam masala", "garlic"],
         reviews: [
             {
                 id: "1030",
                 reviewer_name: "Aarti Mehta",
                 review: "Perfect balance of cream and spice!",
                 date: "15 May 2025"
             },
             {
                 id: "1031",
                 reviewer_name: "Karan Singh",
                 review: "Rich and satisfying, best with naan!",
                 date: "11 June 2025"
             }
         ],
         images_url : "/assets/foods/butter_chicken.jpeg"
    },
    {
         food_name: "Farmhouse Pizza",
         rating: 4.4,
         price: "280",
         offer_price: 250,
         describtion: "Loaded with fresh veggies, mozzarella cheese, and Italian herbs.",
         ingredients: ["Bell peppers", "onion", "tomato", "olives", "mozzarella"],
         reviews: [
             {
                 id: "1032",
                 reviewer_name: "Sneha Roy",
                 review: "Crunchy crust with fresh veggies!",
                 date: "9 June 2025"
             },
             {
                 id: "1033",
                 reviewer_name: "Ramesh Kumar",
                 review: "Good value for money, tasty cheese.",
                 date: "12 June 2025"
             }
         ],
         images_url : "/assets/foods/pizza.jpeg"
    },
    {
         food_name: "Veg Hakka Noodles",
         rating: 4.2,
         price: "160",
         offer_price: -1,
         describtion: "Stir-fried noodles with mixed vegetables and tangy soy sauce.",
         ingredients: ["Noodles", "cabbage", "capsicum", "carrot", "soy sauce"],
         reviews: [
             {
                 id: "1034",
                 reviewer_name: "Vinod Sharma",
                 review: "Tastes like authentic street food!",
                 date: "10 May 2025"
             },
             {
                 id: "1035",
                 reviewer_name: "Ritu Das",
                 review: "Could use more veggies, but very flavorful.",
                 date: "6 June 2025"
             }
         ],
         images_url : "/assets/foods/hakka_images.jpeg"
    },
    {
         food_name: "Paneer Tikka Burger",
         rating: 4.5,
         price: "150",
         offer_price: 100,
         describtion: "Spicy grilled paneer tikka with lettuce and mint mayo in a bun.",
         ingredients: ["Paneer", "tikka masala", "bun", "lettuce", "mint mayo"],
         reviews: [
             {
                 id: "1036",
                 reviewer_name: "Aman Khan",
                 review: "Best fusion burger I've had!",
                 date: "18 May 2025"
             },
             {
                 id: "1037",
                 reviewer_name: "Divya Patel",
                 review: "Mint mayo adds a fresh kick.",
                 date: "3 June 2025"
             }
         ],
         images_url : "/assets/foods/burger_image.jpeg"
    },
    {
         food_name: "Hyderabadi Chicken Biryani",
         rating: 4.7,
         price: "250",
         offer_price: 150,
         describtion: "Traditional dum-cooked biryani with aromatic basmati rice and marinated chicken.",
         ingredients: ["Basmati rice", "chicken", "saffron", "spices", "yogurt"],
         reviews: [
             {
                 id: "1038",
                 reviewer_name: "Shahbaz Ali",
                 review: "Authentic taste and perfectly cooked.",
                 date: "2 June 2025"
             },
             {
                 id: "1039",
                 reviewer_name: "Preeti Nair",
                 review: "Good portion size and flavor-packed.",
                 date: "13 June 2025"
             }
         ],
         images_url : "/assets/foods/chicken_biriyani.jpeg"
    },
    {
         food_name: "Palak Paneer",
         rating: 4.3,
         price: "190",
         offer_price: -1,
         describtion: "Cottage cheese simmered in a silky spinach-based gravy.",
         ingredients: ["Spinach", "paneer", "garlic", "ginger", "spices"],
         reviews: [
             {
                 id: "1040",
                 reviewer_name: "Kunal Joshi",
                 review: "Healthy and comforting meal option.",
                 date: "7 June 2025"
             },
             {
                 id: "1041",
                 reviewer_name: "Neha Shah",
                 review: "Nice texture and spice level.",
                 date: "5 June 2025"
             }
         ],
         images_url : "/assets/foods/palak_paneer.jpeg"
    },
    {
         food_name: "Chocolate Lava Cake",
         rating: 4.8,
         price: "120",
         offer_price: -1,
         describtion: "Warm chocolate cake with gooey molten center, served with vanilla ice cream.",
         ingredients: ["Chocolate", "flour", "sugar", "eggs", "butter"],
         reviews: [
             {
                 id: "1042",
                 reviewer_name: "Tanya Gupta",
                 review: "Heavenly dessert, melts in your mouth!",
                 date: "14 June 2025"
             },
             {
                 id: "1043",
                 reviewer_name: "Rajiv Sinha",
                 review: "Best after-meal treat!",
                 date: "15 June 2025"
             }
         ],
         images_url : "/assets/foods/choco_cake.jpeg"
    },
    {
         food_name: "Grilled Peri-Peri Chicken",
         rating: 4.6,
         price: "350",
         offer_price: -1,
         describtion: "Spicy peri-peri marinated chicken grilled to perfection.",
         ingredients: ["Chicken", "peri-peri sauce", "garlic", "lemon", "olive oil"],
         reviews: [
             {
                 id: "1044",
                 reviewer_name: "Sagar Iyer",
                 review: "Juicy and spicy, just like Nando’s!",
                 date: "12 June 2025"
             },
             {
                 id: "1045",
                 reviewer_name: "Fathima Noor",
                 review: "Loved the smoky flavor!",
                 date: "10 June 2025"
             }
         ],
         images_url : "/assets/foods/peri_chicken.jpeg"
    },
    {
         food_name: "Chole Bhature",
         rating: 4.4,
         price: "110",
         offer_price: -1,
         describtion: "Spicy chickpeas served with deep-fried fluffy bhature.",
         ingredients: ["Chickpeas", "onion", "tomato", "spices", "maida"],
         reviews: [
             {
                 id: "1046",
                 reviewer_name: "Rajeshwari",
                 review: "Crispy bhature and spicy chole!",
                 date: "9 June 2025"
             },
             {
                 id: "1047",
                 reviewer_name: "Vikram Tiwari",
                 review: "Heavy but worth it!",
                 date: "6 June 2025"
             }
         ],
         images_url : "/assets/foods/chole_bhature.jpeg"
    },
    {
         food_name: "Kesar Pista Kulfi",
         rating: 4.5,
         price: "90",
         offer_price: -1,
         describtion: "Traditional frozen Indian dessert with saffron and pistachio flavors.",
         ingredients: ["Milk", "saffron", "pistachio", "sugar"],
         reviews: [
             {
                 id: "1048",
                 reviewer_name: "Mohini Deshmukh",
                 review: "Authentic taste, creamy texture.",
                 date: "8 June 2025"
             },
             {
                 id: "1049",
                 reviewer_name: "Pradeep Joshi",
                 review: "Reminds me of childhood fairs!",
                 date: "10 June 2025"
             }
         ],
         images_url : "/assets/foods/kesar_kulfi.jpeg"
    }
 ]
 

const ViewManageFoods = () => {

    const [view , setView ] = useState(false) ;


    const handleView = () => {
        setView( !view ) 
    }

    const viewItems = () => {
        console.log("view items ")
    }
    
  return (
    <div>
        {
           
            view && <div 
            >
                <div className='fixed inset-0 bg-black opacity-40 z-10'
                onClick={handleView}> </div>
                <div className='z-50 bg-white fixed inset-x-50 inset-y-20 rounded-xl'>
                    <EditFoods/>
                </div>
            </div>
        }
      <div className='md:flex md:gap-3 md:flex-wrap md:justify-center'>
        {
            products.map( (items , index ) => (
                <div className='md:w-40 md:h-80 w-full md:mb-0 mb-3  h-40 rounded-2xl bg-gray-50 relative md:block flex'
                    key = {index}
                >
                    <div className='md:w-40 md:h-40 md:m-2 rounded-xl relative'>
                        <img src={items.images_url} alt = {items.food_name} className='object-fit md:w-40 md:h-40 w-40 h-40 rounded-lg object-cover'
                        onClick={viewItems}
                        />
                        <div className='hidden md:block'>
                            <i className="fas fa-pen text-gray-600 absolute top-2 right-2 bg-white rounded-full px-2 py-0.5"
                            onClick={handleView}
                            ></i>   
                        </div>
                        
                    </div>
                    <div className='relative flex-1 m-2 md:m-0'>
                        <div className={`mx-1.5 font-semibold text-xl md:text-lg`}
                        onClick={viewItems}
                        >
                            {items.food_name}
                        </div>
                        <div className='md:mt-1 mt-2 ml-1 text-sm'>
                            <i className="fas fa-star text-yellow-500 whitespace-nowrap">
                                <span className='text-black font-semibold text-xm pl-1'> {items.rating} / 5 </span>
                                <span className='text-black opacity-40 text-xs pl-1'>(107)</span> 
                            </i>
                        </div>
                        <div className='px-2 opacity-75 text-xs'>5 reviews</div>
                        <div className='w-full'>
                            <div className='inline-block relative ml-3 md:mt-1 mt-1 w-full'>
                                <span className="absolute top-1 -left-2 text-sm text-gray-600">₹</span>
                                {
                                    items.offer_price == -1  ? 
                                    <span className="text-2xl font-semibold ">{items.price}</span>
                                    :
                                    <>
                                        <span className="text-2xl font-semibold mr-3">{items.offer_price}</span>
                                        <div className='inline relative'>
                                            <span className="absolute top-0 -left-2 text-xs text-gray-600">₹</span>
                                            <span className="font-semibold line-through opacity-50 text-lg ">{items.price}</span>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            ))
        }
      </div>
    </div>
  )
}


export default ViewManageFoods
