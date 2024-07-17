import { useEffect, useRef } from 'react';
import styled from 'styled-components';

export interface Theme {
	id: string;
}

type TThemeSwitcherProps = {
	themes: Theme[];
	active: Theme;
	setThemeCallback: (id: string) => void;
};

export function ThemeSwitcher({
	themes,
	active,
	setThemeCallback,
}: TThemeSwitcherProps) {
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		containerRef.current?.addEventListener('click', (e: MouseEvent) => {
			const button = e.target as HTMLDivElement;
			const themeId = button.dataset['id'];
			if (themeId) {
				setThemeCallback(themeId);
			}
		});
	}, []);

	return (
		<SwitcherContainer ref={containerRef}>
			{themes.map((theme) => (
				<ThemeButton
					key={theme.id}
					data-id={theme.id}
					disabled={theme.id === active.id}>
					{theme.id}
				</ThemeButton>
			))}
		</SwitcherContainer>
	);
}

const SwitcherContainer = styled.div``;

const ThemeButton = styled.button`
	padding: 5px 10px;
	border: 2px solid var(--accent-color, black);
	background-color: var(--button-bg-color, white);

	&:first-child {
		border-top-left-radius: 20px;
		border-bottom-left-radius: 20px;
	}

	&:last-child {
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
	}

	&:hover {
		text-decoration: underline;
	}

	&:disabled {
		pointer-events: none;
		color: var(--text-accent-color, white);
		background-color: var(--button-active-bg-color, black);
	}
`;
