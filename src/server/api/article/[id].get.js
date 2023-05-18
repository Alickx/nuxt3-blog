import { getArticle } from '../../db/article.js';


export default defineEventHandler(async (event) => {

  const { id } = event.context.params;

  const article = await getArticle(id);

  return article;

})
