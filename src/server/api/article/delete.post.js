import { deleteArticle } from '~/server/db/article';
import { R } from '~/composables/useResult';

export default defineEventHandler(async (event) => {
	const { articleId } = await readBody(event);

	if (!articleId) {
		return sendError(
			event,
			createError({
				statusCode: 400,
				statusMessage: '文章id参数错误',
			})
		);
	}

	await deleteArticle(articleId);

	return R.ok(true);
});
