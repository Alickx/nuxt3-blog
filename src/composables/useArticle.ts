export interface SimpleArticle {
  id: string;
  title: string;
  abstract: string;
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  id?: string;
  title: string;
  abstract: string;
  content?: string;
  cover?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default () => {
  const getArticle = async (articleId: string): Promise<Result<Article>> => {
    return await $fetch(`/api/article/${articleId}`, {
      method: "GET",
    });
  };

  const pageArticle = async (
    page: number,
    size: number,
  ): Promise<PageResult<SimpleArticle>> => {
    return await $fetch("/api/article", {
      method: "GET",
      params: {
        page,
        size,
      },
    });
  };

  const createArticle = async (article: Article): Promise<Result<boolean>> => {
    return await $fetch(`/api/article`, {
      method: "POST",
      body: JSON.stringify(article),
    });
  };

  const deleteArticle = async (articleId: string): Promise<Result<boolean>> => {
    return await $fetch(`/api/article/delete`, {
      method: "POST",
      body: JSON.stringify({ articleId }),
    });
  };

  const updateArticle = async (article: Article): Promise<Result<boolean>> => {
    return await $fetch(`/api/article/update`, {
      method: "POST",
      body: JSON.stringify(article),
    });
  };

  const listArticle = async (): Promise<Result<Article[]>> => {
    return await $fetch(`/api/article/list`, {
      method: "GET",
    });
  };

  return {
    getArticle,
    pageArticle,
    createArticle,
    deleteArticle,
    updateArticle,
    listArticle,
  };
};
