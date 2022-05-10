import { IRepoItem, IRepoItemDTO } from './models';

export const mapRepoItemDTOtoRepoItem = (source: IRepoItemDTO): IRepoItem => ({
	id: source.id,
	name: source.name,
	description: source.description,
	stars: source.stargazers_count,
	url: source.html_url
});
