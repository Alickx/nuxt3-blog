import {article} from "@prisma/client"

export default () => {

  const getArticle = (articleId: string) => {
    return $fetch(`/api/article/${articleId}`,{
      method: 'GET',
    })
  }

  const pageArticle = (page: number, size: number) => {
    return $fetch('/api/article' ,{
      method: 'GET',
      params: {
        page,
        size
      }
    });
  }

  const createArticle = (article: article) => {
    return $fetch(`/api/article`, {
      method: 'POST',
      body: JSON.stringify(article)
    });
  }


  return {
    getArticle,
    pageArticle,
    createArticle
  }

}
