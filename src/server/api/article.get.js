import { pageArticle, countArticle } from '~/server/db/article.js';
import { R } from '~/composables/useResult';

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const { page, size } = query;

	const total = await countArticle();

	if (total == 0) {
		return R.ok({
			records: [],
			total,
		});
	}
	const records = await pageArticle(page, Number(size));

	return R.ok({
		records,
		total,
	});
});
