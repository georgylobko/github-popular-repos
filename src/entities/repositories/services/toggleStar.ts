import getStarredRepositories, { KEY } from './getStarredRepositories';

const toggleStar = (id: number) => {
	const starred = getStarredRepositories();
	if (starred.has(id)) {
		starred.delete(id);
	} else {
		starred.add(id);
	}

	localStorage.setItem(KEY, JSON.stringify(Array.from(starred)));
}

export default toggleStar;
