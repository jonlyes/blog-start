interface ArticleListItem {
  id: number;
  title: string;
  cover: string;
  createAt: string;
  updateAt: string;
}

interface ArticleDetail {
  id: number;
  title: string;
  cover: string;
  content: string;
  createAt: string;
  updateAt: string;
  type: "public" | "private";
  imgList: string[];
}

export type { ArticleListItem ,ArticleDetail};
