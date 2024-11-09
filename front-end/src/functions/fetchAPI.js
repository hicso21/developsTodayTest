import axios from 'axios';
import APIUrl from '../constants/APIUrl';

const fetchAPI = axios.create({
    baseURL: APIUrl
})

export default fetchAPI;