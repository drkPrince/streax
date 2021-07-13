import { useState } from "react";
import { format } from "date-fns";

const Calendar = ({ highlight, color }) => {
	const bg = `bg-${color}-dark`;
	const border = `border-${color}-dark`;
	const text = `text-${color}-dark`;

	const [date, setDate] = useState(new Date());

	const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const days = [];

	const firstDateOfCurrentMonth = new Date(date.setDate(1));
	const lastDateOfCurrentMonth = new Date(
		date.getFullYear(),
		date.getMonth() + 1,
		0
	).getDate();

	const firstDayIndex = firstDateOfCurrentMonth.getDay();
	const lastDayIndex = new Date(
		date.getFullYear(),
		date.getMonth() + 1,
		0
	).getDay();
	const nextDays = 7 - lastDayIndex - 1;

	const daysInPreviousMonth = () => {
		for (let i = firstDayIndex; i > 0; i--) {
			days.push({ day: null, currentMonth: false });
		}
	};

	let monthlyCheckIn = 0;

	const daysInCurrentMonth = () => {
		for (let i = 1; i <= lastDateOfCurrentMonth; i++, monthlyCheckIn++) {
			const newDate = new Date(date.getFullYear(), date.getMonth(), i);
			const cleanHighlightDates = highlight.map((c) =>
				format(new Date(c.seconds * 1000), "d MMM u")
			);
			if (cleanHighlightDates.includes(format(newDate, "d MMM u")))
				days.push({ day: i, highlight: true });
			else days.push({ day: i, currentMonth: true });
		}
	};

	const daysInNextMonth = () => {
		for (let i = 1; i <= nextDays; i++) {
			days.push({ day: null, currentMonth: false });
		}
	};

	daysInPreviousMonth();
	daysInCurrentMonth();
	daysInNextMonth();
	const currentMonthCheckins = days.filter((c) => c.highlight === true);

	return (
		<div className="block md:grid grid-cols-12 gap-x-8">
			<div
				className="col-span-9 rounded py-5 px-8 text-center shadow-md"
				style={{ background: "var(--sec-bg)" }}
			>
				<div className="my-3 text-2xl flex justify-between">
					<div
						className="text-sm text-gray-400 cursor-pointer"
						onClick={() =>
							setDate(
								new Date(date.setMonth(date.getMonth() - 1))
							)
						}
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
							/>
						</svg>
					</div>
					<h1 className="text-gray-600 bold tracking-wider text-base  flex text-center">
						<svg
							className="w-6 h-6 mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						<span>{format(date, "MMMM uuu")}</span>
					</h1>
					<div
						className="text-sm text-gray-400 cursor-pointer"
						onClick={() =>
							setDate(
								new Date(date.setMonth(date.getMonth() + 1))
							)
						}
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 5l7 7-7 7M5 5l7 7-7 7"
							/>
						</svg>
					</div>
				</div>
				<div>
					<div className="weekDays flex justify-between text-gray-600 text-xs md:text-sm mt-8">
						{weekDays.map((wd) => (
							<h1 key={wd} style={{ width: "14.285%" }}>
								{wd}
							</h1>
						))}
					</div>
					<div className="flex justify-start flex-wrap mt-5">
						{days.map((d, i) => {
							return d.highlight ? (
								<div
									key={i}
									style={{ width: "14.285%" }}
									className="text-white flex justify-center items-center my-2 opacity-90"
								>
									<h2
										className={`${bg} rounded-full w-8 md:w-10 h-8 md:h-10 flex justify-center items-center text-sm md:text-base`}
									>
										{d.day}
									</h2>
								</div>
							) : (
								<div
									key={i}
									style={{ width: "14.285%" }}
									className={`my-2 ${
										d.currentMonth ? "" : "opacity-0"
									} flex justify-center items-center`}
								>
									<h2
										className={`border ${border} opacity-50 rounded-full w-8 md:w-10 h-8 md:h-10 flex justify-center items-center ${text} text-sm md:text-base`}
									>
										{d.day}
									</h2>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			<div
				className="mt-6 md:mt-0 col-span-3 px-3 md:px-8 py-8 rounded text-center shadow-md"
				style={{ background: "var(--sec-bg)" }}
			>
				<h1 className="text-gray-600 bold tracking-wider text-base flex justify-center">
					<svg
						className="w-6 h-6 mr-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
						/>
					</svg>
					Monthly Report
				</h1>
				<div className="flex flex-row justify-around md:justify-start md:flex-col">
					<div className="mt-8 md:mt-16">
						<h1 className="text-gray-600 text-xs md:text-sm bold uppercase tracking-widest">
							Scheduled Checkins
						</h1>
						<h1 className={`${text} text-2xl md:text-5xl sp bold`}>
							{lastDateOfCurrentMonth}
						</h1>
					</div>
					<div className="mt-8 md:mt-16">
						<h1 className="text-gray-600 text-xs md:text-sm bold uppercase tracking-widest">
							Completed Checkins
						</h1>
						<h1 className={`${text} text-2xl md:text-5xl sp bold`}>
							{currentMonthCheckins.length}
						</h1>
					</div>
					<div className="mt-8 md:mt-16">
						<h1 className="text-gray-600 text-xs md:text-sm bold uppercase tracking-widest">
							Completion Rate
						</h1>
						<h1 className={`${text} text-2xl md:text-5xl sp bold`}>
							{Math.round(
								(currentMonthCheckins.length /
									lastDateOfCurrentMonth) *
									100
							)}
							%
						</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Calendar;
