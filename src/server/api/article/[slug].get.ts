import { getArticleBySlug, incrementArticleViewBySlug } from "~/server/db/article";
import { R } from "~/composables/useResult";

export default defineEventHandler(async (event) => {
  const { slug } = event.context.params!;

  const article = await getArticleBySlug(slug);

  if (article) {
    await incrementArticleViewBySlug(article.slug);
  }

  return R.ok(article);
});
