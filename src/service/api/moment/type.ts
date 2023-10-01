export interface GetMomentListParams {
  timestamp: string;
  size: number;
}

export interface GetMomentInfoRes {
  id: number;
  content: string;
  pictures: string[];
  createAt: string;
  updateAt: string;
}
