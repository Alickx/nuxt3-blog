import {article} from "@prisma/client"

export default () => {

  const getArticle = (articleId: string) => {
    return $fetch(`/api/article/${articleId}`,{
      method: 'GET',
    })
  }

  const pageArticle = async (page: number) => {
    return $fetch(`/api/article/page/${page}`,{
      method: 'GET',
    });
  }

  const createArticle = (article: article) => {
    return $fetch(`/api/article`, {
      method: 'POST',
      body: JSON.stringify(article)
    });
  }

  const deleteArticle = (articleId: string) => {
    return $fetch(`/api/article/${articleId}`,{
      method: 'DELETE'
    });
  }


  return {
    getArticle,
    pageArticle,
    createArticle
  }

}
