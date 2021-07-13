import { useLocation, useHistory } from "react-router-dom";
import Calendar from "../components/Calendar";
import { db } from "../firebase/fbConfig";

const HabitDetails = ({ uid }) => {
	const history = useHistory();
	const { state: habit } = useLocation();

	const text = `text-${habit.color}-dark`;

	const deleteHabit = async () => {
		await db
			.collection(`users/${habit.userid}/habits`)
			.doc(habit.id)
			.delete();
		history.goBack();
	};

	const debounce = (callback, wait) => {
		let timeoutId = null;
		return (...args) => {
			window.clearTimeout(timeoutId);
			timeoutId = window.setTimeout(() => {
				callback.apply(null, args);
			}, wait);
		};
	};

	const changeHabitName = debounce((e) => {
		console.log(e.target.value);
		db.collection(`users/${uid}/habits`)
			.doc(habit.id)
			.update({ name: e.target.value });
	}, 2500);

	return (
		<div className="py-8">
			<div className="flex justify-between items-center">
				<div className="text-gray-200 flex-1">
					<input
						className="text-2xl md:text-3xl bg-transparent text-gray-300 text-center w-full"
						type="text"
						defaultValue={habit.name}
						onChange={(e) => changeHabitName(e, habit)}
					/>
				</div>
			</div>
			<div className="text-center mt-4">
				<button
					className="text-red-700 p-2 hover:text-red-600 text-sm"
					onClick={deleteHabit}
				>
					Delete
				</button>
			</div>
			<div className="flex justify-between mt-12 md:mt-24 text-center">
				<div>
					<h1 className="text-gray-500 text-xs md:text-sm uppercase tracking-wide md:tracking-widest bold flex flex-col sm:flex-row items-center justify-center">
						<svg
							className="hidden sm:block w-8 md:mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						Current Streak
					</h1>
					<h1 className={`${text} text-3xl md:text-7xl sp bold`}>
						{habit.currentStreak}{" "}
					</h1>
				</div>
				<div>
					<h1 className="text-gray-500 text-xs md:text-sm uppercase tracking-wide md:tracking-widest bold flex flex-col sm:flex-row items-center  justify-center">
						<svg
							className="hidden sm:block w-8 md:mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
							/>
						</svg>
						Best Streak
					</h1>
					<h1 className={`${text} text-3xl md:text-7xl sp bold`}>
						{habit.longestStreak}
					</h1>
				</div>
				<div>
					<h1 className="text-gray-500 text-xs md:text-sm uppercase tracking-wide md:tracking-widest bold flex flex-col sm:flex-row items-center  justify-center">
						<svg
							className="hidden sm:block w-8 md:mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						Total Check-ins
					</h1>
					<h1 className={`${text} text-3xl md:text-7xl sp bold`}>
						{habit.completedOn.length}
					</h1>
				</div>
			</div>
			<div className="mt-12">
				<Calendar highlight={habit.completedOn} color={habit.color} />
			</div>
		</div>
	);
};

export default HabitDetails;
