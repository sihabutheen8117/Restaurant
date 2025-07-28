import axios from 'axios'

const api = process.env.NEXT_PUBLIC_API_KEY;

export const get_settings_data = async () => {
    try {
        const response = await axios.get(api+'/api/settings/get_data',
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


export const bulk_food_availability_update = async (food_data : any ) => {
    try {
        const response = await axios.post(api+'/api/settings/food_management',
            food_data ,
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

export const global_price_update = async ( price_data : any ) => {
    try {
        const response = await axios.post(api+'/api/settings/pricing',
            price_data ,
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

export const delete_all_unchecked_orders = async ( ) => {
    try {
        const response = await axios.post(api+'/api/settings/delete_unchecked_orders',
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

export const home_content_update = async ( content_data : any ) => {
    try {
        const response = await axios.post(api+'/api/settings/content_management',
            content_data ,
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

export const system_reset = async (food_data : any ) => {
    try {
        const response = await axios.post(api+'/api/settings/system_reset',
            food_data ,
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

export const upload_home_images = async ({ formData, folder }:any) => {
  try {
    const response = await axios.post(
      api + `/upload/cloud/${folder}`,
      formData, // Send formData directly, not wrapped in an object
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        }
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const get_home_images = async ({ folder }:any) => {
  try {
    const response = await axios.get(
      api + `/images/folder/${folder}`,
      {
        withCredentials: true,
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const delete_home_images = async (data : any ) => {
  try {
    const response = await axios.post(
      api + `/cloud/delete`,
      data ,
      {
        withCredentials: true,
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

