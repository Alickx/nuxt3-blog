import { createArticle } from "~/server/db/article";
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

  const { ...articleData } = await readBody(event);

  await createArticle({ ...articleData });

  return R.ok(true);
});
