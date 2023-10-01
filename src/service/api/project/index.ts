import request from "@/service/";
import { GetProjectListParams } from "./type";
import { ResData } from "@/service/type";
import { GetProjectInfoRes } from "./type";

// 获取project列表
export const getProjectList = (params: GetProjectListParams) => {
  return request.get<
    ResData<GetProjectInfoRes[]> & {
      counts: number;
    }
  >({
    url: "/project",
    params,
  });
};
