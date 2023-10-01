import request from "@/service/";
import { ResData } from "@/service/type";
import { GetMomentListParams,
    GetMomentInfoRes, } from "./type";

export const getMomentList = (params: GetMomentListParams) => {
  return request.get<
    ResData<GetMomentInfoRes[]> & {
      counts: number;
    }
  >({
    url: "/moment",
    params,
    showLoading: true,
  });
};

