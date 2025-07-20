"use client"

import React from 'react'
import { useMutation , useQueryClient} from '@tanstack/react-query' 
import { addNewFood} from '@/reactQuery/queries'
import { useState } from 'react'
import { Food } from '@/reactQuery/itemInterfaces'

const AddNewFood = (props:any) => {

    console.log(props.all_categories.data)
    const queryClient = useQueryClient()

    const [ foodName , setFoodName ] = useState('') ;
    const [ foodDesc , setFoodDesc] = useState('') ;
    const [ price , setPrice] = useState('') ;
    const [ offPrice , setOffPrice] = useState('') ;
    const [ validity  , setValidity] = useState('') ;
    const [ foodImage  , setFoodImage ] = useState<string>('') ;
    const [ isEnable , setIsEnable ] = useState(false) ;
    const [ category , setCategory ] = useState('') ;
    const [ ingredients  , setIngredients ] = useState('') ;
    const [ preview_image , set_preview_image ] = useState("");
    const [ new_category , set_new_category ] = useState("") ;

    const handleImageChange = (e:any) => {
        const file = e.target.files[0];
        setFoodImage(file) ;

        const reader = new FileReader();

        reader.onloadend = () => {
        setFoodImage(reader.result as string);
        };

        if (file) {
        reader.readAsDataURL(file); // convert to Base64
        }

        if (file) {
          const imageUrl = URL.createObjectURL(file);
          set_preview_image(imageUrl);
        }
    }



    const newFoods = useMutation({
        mutationFn : addNewFood ,
        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey : ['categories']
            })
            queryClient.invalidateQueries({
                queryKey : ['foods']
            })
            props.handleView()
        }
    })

    const addFoods = () => {

        const effectiveCategory = new_category == "" ? category : new_category ;

        const foodData : Food =  {
            food_name : foodName ,
            describtion : foodDesc ,
            price  : parseInt(price),
            offer_price : parseInt(offPrice) ,
            offer_validity : validity ,
            ingredients : ingredients ,
            isDisable : isEnable ,
            food_image : foodImage,
            category : effectiveCategory ,
        }

        newFoods.mutate(foodData) ;
    }

  return (
    <div className='m-3'>
      
      <div className='md:flex'>
        {
            foodImage ? <img src={preview_image} alt={"food_name"} className='md:object-cover md:w-56 h-56 rounded-lg mx-auto'/> 
            : <div className='md:w-56 h-56 rounded-lg mx-auto border-2 border-gray-200 flex justify-center items-center text-sm text-gray-500'>Image is not set</div>
        }
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
                    onChange={ (e) => setFoodName( e.target.value )}
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
                    onChange={ (e) => setFoodDesc(e.target.value)}
                    />
                </div>
            <div className='mt-2'>
             
                <div className='flex md:ml-3 md:mt-1 mt-3 gap-6'>
                    <div className='relative flex' >
                        <div className='block font-medium text-gray-700 pt-2 mr-2'>Price</div>
                        <input
                            type="number"
                            id="name"
                            placeholder="000"
                            className="relative mt-1 block w-28 font-semibold rounded-md border border-gray-300 shadow-sm px-3 pl-5 py-1 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                            onChange={ (e) => setPrice(e.target.value)}
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
                            
                            onChange={ (e) => setOffPrice(e.target.value)}
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
                            
                            onChange={ (e) => setValidity(e.target.value)}
                            />
                    </div>
                </div>
                <div className='mt-2'>
                    <input
                        type="file"
                        accept="image/*"
                        className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                        onChange={handleImageChange}
                    />
                    <div className='font-semibold opacity-50 text-sm mt-1'>
                        ( * Please upload image with equal width and height )
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
            onChange={ (e) => setIngredients(e.target.value)}
            ></textarea>
        </div>
        <div className='flex-1 px-2'>
            <div className='flex gap-2 font-semibold'>
                disable food 
                <input 
                id="disable"
                type="checkbox"
                className=''
                checked = {isEnable}
                onChange={ () => setIsEnable(!isEnable)}
                />
            </div>
            <div className='text-sm absolute bottom-2 right-7 font-semibold'>

                    <button className='mr-4 px-2 py-1 bg-gray-400 text-white rounded-xl hover:bg-gray-500'
                    onClick={props.handleView}
                    >
                        <span className=""><i className="fas fa-times-circle"></i> Cancel</span>
                    </button>

                    <button className='mr-4 px-2 py-1 bg-green-400 text-white rounded-xl hover:bg-green-500'
                    onClick={addFoods}
                    >
                        <span className=""><i className="fas fa-check-circle"></i> Apply</span>
                    </button>
               
            </div>
            <div className='mt-1'>
                <div className=''>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Choose Category
                    </label>
                    <select
                    id="category"
                    name="category"
                    className={`block w-1/2 rounded-md border border-gray-300 bg-white px-3 py-1.5 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-sm ${ new_category != "" && "text-gray-400" }`}
                    disabled = { new_category != "" }
                    onChange={ (e) => setCategory(e.target.value)}
                    >
                        {
                            props.all_categories.data.map( (cates :any , index :any) => (
                                <option value={cates} key={index}>{cates}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='mt-1'>
                    <label htmlFor="new-cat" className="block text-sm font-medium text-gray-700">
                        or Create new Category
                    </label>
                    <input
                        type="text"
                        id="new-cat"
                        placeholder="Food name"
                        className="mt-1 block w-1/2 rounded-md border border-gray-300 shadow-sm px-3 py-1 focus:outline-none  focus:border-amber-200"
                        onChange={ (e) => set_new_category( e.target.value )}
                        />
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AddNewFood


