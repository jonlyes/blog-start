export interface GetProjectListParams {
  page: number;
  size: number;
}

export interface GetProjectInfoRes {
  id: number;
  link: string;
  title: string;
  description: string;
  cover: string;
  createAt: string;
  updateAt: string;
}
