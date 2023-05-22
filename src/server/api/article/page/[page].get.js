import { pageArticle, countArticle } from '~/server/db/article.js'
export default defineEventHandler(async (event) => {
  const { page } = event.context.params

  const articles = await pageArticle(page, 10)

  const count = await countArticle()

  return {
    articles,
    count,
  }
})
