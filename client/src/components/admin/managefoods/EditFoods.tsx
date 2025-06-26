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

const EditFoods = () => {

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
      
      <div className='md:flex'>
        <img src={foodDetails.images_url} alt={foodDetails.food_name} className='md:object-cover md:w-56 h-56 rounded-lg mx-auto'/>
        <div className='w-full md:ml-3 ml-1 md:mt-0 mt-3'>
            <div className=''>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Food Name
                    </label>
                    <input
                    type="text"
                    id="name"
                    placeholder="Food name"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-1 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Describtion
                </label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-1 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                    />
                </div>
            <div className='mt-3'>
                <div className='md:ml-2 mt-3 text-sm'>
                    {foodDetails.rating} {stars}
                    <span className='ml-3 text-lg font-semibold opacity-60'>(700)</span>
                </div>
                <div className='flex md:ml-3 md:mt-1 mt-3 gap-6'>
                    <div className='relative flex' >
                        <div className='block font-medium text-gray-700 pt-2 mr-2'>Price</div>
                        <input
                            type="number"
                            id="name"
                            placeholder="000"
                            className="relative mt-1 block w-28 font-semibold rounded-md border border-gray-300 shadow-sm px-3 pl-5 py-1 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                            />
                        <span className="absolute top-2 right-24 text-lg text-gray-800">₹</span>
                    </div>
                    <div className='relative flex' >
                        <div className='block font-medium text-gray-700 pt-2 mr-2'>Offer Price</div>
                        <input
                            type="number"
                            id="name"
                            placeholder="000"
                            className="relative mt-1 block w-28 font-semibold rounded-md border border-gray-300 shadow-sm px-3 pl-5 py-1 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                            />
                        <span className="absolute top-2 right-24 text-lg text-gray-800">₹</span>
                    </div>
                    <div className='relative flex' >
                        <div className='block font-medium text-gray-700 pt-2 mr-2'>Offer validity till</div>
                        <input
                            type="date"
                            id="name"
                            placeholder="000"
                            className="relative text-sm mt-1 block w-32 font-semibold rounded-md border border-gray-300 shadow-sm px-1 py-1 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                            />
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div className='md:flex my-1.5 h-56 mt-3'>
        <div className='md:w-1/3 md:border-r-2 md:border-gray-300 pr-3'>
            <div className='font-semibold'>Ingredients</div>
            <textarea
            rows={5}
            placeholder="Enter dish ingredients..."
            className="w-full px-2 py-1  mt-2 font-medium  border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
            ></textarea>
        </div>
        <div className='flex-1 px-2'>
            <div className='flex gap-2 font-semibold'>
                disable food 
                <input 
                id="disable"
                type="checkbox"
                className=''
                />
            </div>
            <div className='mt-2'>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload new Image</label>
                <input
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                <div className='font-semibold opacity-50 text-sm mt-1'>
                    ( * Please upload image with equal width and height )
                </div>
            </div>
            <div className='text-sm absolute bottom-2 right-7 font-semibold'>
            
                    <button className='mr-4 px-2 py-1 bg-red-400 text-white rounded-xl hover:bg-red-500'>
                        <span className=""><i className="fas fa-trash"></i> Delete</span>
                    </button>

                    <button className='mr-4 px-2 py-1 bg-gray-400 text-white rounded-xl hover:bg-gray-500'>
                        <span className=""><i className="fas fa-times-circle"></i> Cancel</span>
                    </button>

                    <button className='mr-4 px-2 py-1 bg-green-400 text-white rounded-xl hover:bg-green-500'>
                        <span className=""><i className="fas fa-check-circle"></i> Apply</span>
                    </button>
               
            </div>
            <div className='mt-1'>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Choose Category
                </label>
                <select
                id="category"
                name="category"
                className="block w-1/2 rounded-md border border-gray-300 bg-white px-3 py-1.5 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-sm"
                >
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="drinks">Drinks</option>
                </select>
            </div>
        </div>
      </div>
    </div>
  )
}


export default EditFoods
