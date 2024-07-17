export function getWeek(date: string | number) {
	const currentDate = new Date(date);
	const januaryFirst = new Date(currentDate.getFullYear(), 0, 1);
	const daysToNextMonday =
		januaryFirst.getDay() === 1 ? 0 : (7 - januaryFirst.getDay()) % 7;
	const nextMonday = new Date(
		currentDate.getFullYear(),
		0,
		januaryFirst.getDate() + daysToNextMonday,
		11
	);

	return currentDate < nextMonday
		? 52
		: currentDate > nextMonday
		? Math.ceil(
				(currentDate.getTime() - nextMonday.getTime()) / (24 * 3600 * 1000) / 7
		  )
		: 1;
}
