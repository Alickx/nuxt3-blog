import {createArticle} from "~/server/db/article";
import {R} from "~/composables/useResult";

export default defineEventHandler( async (event) => {
  const { title, content, abstract, cover } = event.body

  if (!title || !content || !abstract || !cover) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: '参数错误',
      })
    )
  }

  await createArticle({
    title,
    content,
    abstract,
    cover,
  })

  return R.ok()
})
