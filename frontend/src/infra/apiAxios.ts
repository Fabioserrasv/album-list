import axios from "axios";
import { API_URL } from "../config/env";

export const apiAxios = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Content-Type': 'application/json',
     },
});
