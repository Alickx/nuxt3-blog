import { searchArticle } from "~/server/db/article";
import { R } from "~/composables/useResult";

export default defineEventHandler(async (event) => {
  const { keyword } = getQuery(event);

  let articles = await searchArticle(keyword as string);

  return R.ok(articles);

});
