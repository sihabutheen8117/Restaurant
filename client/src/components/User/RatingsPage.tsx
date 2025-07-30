"use client"

import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getFoodDetailsWithoutReviews } from '@/reactQuery/queries'
import { useState, useEffect, useCallback } from 'react'
import { Star } from 'lucide-react'
import { Review } from '@/reactQuery/itemInterfaces'
import { user_ratings } from '@/reactQuery/queries'


const RatingsPage = ({ ratings_details, order_id, israted , rated_data , close }:any) => {
    const queryClient = useQueryClient()
    console.log(rated_data);
    const get_ordered_food_query = useQuery({
        queryKey: ["order_food_details", ratings_details?.food_data],
        queryFn: () => getFoodDetailsWithoutReviews(ratings_details?.food_data),
        enabled: !!ratings_details?.food_data // Only run query if food_data exists
    })

    const user_ratings_mutation = useMutation({
        mutationFn: user_ratings,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my_orders"] })
            queryClient.invalidateQueries({ queryKey: ["order_food_details"] })
            close()
        },
        onError: (error) => {
            console.error("Rating submission failed:", error)
            // You might want to show a toast notification here
        }
    })

    const [reviews, setReviews] = useState<any>([])
    const [isSubmitting, setIsSubmitting] = useState(false)

 
    useEffect(() => {
        if (get_ordered_food_query.isSuccess && get_ordered_food_query.data?.data) {
            const initialReviews = get_ordered_food_query.data.data.map((item: any) => ({
                food_id: item._id,
                stars: 0,
                food_name: item.food_name
            }))
            setReviews(initialReviews)
        }
    }, [get_ordered_food_query.isSuccess, get_ordered_food_query.data])

    // Memoized star click handler to prevent unnecessary re-renders
    const handleStarClick = useCallback((foodId: string, starIndex: number) => {
        setReviews((prev:any) => 
            prev.map((food:any) =>
                food.food_id === foodId 
                    ? { ...food, stars: starIndex + 1 } 
                    : food
            )
        )
    }, [])

    const handleSubmit = async () => {
        if (isSubmitting) return 
        
        const hasUnratedItems = reviews.some((review:any) => review.stars === 0)
        if (hasUnratedItems) {
            alert("Please rate all items before submitting")
            return
        }

        setIsSubmitting(true)
        
        try {
            const finalData = {
                order_id,
                reviews
            }
            await user_ratings_mutation.mutateAsync(finalData)
        } catch (error) {
            console.error("Failed to submit ratings:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    // Loading state
    if (get_ordered_food_query.isLoading) {
        return (
            <div className='p-2 h-full flex items-center justify-center'>
                <div className='text-center'>Loading food details...</div>
            </div>
        )
    }

    // Error state
    if (get_ordered_food_query.isError) {
        return (
            <div className='p-2 h-full flex items-center justify-center'>
                <div className='text-center text-red-500'>
                    Failed to load food details. Please try again.
                </div>
            </div>
        )
    }

    return (
        <div className='p-2 h-full flex flex-col'>
            <div className='text-center bg-blue-400 py-2 text-white font-semibold'>
                {israted ? "Your Ratings" : "Please Leave a Rating"}
            </div>
            
            <div className='flex-1 mt-2 overflow-y-auto'>
                {get_ordered_food_query.isSuccess &&
                    get_ordered_food_query.data?.data?.map((item: any, index: number) => {
                        const currentRating = reviews.find((food:any) => food.food_id === item._id)?.stars || 0
                        
                        return (
                            <div className='mb-4' key={item._id}>
                                <div className='text-xl font-semibold tracking-wide'>
                                    {index + 1}. {item.food_name}
                                </div>
                                <hr className='text-gray-300 my-2' />
                                
                                <div className='flex my-2 justify-center items-center gap-1'>
                                    <img 
                                        src="/assets/svg/angry_face.svg" 
                                        alt="angry face" 
                                        className='w-9 h-9'
                                    />
                                    
                                    <div className='flex '>
                                    {
                                        !israted ? 
                                        [...Array(5)].map((_, i) => (
                                            <Star
                                                key={`${item._id}-star-${i}`}
                                                onClick={() => !israted && handleStarClick(item._id, i)}
                                                className={`w-8 h-8 transition-colors duration-150 ${
                                                    !israted ? 'cursor-pointer' : 'cursor-default'
                                                } ${
                                                    i < currentRating
                                                        ? 'fill-amber-400 stroke-amber-500'
                                                        : 'fill-none stroke-gray-400'
                                                }`}
                                            />
                                        ))
                                        :
                                        [...Array(5)].map((_, i) => {
                                            const foundRating = rated_data.find((fd:any) => fd.food_id === item._id);
                                            const stars = foundRating ? foundRating.stars : 0;
                                        
                                            return (
                                                <Star
                                                    key={`${item._id}-star-${i}`}
                                                    className={`w-8 h-8 transition-colors duration-150 ${
                                                        !israted ? 'cursor-pointer' : 'cursor-default'
                                                    } ${
                                                        i < stars
                                                            ? 'fill-amber-400 stroke-amber-500'
                                                            : 'fill-none stroke-gray-400'
                                                    }`}
                                                />
                                            );
                                        })
                                    }
                                    </div>
                                    
                                    <img 
                                        src="/assets/svg/smile_face.svg" 
                                        alt="smile face" 
                                        className='w-9 h-9'
                                    />
                                </div>
                                
                                {currentRating > 0 && (
                                    <div className='text-center text-sm text-gray-600'>
                                        Rating: {currentRating}/5 stars
                                    </div>
                                )}
                            </div>
                        )
                    })
                }
            </div>
            
            {!israted && (
                <button 
                    className={`w-full mt-2 py-2 text-white text-lg transition-colors ${
                        isSubmitting || user_ratings_mutation.isPending
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-green-400 hover:bg-green-500'
                    }`}
                    onClick={handleSubmit}
                    disabled={isSubmitting || user_ratings_mutation.isPending}
                >
                    {isSubmitting || user_ratings_mutation.isPending 
                        ? 'Submitting...' 
                        : 'Submit Ratings'
                    }
                </button>
            )}
            {
                israted && 
                <div className=''>
                    <div className='text-center text-green-700 mt-2 text-lg'>
                        Your Ratings is Saved !
                    </div>
                    <button className='mt-2 w-full bg-red-400 text-white py-2 text-xl font-bold tracking-wide'
                    onClick={() => close()}
                    >
                        close
                    </button>
                </div>
            }
            {user_ratings_mutation.isError && (
                <div className='text-red-500 text-center mt-2'>
                    Failed to submit ratings. Please try again.
                </div>
            )}
        </div>
    )
}

export default RatingsPage