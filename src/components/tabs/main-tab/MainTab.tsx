import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import styled from 'styled-components';
import {
	fetchCommentsList,
	fetchDesignersList,
} from '../../../store/reducers/ActionCreator';

export function MainTab() {
	const dispatch = useAppDispatch();
	const { commentsList } = useAppSelector((state) => state.commentsReducer);
	const { designersList } = useAppSelector((state) => state.designersReducer);

	const designersCache = useMemo(() => {
		const data = designersList.results
			.map((designer) => {
				const completedIssues = designer.issues.filter(
					(issue) => issue.status === 'Done'
				);

				return {
					designer: { ...designer },
					totalCompleted: completedIssues.length,
					medianTime: 0, // невозможно получить время
				};
			})
			.sort((a, b) => b.totalCompleted - a.totalCompleted)
			.slice(0, 10);

		return data;
	}, [designersList]);

	useEffect(() => {
		dispatch(fetchCommentsList({}));

		dispatch(
			// возвращает Done и In Progress (?)
			fetchDesignersList({
				status: 'Done',
				limit: 128,
			})
		);
	}, []);

	return (
		<TabContainer>
			<TabContainerItem>
				<h2>Последние комментарии</h2>
				{commentsList.slice(-10).map((comment, idx) => {
					const passedTime = new Date(
						Date.now() - Date.parse(comment.date_created)
					);
					return (
						<div key={idx}>
							<div>
								<img src={comment.designer.avatar} alt='Аватар дизайнера'></img>
								<p>{comment.designer.username}</p>
								<p>{`Опубликовано ${passedTime.getDay()} дней, ${passedTime.getHours()} часов, ${passedTime.getMinutes()} минут назад`}</p>
							</div>
							<div>
								<p>Задача: {comment.issue}</p>
								<p>Комментарий: {comment.message}</p>
							</div>
						</div>
					);
				})}
			</TabContainerItem>
			<TabContainerItem>
				<h2>Топ 10 дизайнеров</h2>
				{designersCache.map((item, idx) => {
					return (
						<div key={idx}>
							<div>
								<img src={item.designer.avatar} alt='Аватар дизайнера'></img>
								<p>{item.designer.username}</p>
							</div>
							<div>
								<p>Количество выполненных задач: {item.totalCompleted}</p>
								<p>Медианное время выполнения задачи: ?</p>
							</div>
						</div>
					);
				})}
			</TabContainerItem>
		</TabContainer>
	);
}

const TabContainer = styled.section`
	display: flex;
	width: 100%;
	min-height: 100%;

	@media (width <= ${'1080px'}) {
		flex-direction: column;
		gap: 100px;
	}
`;

const TabContainerItem = styled.div`
	width: 50%;
	border: 2px solid white;

	@media (width <= ${'1080px'}) {
		width: 100%;
	}
`;
