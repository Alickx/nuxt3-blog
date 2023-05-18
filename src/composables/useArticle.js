export default () => {

  const getArticle = (articleId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`/api/article/${articleId}`)
        resolve(response.json())
      } catch (error) {
        reject(error)
      }
    })
  }


  const pageArticle = (page) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`/api/article/page/${page}`)
        resolve(response.json())
      } catch (error) {
        reject(error)
      }
    })
  }


  return {
    getArticle,
    pageArticle,
  }
}
