import { pageArticle, countArticle } from '~/server/db/article.js'
export default defineEventHandler(async (event) => {
  const { page } = event.context.params

  const data = await pageArticle(page, 10)
  const total = await countArticle()

  return {
    data,
    total,
  }
})
