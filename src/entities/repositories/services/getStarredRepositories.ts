export const KEY = 'starred';

const getStarredRepositories = (): Set<number> => {
	const raw = localStorage.getItem(KEY);
	let items = [];
	if (raw) {
		items = JSON.parse(raw);
	}

	return new Set(items);
}

export default getStarredRepositories;
