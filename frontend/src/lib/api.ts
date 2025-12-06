
import axiosInstance from './axios.js';

export const signup = async (signupData :any) => {
  const response = await axiosInstance.post('/auth/signup', signupData);
  return response.data;
}

export const isProtected = async () => {
  try {
          const response = await axiosInstance.get('/auth/protected')
      return response.data
  }
   catch (error) {
    console.error("Error checking protected route:", error);
    return null;
    
  }

    }

export const completeOnboarding = async (userData :any) => {
  const response = await axiosInstance.post('/auth/onboarding', userData);
  return response.data;
}
export const login = async (loginData :any) => {
  const response = await axiosInstance.post('/auth/login', loginData);
  return response.data;
}

export const logout = async () => {
  const response = await axiosInstance.post('/auth/logout');
  return response.data;
}