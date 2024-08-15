import axios from 'axios';

const API_URL = 'https://api.example.com'; // Replace with your API URL

export const fetchSalesData = (date) => {
  return axios.get(`${API_URL}/sales?date=${date}`);
};

export const fetchTodaySalesData = () => {
  return axios.get(`${API_URL}/sales/today`);
};
