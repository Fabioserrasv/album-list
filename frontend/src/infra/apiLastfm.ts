import axios from "axios";
import { API_LASTFM_URL } from "../config/env";

const ONE_SECOND = 1000
const ONE_MINUTE = ONE_SECOND * 60;

export const apiLastFm = axios.create({
    baseURL: API_LASTFM_URL,
    timeout: ONE_MINUTE
});
