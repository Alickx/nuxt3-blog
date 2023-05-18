import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler((event) => {
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

  const article = prisma.article.create({
    data: {
      title,
      content,
      abstract,
      cover,
    },
  })

  return article
})
