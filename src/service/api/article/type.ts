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
  type: ArticleType;
  createAt: string;
  updateAt: string;
}

export interface updateArticleData {
  title: string;
  content: string;
  type: ArticleType;
}

export interface createArticleDate {
  title: string;
  content: string;
  type: ArticleType;
}
