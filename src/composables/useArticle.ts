import { article } from "@prisma/client"

export default () => {

  const getArticle = (articleId: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await $fetch(`/api/article/${articleId}`, {
          method: 'GET'
        })
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }

  const pageArticle = (page: number) => {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await $fetch(`/api/article/page/${page}`, {
          method: 'GET'
        })
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }

  const createArticle = (article: article) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await $fetch(`/api/article`, {
          method: 'POST',
          body: JSON.stringify(article)
        })
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }

  const deleteArticle = (articleId: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await $fetch(`/api/article/${articleId}`, {
          method: 'DELETE'
        })
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }


  return {
    getArticle,
    pageArticle,
    createArticle
  }

}
