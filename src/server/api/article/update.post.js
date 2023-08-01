import { updateArticle } from '~/server/db/article';
import { R } from '~/composables/useResult';

export default defineEventHandler(async (event) => {
	const { id, title, content, abstract, cover } = await readBody(event);

	if (!title || !content || !abstract) {
		return sendError(
			event,
			createError({
				statusCode: 400,
				statusMessage: '参数错误',
			})
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
