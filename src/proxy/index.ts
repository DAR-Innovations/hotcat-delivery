import axios from "axios";
import Cookies from "js-cookie";

export const API_URL = "http://localhost:8080/api/v1";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use(config => {
  const accessToken = Cookies.get("accessToken");
  config.headers!.Authorization = `Bearer ${accessToken}`;
  return config;
});

export default $api;
