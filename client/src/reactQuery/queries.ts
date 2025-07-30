import { Food } from '@/reactQuery/itemInterfaces'
import apiClient from "@/utils/axiosConfig";

export const registerUser = async (userData : any ) => {
    try {
        const response = await apiClient.post('/api/authendicate/register',
        userData,
        {
          withCredentials : true 
        });
        console.log(response)
        return response.data; 
      } catch (error : any ) {
        console.error(error);
        throw error;
      }
    
}

export const loginUser = async (userData :any) => {
    try {
        const response = await apiClient.post('/api/authendicate/login',
        userData,
        {
          withCredentials : true 
        });
        console.log(response)
        return response; 
      } catch (error :any) {
        console.error(error.response);
        throw error;
      }
}

//client queries

export const getAllFood = async() => {
  try{
    const response = await apiClient.get<Food[]>('/api/get_all_foods') ;
    console.log(response)
    return response
  }
  catch(err)
  {
    console.log(err);
    throw err ;
  }
}

export const placeOrder = async(order_details : any ) => {
  try{
    const response = await apiClient.post('/api/place_order',
      order_details,
      {
        withCredentials : true 
      }
    ) ;
    console.log(response)
    return response
  }
  catch(err)
  {
    console.log(err);
    throw err ;
  }
}



export const myOrders = async() => {
  try{
    const response = await apiClient.get('/api/my_orders',
      {
        withCredentials : true 
      }
    ) ;
    console.log(response)
    return response
  }
  catch(err)
  {
    console.log(err);
    throw err ;
  }
}


export const getFoodDetails =  async() => {
  try{

  }
  catch(err)
  {
    console.log(err);
    throw err ;
  }
}

export const getFoodDetailsWithoutReviews =  async(food_details : any ) => {
  try{
    const response = await apiClient.post('/api/get_food_details_whithout_reviews',
      food_details ,
      {
        withCredentials : true 
      }
    ) ;
    console.log(response)
    return response
  }
  catch(err)
  {
    console.log(err);
    throw err ;
  }
}

export const deleteOrder =  async(food_details : any ) => {
  try{
    const response = await apiClient.post('/api/delete_orders',
      food_details ,
      {
        withCredentials : true 
      }
    ) ;
    console.log(response)
    return response
  }
  catch(err)
  {
    console.log(err);
    throw err ;
  }
}

// admin queries

export const addNewFood =  async(food_data:Food) => {
  try{
    console.log(food_data.food_image)
    const respose = await apiClient.post("/api/add_new_foods",
      food_data,
      {
        withCredentials : true 
      });
    console.log(respose)
    return respose
  }
  catch(err)
  {
    console.log(err);
    throw err ;
  }
} 

export const getAllFoodForEdit = async() => {
  try{
    const response = await apiClient.get<Food[]>('/api/get_all_foods_for_edit') ;
    console.log(response)
    return response
  }
  catch(err)
  {
    console.log(err);
    throw err ;
  }
}


export const deleteFood = async( _id : string) => {
  try{
    const response = await apiClient.delete('/api/delete_food' ,
      {
        data : {
          _id : _id
        }
      }
    ) ;
    console.log(response)
    return response
  }
  catch(err)
  {
    console.log(err);
    throw err ;
  }
}

export const getAllOrdesDetails = async() => {
  try{
    const response = await apiClient.get('/api/get_all_orders_details') ;
    console.log(response)
    return response
  }
  catch(err)
  {
    console.log(err);
    throw err ;
  }
}

export const getFoodDetailsForOrders =  async(order_details : any ) => {
  try{
    const response = await apiClient.post('/api/get_food_details_for_orders',
      order_details ,
      {
        withCredentials : true 
      }
    ) ;
    console.log(response)
    return response
  }
  catch(err)
  {
    console.log(err);
    throw err ;
  }
}

