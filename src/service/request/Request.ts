// ts封装axios load + msg
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { ElMessage, ElLoading } from "element-plus";
import { RequestAxiosConfig, RequestInterceptors } from "./type";

const DEFAULT_LOADING: boolean = false;
const DEFAULT_SHOW_MESSAGE: boolean = false;

class Request {
  private instance: AxiosInstance;
  private interceptors?: RequestInterceptors;
  private showLoading: boolean;
  private showMsg: boolean;
  private loadingInstance: any;

  constructor(config: RequestAxiosConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading || DEFAULT_LOADING;
    this.showMsg = config.showMsg || DEFAULT_SHOW_MESSAGE;

    // config取出拦截器并添加
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor as any,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 添加全局拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        
        if (this.showLoading) {
          this.loadingInstance = ElLoading.service({
            lock: true,
            text: "loading……",
            background: "rgba(0, 0, 0, 0.5)",
          });
        }
        return config;
      },
      (error: Error) => {
        return error;
      }
    );

    this.instance.interceptors.response.use(
      (res: any) => {
        setTimeout(() => {
          this.loadingInstance?.close();

          if (this.showMsg && !res.code) {
            ElMessage.success(res.message);
          }
        }, 300);
        return res;
      },
      (error: Error) => {
        setTimeout(() => {
          this.loadingInstance?.close();
          ElMessage.error(error);
        }, 500);
        return error;
      }
    );
  }

  request<T>(config: RequestAxiosConfig<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      // 接口的请求拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      // 是否有开启load
      if (typeof config.showLoading === "boolean") {
        this.showLoading = config.showLoading;
      }
      // 是否开启msg
      if (typeof config.showMsg === "boolean") {
        this.showMsg = config.showMsg;
      }
      this.instance
        ?.request<any, T>(config)
        .then((res) => {
          // 接口的响应拦截器
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          this.showLoading = DEFAULT_LOADING;
          resolve(res);
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING;
          reject(err);
        });
    });
  }

  get<T = any>(config: RequestAxiosConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }
  post<T = any>(config: RequestAxiosConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }
  delete<T = any>(config: RequestAxiosConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }
  put<T = any>(config: RequestAxiosConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PUT" });
  }
}

export default Request