"use client"

import React, { useEffect, useState } from 'react'
import UserNav from '@/components/User/UserNav';
import { useRouter } from 'next/navigation';
import { placeOrder } from '@/reactQuery/queries';
import { useMutation } from '@tanstack/react-query';
import PromptName from '@/components/User/PromptName';

const Page = () => {

  const [foodQuantity , setFoodQuantity ] = useState<{ [key: string]: number }>({});
  
  const [userCart, setUserCart] = useState<any>(null);
  const [is_name, set_is_name] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("user_name");
    set_is_name(storedName);
  }, []);

  const [ act_prompt , set_act_prompt ] = useState(false) ;

  const router = useRouter() ;
  
  const handlePreOrder = () => {
      localStorage.setItem("user_cart" , JSON.stringify(userCart) ) ;
      localStorage.setItem("food_quantity" ,JSON.stringify(foodQuantity)  )
      router.push('/user/client')
  }

  const handleSuccessfullOrder = () => {
    router.push('/user/order_placed')
  }

  const newFoods = useMutation({
    mutationFn : placeOrder ,
    onSuccess : () => {
        // queryClient.invalidateQueries({
        //     queryKey : ['foods']
        // })
        handleSuccessfullOrder()
        }
    })

  const handleOrderPlace = () => {

    if(is_name == "" || is_name == undefined || is_name == null)
    {
      set_act_prompt(true)
      return ;
    }
    const fieldsToKeep = ["_id", "quantity"];
    const filteredCart = userCart.map((item: any) => {
      const result: any = {};
      fieldsToKeep.forEach((key: string) => {
        if (key in item) {
          result[key] = item[key];
        }
      });
      return result;
    });
    newFoods.mutate({ body : filteredCart , user_name : is_name }) ;
    router.push('/user/order_placed');
  }

  const handleAddCart = (cart_data : any) => {
      setUserCart( (prev:any)=> [ ...prev , cart_data ]) ;
          setFoodQuantity(prev => ({
              ...prev ,
              [cart_data._id] : 1,
          }))
          
      }
    const handleDelCart = (_id : string ) => {
      setUserCart( (prev:any) => prev.filter((item :any)=> item._id != _id) ) ;
        setFoodQuantity(prev => {
            const updated = { ...prev };
            delete updated[_id];           
            return updated;
          });
          
    }

    const handleIncCart = (_id : string ) => {
      setUserCart( (prev:any) => 
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
      setUserCart( (prev:any) => 
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
  useEffect(() => {
    router.prefetch('/user/order_placed')
    const cartData = localStorage.getItem("user_cart");
    const food_quantity = localStorage.getItem("food_quantity") ;
    if (cartData && food_quantity) {
      try {
        setUserCart(JSON.parse(cartData));
        setFoodQuantity(JSON.parse(food_quantity));
      } catch (err) {
        console.error("Invalid JSON in localStorage:", err);
      }
    }
  }, []);

  return (
    <div>
      <div className="z-20">
        <UserNav isSearch={false} isBack={true} goBack={() => handlePreOrder()}/>
      </div>
      {
        act_prompt && 
        <div className=''>
          <div className='fixed bg-black inset-0 z-10 opacity-25' onClick={() => set_act_prompt(false)}></div>
          <div className='fixed bg-white inset-x-10 inset-y-96 z-20 rounded-xl'>
            <PromptName close={() => set_act_prompt(false)} setUser={(name:any) => set_is_name(name)}/>
          </div>
        </div>
      }
      <div className='mb-10'>
          {
            userCart && 
            userCart.map( (item:any , index : any  ) => (
              <div className='flex gap-2 my-4 mx-3 h-20 bg-gray-300' key={index} >
                <img src={item.food_image} alt={item.food_name} className='object-cover w-20 h-20 rounded-lg mx-auto'/>
                <div className='flex-1 my-1.5'>
                  <div className='font-semibold text-xl'>
                    <div className=''>
                      {item.food_name}
                    </div>
                  </div>
                  <div className='relative h-full'>
                    <div className='absolute left-2 bottom-7 text-xl font-semibold'>
                            <span className="absolute top-1 -left-2 text-sm text-gray-600">₹</span>
                                {
                                    item.offer_price == -1  ? 
                                    <span className="text-2xl font-semibold ">{item.price}</span>
                                    :
                                    <>
                                        <span className="text-2xl font-semibold mr-3">{item.offer_price}</span>
                                        <div className='inline relative'>
                                            <span className="absolute top-1 -left-2 text-xs text-gray-600">₹</span>
                                            <span className="font-semibold line-through opacity-50 text-lg ">{item.price}</span>
                                        </div>
                                    </>
                                }
                    </div>
                    <div className='absolute right-4 bottom-7'>
                    {
                            (foodQuantity[item._id ?? '']||0) == 0 ? 
                            <button
                            className='px-4 py-1 bg-amber-300 text-sm rounded-full'
                            onClick={() => handleAddCart({
                                food_image : item.food_image ,
                                food_name : item.food_name ,
                                price : item.price ,
                                offer_price : (item.offer_price == undefined ? -1 : item.offer_price ) ,
                                _id : (item._id == undefined ? '' : item._id )  ,
                                quantity : 1
                            }) }
                            >
                                Add to cart
                                <i className='fas fa-shopping-cart pl-1'></i>
                            </button>
                            :
                            <div className='border-2 border-amber-300 rounded-full px-4 py-0.5'>
                                {
                                    foodQuantity[item._id ?? ''] == 1 ? 
                                    <button className='text-sm'
                                        onClick={() => handleDelCart(item._id ?? '') }
                                    ><i className="fas fa-trash pr-3"></i></button>
                                    :
                                    <button className='text-sm'
                                    onClick={() => handleDecCart(item._id ?? '')}
                                    ><i className="fas fa-minus pr-3"></i></button>
                                }
                                <div className='font-semibold inline'>{foodQuantity[item._id ?? '']}</div>
                                <button className='text-sm'
                                onClick={() => handleIncCart(item._id ?? '') }
                                ><i className="fas fa-plus pl-3"></i></button>
                            </div>
                        }
                    </div>
                  </div>
                </div> 
              </div>
            ))
          }
        </div>

      <div className='fixed bottom-5 inset-x-4'>
        <div className='flex bg-amber-100 justify-between rounded-xl'>
          <div className='h-full my-auto flex-1 flex justify-center'>
              <div className='relative text-2xl font-bold'>
                <span className="absolute top-0.5 -left-2.5 text-sm text-gray-600">₹</span>
                {
                  userCart && 
                  userCart.reduce((total:any, item:any) => {
                    const effectivePrice = item.offer_price == null ? item.price : item.offer_price ;
                    return total + effectivePrice * item.quantity;
                  }, 0)
                }
              </div>
          </div>
          <div className='flex h-full items-center gap-3'>
            <span className='text-lg font-medium'>items : { userCart && userCart.length}</span>
            <button className='bg-green-600 py-2.5 rounded-xl text-lg px-6'
            onClick={handleOrderPlace}
            >
              Order now 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
