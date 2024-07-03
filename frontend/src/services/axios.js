// src/services/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3011', // Replace with your API base URL
  timeout: 10000, // Timeout, in milliseconds
  headers: {
    'Content-Type': 'application/json',
    // You can add other headers here as needed
  },
});

export default axiosInstance;
