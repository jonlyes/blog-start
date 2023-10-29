import request from "@/service/";
import { ResData } from "@/service/type";
import useAuthStore from "@/store/useAuthStore";
import { storeToRefs } from "pinia";

export const uploadImage = (format: FormData) => {
  return request.post<ResData<{ imgUrl: string }>>({
    url: "/file/uploadImg",
    data: format,
    interceptors: {
      // 接口请求拦截器
      requestInterceptor: (config) => {
        const authStore = useAuthStore();
        const { authToken } = storeToRefs(authStore);
        if (authToken.value !== "" && config.headers) {
          config.headers["Authorization"] = `Bearer ${authToken.value}`;
        }
        return config;
      },
    },
  });
};
