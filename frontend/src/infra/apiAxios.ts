import axios from "axios";
import { API_URL } from "../config/env";

export const apiAxios = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFToken",
    withCredentials: true,
});