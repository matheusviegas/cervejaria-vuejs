import axios from 'axios'
import store from '@/store/cart.js';

export default axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + store.getters.token
  }
})