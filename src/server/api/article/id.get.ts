import { getArticleById } from "~/server/db/article";
import { R } from "~/composables/useResult";

export default defineEventHandler(async (event) => {

  const { id } = getQuery(event);

  const article = await getArticleById(id as string);

  return R.ok(article);

});
