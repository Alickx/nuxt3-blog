import { ArticleInfo } from "types";
import { prisma } from "./prisma";

export const getArticleBySlug = async (slug: string) => {
  return await prisma.article.findUnique({
    where: {
      slug,
    },
  });
};

export const pageArticle = async (page: number, size: number) => {
  return await prisma.article.findMany({
    skip: (page - 1) * size,
    take: size,
    select: {
      id: true,
      title: true,
      viewCount: true,
      wordCount: true,
      slug: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createArticle = async (article: ArticleInfo) => {
  return await prisma.article.create({
    data: article,
  });
};

export const updateArticle = async (id: string, article: ArticleInfo) => {
  return await prisma.article.update({
    where: {
      id,
    },
    data: article,
  });
};

export const deleteArticle = async (id: string) => {
  return await prisma.article.delete({
    where: {
      id,
    },
  });
};

export const countArticle = async () => {
  return await prisma.article.count();
};

export const listArticle = async () => {
  return await prisma.article.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const searchArticle = async (keyword: string) => {
  return await prisma.article.findMany({
    where: {
      OR: [
        {
          title: {
            contains: keyword,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: keyword,
            mode: "insensitive",
          },
        },
      ],
    },
    select: {
      id: true,
      title: true,
      slug: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const incrementArticleView = async (id: string) => {
  return await prisma.article.update({
    where: {
      id,
    },
    data: {
      viewCount: {
        increment: 1,
      },
    },
  });
};
