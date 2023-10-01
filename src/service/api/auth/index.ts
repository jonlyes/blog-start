import request from "@/service/";
import { ResData } from "@/service/type";
import { LoginParams, LoginRes } from "./type";

// 登录
export const login = (data: LoginParams) => {
  return request.post<ResData<LoginRes>>({
    url: "/auth/login",
    data,
    showLoading: true,
    showMsg: true,
  });
};
