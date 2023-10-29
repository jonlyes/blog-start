import request from "@/service/";
import { ResData } from "@/service/type";
import {
  GetArticleListParams,
  GetArticleInfoRes,
  updateArticleData,
  createArticleDate,
} from "./type";

export const getArticleList = (params: GetArticleListParams) => {
  return request.get<
    ResData<Omit<Omit<GetArticleInfoRes, "content">, "imgList">[]> & {
      counts: number;
    }
  >({
    url: "/article",
    params,
    showLoading: true,
  });
};

export const getArticleDetail = (articleId: number) => {
  return request.get<ResData<GetArticleInfoRes>>({
    url: `/article/${articleId}`,
    showLoading: true,
  });
};

export const updateArticle = (data: updateArticleData, articleId: string) => {
  return request.put<ResData<null>>({
    url: `/article/${articleId}`,
    showLoading: true,
    data,
  });
};

export const createArticle = (data: createArticleDate) => {
  return request.post<ResData<{ insertId: number }>>({
    url: "/article",
    showLoading: true,
    data,
  });
};

export const deleteArticle = (articleId: string) => {
  return request.delete<ResData<null>>({
    url: `/article/${articleId}`,
    showLoading: true,
  });
};
