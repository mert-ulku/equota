import axios from 'axios';

const baseInstance = axios.create({ 
  baseURL: 'https://api2.binance.com/api/v3'
})

export default baseInstance;