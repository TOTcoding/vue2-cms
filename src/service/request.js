import axios from "axios";

import localCache from "@/utils/cache";

export function request(config) {
  const instance = axios.create({
    timeout: 5000,
    baseURL: "/api",
    // interceptors: {
    //   requestInterceptor: (config) => {
    //     const token = localCache.getCache('token');
    //     console.log(token);
    //     if(token) {
    //       config.headers.Authorization = `Bearer ${token}`
    //     }
    //   }
    // }
    // baseURL: '/api'
  });

  instance.interceptors.request.use((config) => {
    const token = localCache.getCache("token");
    if (token) {
      config.headers.Authorization = token
    }
    return config
  });
  instance.interceptors.response.use((res) => {
    return res.data
  });

  return instance(config);
}
