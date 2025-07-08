import axios from 'axios'
import { Food } from '@/reactQuery/itemInterfaces'
// Authendication queries 

export const registerUser = async (userData : any ) => {
    try {
        const response = await axios.post('http://localhost:3001/api/authendicate/register',
        {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        },
        {
          withCredentials : true 
        });
        return response.data; 
      } catch (error : any ) {
        console.error(error.response.data);
        throw error;
      }
    
}

export const loginUser = async (userData :any) => {
    try {
        const response = await axios.post('http://localhost:3001/api/authendicate/login',
        {
          email: userData.email,
          password: userData.password,
        },
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
    const response = await axios.get<Food[]>('http://localhost:3001/api/get_all_foods') ;
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

// admin queries

export const addNewFood =  async(food_data:Food) => {
  try{
    console.log(food_data.food_image)
    const respose = await axios.post("http://localhost:3001/api/add_new_foods",
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
    const response = await axios.get<Food[]>('http://localhost:3001/api/get_all_foods_for_edit') ;
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
    const response = await axios.delete('http://localhost:3001/api/delete_food' ,
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


// common queries 



