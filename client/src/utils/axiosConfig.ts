
import axios from 'axios';

let router: any;

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response?.status === 401 || error.response?.status === 403) {
      const redirectTo = error.response.data?.redirectTo;
      
      if (redirectTo && router) {
        console.log('Redirecting to:', redirectTo);
        router.push(redirectTo);
      }
    }
    
    return Promise.reject(error);
  }
);

// Function to set router instance
export const setRouter = (routerInstance: any) => {
  router = routerInstance;
};

export default apiClient;