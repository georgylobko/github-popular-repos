import qs from 'query-string';

import { mapRepoItemDTOtoRepoItem } from '../map';
import { IGetRepositoriesResponseDTO, IRepoItem } from '../models';

interface IParams {
	q: string;
	sort: string;
	order: string;
}

const getRepositories = (params: IParams): Promise<Array<IRepoItem>> => {
	return fetch(`https://api.github.com/search/repositories?${qs.stringify(params)}`)
		.then(response => response.json())
		.then((response: IGetRepositoriesResponseDTO) => response.items.map(mapRepoItemDTOtoRepoItem))
}

export default getRepositories;
