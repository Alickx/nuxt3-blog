import { listArticle } from "~/server/db/article";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
export default defineEventHandler(async () => {
  dayjs.extend(utc);
  const articles = await listArticle();
  return articles.map((article) => ({
    loc: `/article/${article.id}`,
    lastmod: dayjs(article.updatedAt).utc().add(8, "hour"),
    changefreq: "daily",
    priority: 0.8,
  }));
});
