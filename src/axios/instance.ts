import axios, { AxiosInstance } from 'axios';

const defaultBaseURL = 'http://localhost:3000';
const envBaseURL = process.env.HOSTING_URL; 

const baseURL = envBaseURL || defaultBaseURL; 

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;