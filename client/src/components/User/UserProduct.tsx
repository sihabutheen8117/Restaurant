"use client"
import React, { useState , useMemo , useEffect} from 'react'
import '../../styles/mainStyles.css'
import ViewFoods from './ViewFoods'
import { useQuery } from '@tanstack/react-query'
import { getAllFood } from '@/reactQuery/queries'
import { Food } from '@/reactQuery/itemInterfaces'
import { CartItems } from '@/reactQuery/itemInterfaces'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import MobileLoaders from '../Loaders/MobileLoaders'

const UserProduct = (props : any) => {


    const [foodQuantity , setFoodQuantity ] = useState<{ [key: string]: number }>({});
    
    const handleAddCart = (cart_data : CartItems ) => {
        props.set_user_cart( (prev:any)=> [ ...prev , cart_data ]) ;
        setFoodQuantity(prev => ({
            ...prev ,
            [cart_data._id] : 1,
        }))
        
    }

    const router = useRouter() ;

    const handlePreOrder = () => {
        localStorage.setItem("user_cart" , JSON.stringify(props.user_cart) ) ;
        localStorage.setItem("food_quantity" ,JSON.stringify(foodQuantity)  )
        router.push('/user/user_cart')
    }

    const handleDelCart = (_id : string ) => {
        props.set_user_cart( (prev:any) => prev.filter((item :any)=> item._id != _id) ) ;
        setFoodQuantity(prev => {
            const updated = { ...prev };
            delete updated[_id];           
            return updated;
          });
          
    }

    const foodQuery = useQuery({
        queryKey : ["foods"] ,
        queryFn : () => getAllFood()
    })

    
    const [ selectedFood , setSelectedFood ] = useState<Food>()
    const [view , setView ] = useState(false) ;

    const handleIncCart = (_id : string ) => {
        props.set_user_cart( (prev:any) => 
            prev.map(
                (item :any) => item._id == _id ? { ...item , quantity : item.quantity+1} : item
            )
        )
        setFoodQuantity(prev => ({
            ...prev,
            [_id]: (prev[_id] || 0) + 1
          }));
          
    }

    const handleDecCart = (_id : string  ) => {
        props.set_user_cart( (prev:any) => 
            prev.map(
                (item :any) => item._id == _id ? { ...item , quantity : item.quantity-1} : item
            )
        )
        setFoodQuantity(prev => {
            const updated = { ...prev };
            if (updated[_id] > 1) {
              updated[_id] -= 1;
            } else {
              delete updated[_id];
            }
            return updated;
          });
          
    }

    const handleView = () => {
        setView( !view ) 
    }

    const handleFoodDetails = (items : Food) => {
        setSelectedFood(items)
        setView( !view )
    }

    const viewItems = () => {
        console.log("view items ")
    }

    const finalFoods : Food[] = useMemo(() => {

        if (!foodQuery.isSuccess || !foodQuery.data?.data) return [];
      
        const getEffectivePrice = (item: any) =>
          item.offer_price !== undefined && item.offer_price !== -1
            ? item.offer_price
            : item.price;

      
        const filteredFoods = foodQuery.data.data.filter((item) =>
          (props.search == null || item.food_name.toLowerCase().includes(props.search.toLowerCase())) 
            &&
          (item.offer_price === undefined
            ? props.filters.price_range < item.price
            : props.filters.price_range < item.offer_price) 
            &&
          item.rating_count !== undefined && props.filters.ratings <= item.rating_count 
           &&
          ( props.cat_filter == "All" || props.cat_filter == item.category )
        );
      
        const sortedFoods = [...filteredFoods].sort((a, b) => {
          const priceA = getEffectivePrice(a);
          const priceB = getEffectivePrice(b);
          return priceA - priceB;
        });
      
        return props.filters.price_order === 0
          ? filteredFoods
          : props.filters.price_order === -1
          ? sortedFoods.reverse()
          : sortedFoods;

    }, [foodQuery.isSuccess, foodQuery.data, props.search, props.filters ,props.cat_filter]);

      useEffect(() => {
          const cartData = localStorage.getItem("user_cart");
          const food_quantity = localStorage.getItem("food_quantity") ;
          if (cartData && food_quantity) {
            try {
              props.set_user_cart(JSON.parse(cartData));
              setFoodQuantity(JSON.parse(food_quantity));
            } catch (err) {
              console.error("Invalid JSON in localStorage:", err);
            }
          }
        }, []);

        if(foodQuery.isLoading)
        {
            return(
                <div className='w-full'>
                    <MobileLoaders/>
                    <MobileLoaders/>
                    <MobileLoaders/>
                </div>
            )
        }

  return (
    <div>
        {
           
            view && <div 
            >
                <div className='fixed inset-0 bg-black opacity-40 z-10'
                onClick={handleView}> </div>
                <div className='z-50 bg-white fixed inset-x-70 inset-y-20 rounded-xl'>
                    <ViewFoods food_data={selectedFood}/>
                </div>
            </div>
        }
      <div className='md:flex md:gap-4 md:flex-wrap '>
        {/* {
            foodQuery.isSuccess && 
            foodQuery.data.data.map( (items , index ) => (
                props.search==null || items.food_name.includes(props.search) &&
                items.offer_price == undefined ? props.filters.price_range < items.price : props.filters.price_range < items.offer_price &&
                props.filters.ratings <= items.rating_count &&
                <div className='md:w-56 md:h-96 w-full md:mb-0 mb-3  h-40 rounded-2xl bg-gray-50 relative md:block flex'
                    key = {index}
                >
                    <div className='md:w-52 md:h-52 md:m-2 rounded-xl relative'>
                        <img src={items.food_image} alt = {items.food_name} className='object-fit md:w-52 md:h-52 w-40 h-40 rounded-lg object-cover'
                        onClick={viewItems}
                        />
                        <button className='hidden md:block'
                        onClick={() => handleFoodDetails(items)}
                        >
                            <i className="fas fa-eye text-gray-600 absolute top-2 right-2 bg-white rounded-full px-2 py-0.5"
                            ></i>
                        </button>
                        
                    </div>
                    <div className='relative flex-1 m-2 md:m-0'>
                        <div className={`mx-1.5 font-semibold text-xl md:text-lg`}
                        onClick={viewItems}
                        >
                            {items.food_name}
                        </div>
                        <div className='md:mt-1.5 mt-2 flex justify-between ml-1'>
                            <i className="fas fa-star text-yellow-500">
                                <span className='text-black font-semibold text-sm pl-1'> {items.rating_count} / 5 </span>
                                <span className='text-black opacity-40 text-xs pl-1'>(107)</span> 
                            </i>
                            <div className='px-2 opacity-75 text-sm'>{items.review_count} reviews</div>
                        </div>
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
                        {
                            items.offer_price != -1  && 
                            <div className='bg-red-500 text-xs px-2 py-1 absolute left-0 md:-bottom-8 bottom-0 text-white font-semibold'>
                                limited offer
                            </div>
                                    
                        }
                        <div className='mt-1 absolute md:right-3 right-0 md:-bottom-9 bottom-0'>
                        {
                            cart == 0 ? 
                            <button
                            className='px-4 py-1 bg-amber-300 text-sm rounded-full'
                            onClick={handleIncCart}
                            >
                                Add to cart
                                <i className='fas fa-shopping-cart pl-1'></i>
                            </button>
                            :
                            <div className='border-2 border-amber-300 rounded-full px-4 py-0.5'>
                                {
                                    cart == 1 ? 
                                    <button className='text-sm'
                                    onClick={handleDecCart}
                                    ><i className="fas fa-trash pr-3"></i></button>
                                    :
                                    <button className='text-sm'
                                    onClick={handleDecCart}
                                    ><i className="fas fa-minus pr-3"></i></button>
                                }
                                <div className='font-semibold inline'>{cart}</div>
                                <button className='text-sm'
                                onClick={handleIncCart}
                                ><i className="fas fa-plus pl-3"></i></button>
                            </div>
                        }
                        </div>
                        
                    </div>
                </div>
            ))
        } */}
         {
            foodQuery.isSuccess && 
            finalFoods.map( (items , index ) => (
                <div className='md:w-48 md:h-96 w-full md:mb-0 mb-3 h-40 rounded-2xl bg-gray-50 relative md:block flex'
                    key = {index}
                >
                    <div className='md:w-48 md:h-48  rounded-xl relative'>
                        <img src={items.food_image} alt = {items.food_name} className='object-fit md:w-48 md:h-48 w-40 h-40 rounded-lg object-cover'
                        onClick={viewItems}
                        />
                        <button className='hidden md:block'
                        onClick={() => handleFoodDetails(items)}
                        >
                            <i className="fas fa-eye text-gray-600 absolute top-2 right-2 bg-white rounded-full px-2 py-0.5"
                            ></i>
                        </button>
                        
                    </div>
                    <div className='relative flex-1 m-2 md:m-0'>
                        <div className={`mx-1.5 font-semibold text-xl md:text-lg`}
                        onClick={viewItems}
                        >
                            {items.food_name}
                        </div>
                        <div className='md:mt-1.5 mt-2 flex justify-between ml-1'>
                            <i className="fas fa-star text-yellow-500">
                                <span className='text-black font-semibold text-sm pl-1'> {items.rating_count} / 5 </span>
                                <span className='text-black opacity-40 text-xs pl-1'>(107)</span> 
                            </i>
                            <div className='px-2 opacity-75 text-sm'>{items.review_count} reviews</div>
                        </div>
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
                        {
                            items.offer_price != -1  && 
                            <div className='bg-red-500 text-xs px-2 py-1 absolute left-0 md:-bottom-8 bottom-0 text-white font-semibold'>
                                limited offer
                            </div>
                                    
                        }
                        <div className='mt-1 absolute md:right-9 right-0 md:-bottom-17 bottom-0'>
                        {
                            (foodQuantity[items._id ?? '']||0) == 0 ? 
                            <button
                            className='px-4 py-1 bg-amber-300 text-sm rounded-full'
                            onClick={() => handleAddCart({
                                food_image : items.food_image ,
                                food_name : items.food_name ,
                                price : items.price ,
                                offer_price : (items.offer_price == undefined ? -1 : items.offer_price ) ,
                                _id : (items._id == undefined ? '' : items._id )  ,
                                quantity : 1
                            }) }
                            >
                                Add to cart
                                <i className='fas fa-shopping-cart pl-1'></i>
                            </button>
                            :
                            <div className='border-2 border-amber-300 rounded-full px-4 py-0.5'>
                                {
                                    foodQuantity[items._id ?? ''] == 1 ? 
                                    <button className='text-sm'
                                        onClick={() => handleDelCart(items._id ?? '') }
                                    ><i className="fas fa-trash pr-3"></i></button>
                                    :
                                    <button className='text-sm'
                                    onClick={() => handleDecCart(items._id ?? '')}
                                    ><i className="fas fa-minus pr-3"></i></button>
                                }
                                <div className='font-semibold inline'>{foodQuantity[items._id ?? '']}</div>
                                <button className='text-sm'
                                onClick={() => handleIncCart(items._id ?? '') }
                                ><i className="fas fa-plus pl-3"></i></button>
                            </div>
                        }
                        </div>
                        
                    </div>
                </div>
            ))
        }
      </div>
      <div className='md:hidden'>
            <button className='fixed bottom-9 right-7 bg-amber-400 rounded-full px-4 py-1'
            onClick={handlePreOrder}
            >
                cart
                <i className='fas fa-shopping-cart pl-1 mx-2'></i>
                ({props.user_cart.length})
            </button>
      </div>
    </div>
  )
}

export default UserProduct
