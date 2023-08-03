import { prisma } from './prisma.js'

export const getArticle = async (id) => {
  const article = await prisma.article.findUnique({
    where: {
      id,
    },
  })
  return article
}

export const pageArticle = async (page, size) => {
  const articles = await prisma.article.findMany({
    skip: (page - 1) * size,
    take: size,
    select: {
      id: true,
      title: true,
      abstract: true,
      cover: true,
      createdAt: true,
      updatedAt: true
    },
    orderBy: {
      createdAt: 'desc',
    }
  })
  return articles
}

export const createArticle = async (article) => {
  const newArticle = await prisma.article.create({
    data: article,
  })
  return newArticle
}

export const updateArticle = async (id, article) => {
  const updatedArticle = await prisma.article.update({
    where: {
      id,
    },
    data: article,
  })
  return updatedArticle
}

export const deleteArticle = async (id) => {
  const deletedArticle = await prisma.article.delete({
    where: {
      id,
    },
  })
  return deletedArticle
}

export const countArticle = async () => {
  const count = await prisma.article.count()
  return count
}

export const listArticle = async () => {
  const articles = await prisma.article.findMany({
    select: {
      id: true,
      updatedAt: true
    },
    orderBy: {
      createdAt: 'desc',
    }
  })
  return articles
}
