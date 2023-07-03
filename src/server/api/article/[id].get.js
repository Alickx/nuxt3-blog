import { getArticle } from '~/server/db/article';
import {R} from "~/composables/useResult";

export default defineEventHandler(async (event) => {

  const { id } = event.context.params;

  const article = await getArticle(id);

  return R.ok(article);

})
