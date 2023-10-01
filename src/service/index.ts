import Request from "./request/Request";
import { baseURL } from "./request/config";
import { useAuthStore } from "@/store/useAuthStore";

export default new Request({
  baseURL,
  timeout: 3000,
  interceptors: {
    requestInterceptor: (config) => {
      const authStore = useAuthStore();

      if (authStore.authToken !== "" && config.headers) {
        config.headers["Authorization"] = `Bearer ${authStore.authToken}`;
        config.headers["Content-Type"] = "application/json";
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
