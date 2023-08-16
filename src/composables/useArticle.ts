import { ArticleInfo, SimpleArticle } from "~/types";

export default () => {
  const getArticle = async (
    articleId: string,
  ): Promise<Result<ArticleInfo>> => {
    return await $fetch(`/api/article/${articleId}`, {
      method: "GET",
    });
  };

  const pageArticle = async (
    page: number,
    size: number,
  ): Promise<PageResult<SimpleArticle>> => {
    return await $fetch("/api/article/page", {
      method: "GET",
      params: {
        page,
        size,
      },
    });
  };

  const createArticle = async (
    article: ArticleInfo,
  ): Promise<Result<boolean>> => {
    return await $fetch(`/api/article/create`, {
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

  const updateArticle = async (
    article: ArticleInfo,
  ): Promise<Result<boolean>> => {
    return await $fetch(`/api/article/update`, {
      method: "POST",
      body: JSON.stringify(article),
    });
  };

  const listArticle = async (): Promise<Result<ArticleInfo[]>> => {
    return await $fetch(`/api/article/list`, {
      method: "GET",
    });
  };

  const searchArticle = async (
    keyword: string,
  ): Promise<Result<ArticleInfo[]>> => {
    return await $fetch(`/api/article/search`, {
      method: "GET",
      params: {
        keyword,
      },
    });
  };

  return {
    getArticle,
    pageArticle,
    createArticle,
    deleteArticle,
    updateArticle,
    listArticle,
    searchArticle,
  };
};
