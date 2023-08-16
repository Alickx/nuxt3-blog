export interface ArticleInfo {
  id?: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SimpleArticle {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}
