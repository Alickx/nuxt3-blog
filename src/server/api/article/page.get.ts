import { pageArticle, countArticle } from '~/server/db/article.js';
import { R } from '~/composables/useResult';

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const { page, size } = query;

	const queryPage = Number(page);
	const querySize = Number(size);


	const total = await countArticle();

	if (total == 0) {
		return R.ok({
			records: [],
			total,
		});
	}

	const records = await pageArticle(queryPage, querySize);

	return R.ok({
		records,
		total,
	});
});
