import styled from 'styled-components';

type THeaderProps = {
	children: React.ReactNode;
};

export function Header({ children }: THeaderProps) {
	return <HeaderContainer>{children}</HeaderContainer>;
}

const HeaderContainer = styled.header`
	position: fixed;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: 10px;
	width: 100%;
	padding: 20px 15px;
	background-color: var(--primary-color);
	border-bottom-left-radius: 17px;
	border-bottom-right-radius: 17px;
	box-shadow: 0 0 13px 1px var(--accent-color);
`;
