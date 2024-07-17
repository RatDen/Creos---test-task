import styled from 'styled-components';

type TMenuProps = {
	children: React.ReactNode | React.ReactNode[];
};

export function Menu({ children }: TMenuProps) {
	return <MenuContainer>{children}</MenuContainer>;
}

const MenuContainer = styled.nav`
	display: flex;
	gap: 20px;
	text-underline-offset: 5px;

	& button {
		border-color: transparent;
		background-color: transparent;

		&:hover {
			text-decoration: underline;
		}

		&:disabled {
			pointer-events: none;
			text-decoration: underline;
			color: var(--accent-color);
		}
	}
`;
