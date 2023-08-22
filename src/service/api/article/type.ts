export interface GetArticleListParams {
  page: number;
  size: number;
}

type ArticleType = "public" | "private";

export interface GetArticleInfoRes {
  id: number;
  title: string;
  content: string;
  cover: string;
  imgList: string[];
  type: ArticleType;
  createAt: string;
  updateAt: string;
}
