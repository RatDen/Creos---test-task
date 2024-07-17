import { useState } from 'react';
import { Header } from '../header';
import { Main } from '../main';
import { Theme, ThemeSwitcher } from '../theme-switcher';
import { Menu } from '../menu';

import { themes } from '../../constants';
import { DesignersTab, MainTab, TasksTab } from '../tabs';
import { getWeek } from '../../utils/functions';
import styled from 'styled-components';

const root = document.getElementById('root') as HTMLDivElement;

enum Tabs {
	main,
	tasks,
	designers,
}

export function App() {
	const [theme, setTheme] = useState<Theme>(themes[0]);
	const [tab, setTab] = useState<Tabs>(Tabs.main);

	function handleThemeSwitch(id: string) {
		const theme = themes.find((theme) => theme.id === id);

		if (theme) {
			setTheme(theme);
			root.setAttribute('data-theme', theme.id);
		}
	}

	function handleChangeTab(tab: Tabs) {
		setTab(tab);
	}

	return (
		<>
			<Header>
				<div>
					<Menu>
						<button
							disabled={tab === Tabs.main}
							onClick={() => {
								handleChangeTab(Tabs.main);
							}}>
							Главная
						</button>
						<button
							disabled={tab === Tabs.tasks}
							onClick={() => {
								handleChangeTab(Tabs.tasks);
							}}>
							Задачи
						</button>
						<button
							disabled={tab === Tabs.designers}
							onClick={() => {
								handleChangeTab(Tabs.designers);
							}}>
							Дизайнеры
						</button>
					</Menu>
				</div>
				<HeaderItemWrap>
					<p>{`Неделя ${getWeek(Date.now())}`}</p>
					<ThemeSwitcher
						themes={themes}
						active={theme}
						setThemeCallback={handleThemeSwitch}
					/>
				</HeaderItemWrap>
			</Header>
			<Main>
				{tab === Tabs.main ? <MainTab></MainTab> : ''}
				{tab === Tabs.tasks ? <TasksTab></TasksTab> : ''}
				{tab === Tabs.designers ? <DesignersTab></DesignersTab> : ''}
			</Main>
		</>
	);
}

const HeaderItemWrap = styled.div`
	display: flex;
	align-items: center;
	gap: 15px;
`;
