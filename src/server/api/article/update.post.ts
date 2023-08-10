import { updateArticle } from "~/server/db/article";
import { R } from "~/composables/useResult";
import useServerAuth from "~/composables/useServerAuth";

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

  const { id, title, content, abstract, cover } = await readBody(event);

  if (!title || !content || !abstract) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "参数错误",
      }),
    );
  }

  await updateArticle(id, {
    title,
    content,
    abstract,
    cover,
  });

  return R.ok(true);
});