export const payment_checkout =  async(order_details : any ) => {
  try{
    const response = await apiClient.post('/api/payment_checkout',
      order_details ,
      {
        withCredentials : true 
      }
    ) ;
    console.log(response)
    return response
  }
  catch(err)
  {
    console.log(err);
    throw err ;
  }
}

export const get_seved_orders  =  async() => {

  try{
    const response = await apiClient.get('/api/get_served_orders ',
      {
        withCredentials : true 
      }
    ) ;
    console.log(response)
    return response
  }
  catch(err)
  {
    console.log(err);
    throw err ;
  }
}

export const get_entry_orders =  async() => {

  try{
    const response = await apiClient.get('/api/get_entry_orders',
      {
        withCredentials : true 
      }
    ) ;
    console.log(response)
    return response
  }
  catch(err)
  {
    console.log(err);
    throw err ;
  }
}


export const set_user_name_for_anonymous  =  async(user_data : any ) => {

  try{
    const response = await apiClient.post('/api/set_user_name_for_anonymous',
      user_data ,
      {
        withCredentials : true 
      }
    ) ;
    console.log(response)
    return response
  }
  catch(err)
  {
    console.log(err);
    throw err ;
  }
}

export const get_countables =  async( ) => {

  try{
    const response = await apiClient.get('/api/get_countables',
      {
        withCredentials : true 
      }
    ) ;
    console.log(response)
    return response
  }
  catch(err)
  {
    console.log(err);
    throw err ;
  }
}


export const get_dashboard_analytics_orders_customers =  async( user_data : any) => {
  try{
    const response = await apiClient.post('/api/get_dashboard_analytics_orders_customers',
      {
        user_data
      }
      ,
      {
        withCredentials : true 
      }
    ) ;
    console.log(response)
    return response
  }
  catch(err)
  {
    console.log(err);
    throw err ;
  }
}

export const get_dashboard_analytics_orders =  async( user_data : any) => {
  try{
    const response = await apiClient.post('/api/get_dashboard_analytics_total_orders',
      {
        user_data
      }
      ,
      {
        withCredentials : true 
      }
    ) ;
    console.log(response)
    return response
  }
  catch(err)
  {
    console.log(err);
    throw err ;
  }
}

export const register_google_oauth  =  async() => {
  try{
    const response = await apiClient.post('/api/google/oauth',
      {
        withCredentials : true 
      }
    ) ;
    console.log(response)
    return response
  }
  catch(err)
  {
    console.log(err);
    throw err ;
  }
}




export const update_food_details  =  async(food_data : any ) => {
  try{
    const response = await apiClient.post('/api/update_food_details',
      food_data ,
      {
        withCredentials : true 
      }
    ) ;
    console.log(response)
    return response
  }
  catch(err)
  {
    console.log(err);
    throw err ;
  }
}



export const get_all_categories  =  async() => {
  try{
    const response = await apiClient.get('/api/get_all_categories',
      {
        withCredentials : true 
      }
    ) ;
    console.log(response)
    return response
  }
  catch(err)
  {
    console.log(err);
    throw err ;
  }
}

export const manual_entry_get_foods  =  async() => {
  try{
    const response = await apiClient.get('/api/manual_entry/get_foods',
      {
        withCredentials : true 
      }
    ) ;
    console.log(response)
    return response
  }
  catch(err)
  {
    console.log(err);
    throw err ;
  }
}

export const  place_entry  =  async(food_data : any) => {
  try{
    const response = await apiClient.post('/api/place_entry',
      food_data ,
      {
        withCredentials : true 
      }
    ) ;
    console.log(response)
    return response
  }
  catch(err)
  {
    console.log(err);
    throw err ;
  }
}

export const user_ratings =  async(food_data : any) => {
  try{
    const response = await apiClient.post('/api/user_ratings',
      food_data ,
      {
        withCredentials : true 
      }
    ) ;
    console.log(response)
    return response
  }
  catch(err)
  {
    console.log(err);
    throw err ;
  }
}

// common queries 



