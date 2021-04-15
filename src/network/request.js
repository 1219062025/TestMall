import axios from 'axios';
export function request(config) {
  const axiosInstance = axios.create({
    baseURL: "",
    timeout: 5000
  })
  return axiosInstance(config)
}