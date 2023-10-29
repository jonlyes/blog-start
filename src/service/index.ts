import Request from "./request/Request";
import { baseURL } from "./request/config";
import useAuthStore from "@/store/useAuthStore";
import { storeToRefs } from "pinia";

export default new Request({
  baseURL,
  timeout: 3000,
  interceptors: {
    requestInterceptor: (config) => {
      const authStore = useAuthStore();
      const { authToken } = storeToRefs(authStore);

      if (authToken.value !== "" && config.headers) {
        config.headers["Authorization"] = `Bearer ${authToken.value}`;
      }

      return config;
    },
    requestInterceptorCatch: (error) => {
      return error;
    },
    responseInterceptor: (response) => {
      return response.data;
    },
    responseInterceptorCatch: (error) => {
      return error;
    },
  },
});
