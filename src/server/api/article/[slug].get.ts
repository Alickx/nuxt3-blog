import { getArticleBySlug, incrementArticleView } from "~/server/db/article";
import { R } from "~/composables/useResult";

export default defineEventHandler(async (event) => {
  const { slug } = event.context.params!;

  const article = await getArticleBySlug(slug);

  if (article) {
    await incrementArticleView(article.id);
  }

  return R.ok(article);
});
