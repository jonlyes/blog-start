import request from "@/service/";
import { ResData } from "@/service/type";
import { GetArticleListParams, GetArticleInfoRes } from "./type";

export const getArticleList = (params: GetArticleListParams) => {
  return request.get<
    ResData<Omit<Omit<GetArticleInfoRes, "content">, "imgList">[]>
  >({
    url: "/article",
    params,
    showLoading: true,
  });
};

export const getArticleDetails = (articleId: number) => {
  return request.get<ResData<GetArticleInfoRes>>({
    url: `/article/${articleId}`,
    showLoading: true,
  });
};
