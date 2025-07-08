import React from 'react'

const foodDetails = {
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
            rating : 3.0 , 
            date: "9 June 2025"
        },
        {
            id: "1047",
            reviewer_name: "Vikram Tiwari",
            review: "Heavy but worth it!",
            rating : 5.0 , 
            date: "6 June 2025"
        }
    ],
    images_url : "/assets/foods/burger_image.jpeg"
}

const ViewFoods = ( props : any) => {

    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (foodDetails.rating >= i) {
        stars.push(<i key={i} className="fas fa-star text-yellow-500"></i>);
      } else if (foodDetails.rating >= i - 0.5) {
        stars.push(<i key={i} className="fas fa-star-half-alt text-yellow-500"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star text-yellow-500"></i>);
      }
    }

  return (
    <div className='m-3'>
        <button className='bg-white rounded-full px-3 py-1 md:hidden'>
            <i className="fas fa-arrow-left  text-xl"></i>
        </button>
      <div className='md:flex'>
        <img src={props.food_data.food_image} alt={props.food_data.food_name} className='md:object-cover md:w-56 h-56 rounded-lg mx-auto'/>
        <div className='w-full md:ml-3 ml-1 md:mt-0 mt-3'>
            <div className='font-bold md:text-lg text-2xl flex justify-center w-full md:block'>{props.food_data.food_name}</div>
            <div className='mt-3'>
                <div className='font-semibold'>Decription</div>
                <div className='md:pl-3'>
                    {props.food_data.describtion}
                </div>
                <div className='md:ml-2 mt-3 text-xl'>
                    {props.food_data.rating_count} {stars}
                    <span className='ml-3 text-lg font-semibold opacity-60'>(700)</span>
                </div>
                <div className='flex justify-between relative md:ml-3 md:mt-1 mt-3'>
                    <div className='md:ml-0 ml-3'>
                        <span className="absolute md:top-0.5 md:-left-2 left-0.5 text-lg text-gray-800">₹</span>
                        {
                            props.food_data.offer_price == -1  ? 
                            <span className="text-2xl font-semibold ">{props.food_data.price}</span>
                            :
                            <>
                                <span className="text-2xl font-semibold mr-3">{props.food_data.offer_price}</span>
                                <div className='inline relative'>
                                    <span className="absolute top-0 -left-2 text-xs text-gray-600">₹</span>
                                    <span className="font-semibold line-through opacity-50 text-lg ">{props.food_data.price}</span>
                                </div>
                            </>
                        }
                    </div>
                    <button
                        className='bg-amber-300 text-sm px-4 my-0.5 mt-1 rounded-full mx-2'
                    >
                            Add to cart
                            <i className='fas fa-shopping-cart pl-1'></i>
                    </button>
                </div>
            </div>
        </div>
      </div>
      <div className='md:flex my-1.5 h-56 md:mt-0 mt-4'>
        <div className='md:w-1/3 md:border-r-2 md:border-gray-300'>
            <div className='font-semibold'>Ingredients</div>
            <ul className='text-sm flex flex-wrap gap-x-2 overflow-y-auto'>
                {
                    props.food_data.ingredients
                }
            </ul>
        </div>
        <div className='md:w-2/3 md:pl-2 md:mt-0 mt-4'>
            <div className='font-semibold mb-1'>Reviews <span className='opacity-60'>({foodDetails.reviews.length})</span></div>
            <div className='h-50 overflow-y-auto'>
                {
                    foodDetails.reviews.map( (items , index ) => (
                        <div className='bg-gray-100 rounded-md mb-2 px-2' key={index}>
                            <div className='flex justify-between font-semibold text-sm py-0.5'>
                                <div className=''>
                                    {items.reviewer_name}
                                </div>
                                <div className='opacity-70'>
                                    {
                                        items.date
                                    }
                                </div>
                            </div>
                            <div className='text-sm font-semibold'> 
                                <i className="fas fa-star text-yellow-500 pr-1"></i>
                                {items.rating}/5 
                            </div>
                            <div className='text-sm'>
                                {items.review}
                            </div>
                        </div>
                    ))
                }
               
            </div>
        </div>
      </div>
    </div>
  )
}

export default ViewFoods
