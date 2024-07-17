import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchDesignersList } from '../../../store/reducers/ActionCreator';
import ReactPaginate from 'react-paginate';
import Select, { SingleValue } from 'react-select';

type TOrderingOption = {
	label: string;
	value: 'username' | 'email' | null;
};

const orderingOptions: TOrderingOption[] = [
	{ label: 'без опций', value: null },
	{ label: 'имя', value: 'username' },
	{ label: 'email', value: 'email' },
];

export function DesignersTab() {
	const dispatch = useAppDispatch();
	const { isLoading, designersList, error } = useAppSelector(
		(state) => state.designersReducer
	);
	const designers = designersList.results;

	const designersCount = 16;

	function handlePageChange(selectedItem: { selected: number }) {
		dispatch(
			fetchDesignersList({
				page: selectedItem.selected + 1, // В пагинаторе отсчет от 0
				limit: designersCount,
			})
		);
	}

	function handleOrderingChange(option: SingleValue<TOrderingOption>) {
		dispatch(
			fetchDesignersList({
				ordering: option?.value,
				page: 1,
				limit: designersCount,
			})
		);
	}

	return (
		<TabContainer>
			{isLoading && <h2>Идет загрузка...</h2>}
			{error && <h2>{error}</h2>}
			<SearchWrap>
				<ReactPaginate
					className='paginator'
					pageCount={Math.floor(designersList.count / designersCount)}
					initialPage={0}
					pageRangeDisplayed={5}
					onPageChange={handlePageChange}
				/>
				<Select
					options={orderingOptions}
					onChange={handleOrderingChange}
					placeholder='Сортировка'
				/>
			</SearchWrap>
			{!isLoading && (
				<Table>
					<thead>
						<tr>
							<Th>Дизайнер</Th>
							<Th>Работы</Th>
						</tr>
					</thead>
					<tbody>
						{designers.map((designer, idx) => (
							<tr key={idx}>
								<Td>
									<DesignerImage src={designer.avatar} />
									<Text>{designer.username}</Text>
									<Text>{designer.email}</Text>
								</Td>
								<Td>
									<Text>{`Закрыто задач: ${
										designer.issues.filter((issue) => issue.status === 'Done')
											.length
									}`}</Text>
									<Text>{`В процессе задач: ${
										designer.issues.filter(
											(issue) => issue.status === 'In Progress'
										).length
									}`}</Text>
								</Td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</TabContainer>
	);
}

const TabContainer = styled.section`
	width: 100%;
	min-height: 100%;
`;

const Table = styled.table`
	border-collapse: collapse;
`;

const Th = styled.th`
	font-size: 35px;
`;

const Td = styled.td`
	padding: 20px;
	border: 2px solid var(--accent-color);
`;

const DesignerImage = styled.img``;

const Text = styled.p``;

const SearchWrap = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 30px;
`;
