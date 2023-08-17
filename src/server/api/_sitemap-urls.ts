import { listArticle } from "~/server/db/article";
export default defineEventHandler(async () => {
  const articles = await listArticle();
  return articles.map((article) => ({
    loc: `/article/${article.slug}`,
    lastmod: article.updatedAt,
    changefreq: "daily",
    priority: 0.8,
  }));
});
