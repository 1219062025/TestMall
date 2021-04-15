import axios from 'axios';
export function request(config) {
  const axiosInstance = axios.create({
    baseURL: "http://152.136.185.210:7878/api/m5",
    timeout: 5000
  })
  return axiosInstance(config)
}