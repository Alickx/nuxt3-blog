import { deleteArticle } from "~/server/db/article";
import { R } from "~/composables/useResult";

export default defineEventHandler(async (event) => {
  const { auth } = useServerAuth();
  if (!auth(event)) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "未登录",
      }),
    );
  }

  const { articleId } = await readBody(event);

  if (!articleId) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "文章id参数错误",
      }),
    );
  }

  await deleteArticle(articleId);

  return R.ok(true);
});
