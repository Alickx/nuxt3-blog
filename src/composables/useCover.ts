export default () => {
	interface CoverResult {
		imgurl: string;
		info: Object;
		success: boolean;
	}

	const coverApi = 'https://api.vvhan.com/api/acgimg?type=json';

	const getCover = async (): Promise<CoverResult> => {
		return await $fetch(coverApi, {
			method: 'GET',
		});
	};

	return {
		getCover,
	};
};
