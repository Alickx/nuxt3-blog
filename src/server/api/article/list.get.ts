import { R } from '~/composables/useResult';
import { listArticle } from '~/server/db/article'

export default defineEventHandler(async () => {
  const articles = await listArticle()
  return R.ok(articles)
})
