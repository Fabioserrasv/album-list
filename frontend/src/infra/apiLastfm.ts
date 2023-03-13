import axios from "axios";
import { API_LASTFM_URL } from "../config/env";

export const apiLastFm = axios.create({
    baseURL: API_LASTFM_URL,
    timeout: 10000
});
