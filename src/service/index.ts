import { AxiosResponse } from "axios";
import Request from "./request/Request";
import { baseURL } from "./request/config";
import { RequestAxiosConfig } from "./request/type";

export default new Request({
  baseURL,
  timeout: 3000,
  interceptors: {
    requestInterceptor: (config: RequestAxiosConfig) => {
      return config;
    },
    requestInterceptorCatch: (error: Error) => {
      return error;
    },
    responseInterceptor: (response: AxiosResponse) => {
      return response.data;
    },
    responseInterceptorCatch: (error: Error) => {
      return error;
    },
  },
});
