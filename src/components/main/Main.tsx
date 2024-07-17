import styled from 'styled-components';

type TMainProps = {
	children: React.ReactNode;
};

export function Main({ children }: TMainProps) {
	return <MainContainer>{children}</MainContainer>;
}

const MainContainer = styled.main`
	padding: 120px 30px;
	min-height: 100vh;
	background-color: var(--secondary-color);

	@media (width <= ${'768px'}) {
		padding: 150px 30px;
	}
`;
