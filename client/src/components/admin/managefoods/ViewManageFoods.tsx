"use client"

import React from 'react'
import '../../../styles/mainStyles.css'
import EditFoods from './EditFoods'
import { useState ,useRef , useEffect} from 'react'
import { getAllFoodForEdit } from '@/reactQuery/queries'
import { useQuery } from '@tanstack/react-query'
import { Food } from '@/reactQuery/itemInterfaces'
import LoaderSilentLion from '@/components/Loaders/LoaderSilentLion'
import NotificationLoader from '@/components/Loaders/NotificationLoader'

const ViewManageFoods = (props: any) => {

    const [ selectedFood , setSelectedFood ] = useState<Food>()

    const [view , setView ] = useState(false) ;

    const foodQuery = useQuery({
        queryKey : ["foods" , "edit"] ,
        queryFn : () => getAllFoodForEdit()
    })

    const [ information , set_information ] = useState("") ;
    const [visible, set_visible] = useState(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
        
    const handle_update_success = () => {
              if(visible && timeoutRef.current)
              {
                clearTimeout(timeoutRef.current) ;
              }
              set_visible(true)
              set_information("food successfully updated !")
              timeoutRef.current = setTimeout(() => {
                set_visible(false)
              }, 5000)
            
          }
    
    const handle_delete_success = () => {
              if(visible && timeoutRef.current)
              {
                clearTimeout(timeoutRef.current) ;
              }
              set_visible(true)
              set_information("food successfully deleted !")
              timeoutRef.current = setTimeout(() => {
                set_visible(false)
              }, 5000)
            
          }
        
    const handleClose = () => {
            if(timeoutRef.current)
            {
              clearTimeout(timeoutRef.current)
            }
            set_visible(false) ;
          }
    
    useEffect(() => {
              return () => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current)
              }
            }, [])
   
    const handleView = () => {
        setView( !view ) 
    }

    const handleFoodDetails = (food_data : Food) => {
        setSelectedFood(food_data)
        setView( !view )
    }

    const viewItems = () => {
        console.log("view items ")
    }

    if(foodQuery.isLoading)
    {
        return(
            <div className=' h-screen '>
                <div className='flex justify-center h-8/12 items-center opacity-70'>
                    <LoaderSilentLion/>
                </div>             
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
                <div className='z-50 bg-white fixed inset-x-50 inset-y-20 rounded-xl'>
                    <EditFoods 
                    food_data={selectedFood} 
                    handle_view={ () => setView(false)}  
                    all_categories={props.all_categories} 
                    successful_update={() => handle_update_success()}
                    successful_delete={() => handle_delete_success()}
                    />
                </div>
            </div>
        }
      <div className='md:flex md:gap-3 md:flex-wrap'>
        {
            foodQuery.isSuccess && 
            foodQuery.data.data.map( (items , index ) => (
                ((props.filter == "" || items.food_name.toLowerCase().includes(props.filter.toLowerCase())) && ( props.cat_filter =="All" || props.cat_filter == items.category ) ) &&
                <div className='md:w-40 md:h-80 w-full md:mb-0 mb-3  h-40 rounded-2xl bg-gray-50 relative md:block flex'
                    key = {index}
                >
                    <div className='md:w-40 md:h-40 md:m-2 rounded-xl relative'>
                        <img src={items.food_image} alt = {items.food_name} className='object-fit md:w-40 md:h-40 w-40 h-40 rounded-lg object-cover'
                        onClick={viewItems}
                        />
                        <div className='hidden md:block'>
                            <i className="fas fa-pen text-gray-600 absolute top-2 right-2 bg-white rounded-full px-2 py-0.5"
                            onClick={() => handleFoodDetails(items)}
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
                                <span className='text-black font-semibold text-xm pl-1'> {items.rating_stars == null ? '-' : items.rating_stars} / 5 </span>
                                <span className='text-black opacity-40 text-xs pl-1'>({ items.rating_count})</span> 
                            </i>
                        </div>
                        <div className='px-2 opacity-75 text-xs'>{ items.review_count} reviews</div>
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
      {visible && <NotificationLoader state={"success"} information={information} close={ () => handleClose()}/>}
    </div>
  )
}


export default ViewManageFoods
