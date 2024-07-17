import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import styled from 'styled-components';
import { fetchIssuesList } from '../../../store/reducers/ActionCreator';
import { getWeek } from '../../../utils/functions';
import { IIssue } from '../../../models/IIssue';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { Bar, Pie } from 'react-chartjs-2';

export function TasksTab() {
	const [week, setWeek] = useState(8);
	const dispatch = useAppDispatch();
	const { issuesList } = useAppSelector((state) => state.issuesReducer);
	const weekInputRef = useRef<HTMLInputElement>(null);

	const cachedGraphData = useMemo(() => {
		// контейнер для данных по неделям
		const data: Record<number, IIssue[]> = {};

		// вычисляем сегодняшнюю рабочую неделю
		const prevWeek = getWeek(Date.now()) - 1;

		issuesList
			.filter((issue) => issue.status === 'Done')
			.filter(
				// отфильтровываем заказы, выполненные раньше указанной недели
				(issue) => prevWeek - getWeek(issue.date_finished!) <= week - 1
			)
			.forEach((issue) => {
				// собираем данные по неделям
				const week = getWeek(issue.date_finished!);
				if (!data[week]) {
					data[week] = [];
				}
				data[getWeek(issue.date_finished!)].push(issue);
			});

		// ключи контейнера с данными по неделям
		const keys = Object.keys(data);

		// вычисляем сумму для кажного параметра по неделе
		const sum = keys.map((key) => {
			const arr = data[Number(key)];
			const arrLen = arr.length;
			const sum = {
				income: 0,
				expenses: 0,
				profit: 0,
			};
			for (let i = 0; i < arrLen; ++i) {
				sum.income += arr[i].received_from_client;
				sum.expenses +=
					arr[i].send_to_account_manager +
					arr[i].send_to_designer +
					arr[i].send_to_project_manager;
				sum.profit = sum.income - sum.expenses;
			}

			return sum;
		});

		// формируем данные для графика
		const graphData = {
			labels: keys,
			datasets: [
				{
					label: 'Доходы',
					data: sum.map((data) => data.income),
					borderColor: '#0000fc',
					backgroundColor: '#0000fc',
					fill: true,
				},
				{
					label: 'Расходы',
					data: sum.map((data) => data.expenses),
					borderColor: '#fc0000',
					backgroundColor: '#fc0000',
					fill: true,
				},
				{
					label: 'Прибыль',
					data: sum.map((data) => data.profit),
					borderColor: '#00fc00',
					backgroundColor: '#00fc00',
					fill: true,
				},
			],
		};

		return graphData;
	}, [issuesList]);

	const cachedPiedata = useMemo(() => {
		// формируем данные для графика
		const pieData = {
			labels: ['Выполнены', 'В процессе', 'Новые'],
			datasets: [
				{
					label: 'Соотношение выполненых, в процессе и новых',
					data: [
						issuesList.filter((issue) => issue.status === 'Done').length,
						issuesList.filter((issue) => issue.status === 'In Progress').length,
						issuesList.filter((issue) => issue.status === 'New').length,
					],
					borderColor: '#0000fc',
					backgroundColor: ['#00fc00', '#0000fc', '#fc0000'],
					hoverBackgroundColor: ['#175000', '#003350', '#993d00'],
				},
			],
		};

		return pieData;
	}, [issuesList]);

	useEffect(() => {
		dispatch(fetchIssuesList({}));
	}, [week]);

	function handleWeekChange(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setWeek(Number(weekInputRef.current?.value));
	}

	return (
		<TabContainer>
			<WeekForm onSubmit={handleWeekChange}>
				<WeekInput
					ref={weekInputRef}
					type='text'
					placeholder={week.toString()}
				/>
				<p>{`/ ${getWeek(Date.now())}`}</p>
				<WeekButton type='submit'>Подтвердить</WeekButton>
			</WeekForm>
			<GraphWrap>
				<h2>Финансы, прошлый месяц</h2>
				<Bar data={cachedGraphData} />
			</GraphWrap>
			<GraphWrap>
				<h2>Финансы, прошлый месяц</h2>
				<Pie data={cachedPiedata} />
			</GraphWrap>
		</TabContainer>
	);
}

const TabContainer = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 75px;
	width: 100%;
	min-height: 100%;
`;

const GraphWrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	max-height: 50vh;
`;

const WeekForm = styled.form`
	display: flex;
	align-items: center;
	gap: 10px;
`;

const WeekInput = styled.input`
	max-width: 40px;
`;

const WeekButton = styled.button`
	color: var(--text-accent-color);
`;
