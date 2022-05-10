import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import getRepositoriesService from '../entities/repositories/services/getRepositories';
import { IRepoItem } from '../entities/repositories/models';
import toggleStarService from '../entities/repositories/services/toggleStar';
import getStarredRepositoriesService from '../entities/repositories/services/getStarredRepositories';

import { ReactComponent as StarSvg } from './assets/star.svg';
import styles from './RepositoriesList.module.css';

const TABS = [
	{ value: 'all', label: 'All' },
	{ value: 'starred', label: 'Starred' }
];

const LANGUAGES = [
	{ value: '', label: 'All' },
	{ value: 'js', label: 'JavaScript' },
	{ value: 'golang', label: 'Go' },
	{ value: 'c', label: 'C' }
];

const RepositoriesList: React.FC = () => {
	const [list, setList] = useState<Array<IRepoItem>>([]);
	const [starred, setStarred] = useState(new Set());
	const [activeTab, setActiveTab] = useState('all');
	const [language, setLanguage] = useState('');

	useEffect(() => {
		getRepositoriesService({
			q: `created:>2017-01-10 language:${language}`,
			sort: 'stars',
			order: 'desc'
		}).then(setList);
		setStarred(getStarredRepositoriesService());
	}, [language]);

	const handleToggleStar = (id: number) => {
		toggleStarService(id);
		setStarred(getStarredRepositoriesService());
	}

	const handleChangeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setLanguage(event.target.value);
	}

	return (
		<div>
			<header className={styles.header}>
				Filters:
				<div className={styles.tabs}>
					{TABS.map((tab) => (
						<div
							key={tab.value}
							className={classNames(
								styles.tab,
								tab.value === activeTab && styles.activeTab
							)}
							onClick={() => setActiveTab(tab.value)}
						>
							{tab.label}
						</div>
					))}
				</div>
				Languages:
				<select
					className={styles.selectLanguage}
					onChange={handleChangeLanguage}
				>
					{LANGUAGES.map((language) => (
						<option
							key={language.value}
							value={language.value}
						>
							{language.label}
						</option>
					))}
				</select>
			</header>
			{list
				.filter((item) => activeTab === 'all' || starred.has(item.id))
				.map((repository) => (
				<div
					key={repository.id}
					className={styles.item}
				>
					<header className={styles.itemHeader}>
						<h3 className={styles.itemTitle}>{repository.name}</h3>
						<div className={styles.starBlock}>
							<StarSvg
								className={classNames(
									styles.starIcon,
									starred.has(repository.id) && styles.starred
								)}
								onClick={() => handleToggleStar(repository.id)}
							/>
							Star {repository.stars}
						</div>
					</header>
					<p>{repository.description}</p>
					<a href={repository.url} target='_blank'>
						Open the repository
					</a>
				</div>
			))}
		</div>
	)
}

export default RepositoriesList;
