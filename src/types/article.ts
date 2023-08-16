export interface ArticleInfo {
  id?: string;
  title: string;
  content: string;
  viewCount?: number;
  wordCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface SimpleArticle {
  id: string;
  title: string;
  viewCount: number;
  wordCount: number;
  createdAt: string;
  updatedAt: string;
}
