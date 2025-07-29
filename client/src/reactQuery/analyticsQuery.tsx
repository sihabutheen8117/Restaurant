import axios from 'axios'

const api = process.env.NEXT_PUBLIC_API_KEY;

// overview

export const overview_users = async () => {
  try {
      const response = await axios.get(api+'/users/overview',
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

export const overview_foods = async () => {
  try {
      const response = await axios.get(api+'/foods/overview',
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

export const overview_orders = async () => {
  try {
      const response = await axios.get(api+'/orders/overview',
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


//  orders 


export const orders_trends = async ( tp : any ) => {
  const trendPeriod = tp ;
  try {
      const response = await axios.get(api+`/orders/trends?period=${trendPeriod}`,
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

export const orders_customer_insights = async () => {
  try {
      const response = await axios.get(api+'/orders/customer-insights',
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

export const orders_food_analysis = async () => {
  try {
      const response = await axios.get(api+'/orders/food-analysis',
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
// customers

export const users_registration_trends = async ( tp  : any ) => {
  const timePeriod = tp ;
  try {
      const response = await axios.get(api+`/users/registration-trends?period=${timePeriod}`,
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

export const users_activity = async () => {
  try {
      const response = await axios.get(api+'/users/activity',
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

// foods


export const foods_popular = async () => {
    try {
        const response = await axios.get(api+'/foods/popular',
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

export const foods_performance = async () => {
  try {
      const response = await axios.get(api+'/foods/performance',
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
export const download_summary = async (data: any) => {
  try {
    const response = await axios.post(api + '/download-orders', data, {
      withCredentials: true,
      responseType: 'blob', 
    });
    console.log(response);
    return response; 
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};


