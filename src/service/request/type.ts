import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface RequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: Error) => any;
  responseInterceptor?: (response: T) => T;
  responseInterceptorCatch?: (error: Error) => any;
}

export interface RequestAxiosConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>;
  showLoading?: boolean;
  showMsg?: boolean;
}
