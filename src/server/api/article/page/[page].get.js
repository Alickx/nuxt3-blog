import { pageArticle, countArticle } from '~/server/db/article.js'
export default defineEventHandler(async (event) => {
  const { page } = event.context.params

  const article = await pageArticle(page, 10)

  const count = await countArticle()

  return {
    article,
    count,
  }
})
