import {useLocation, useHistory} from 'react-router-dom'
import Calendar from '../components/Calendar'
import {db} from '../firebase/fbConfig'


const HabitDetails = () => 
{
	const history = useHistory()
	const {state: habit} = useLocation()

	const deleteHabit = async () => {
		await db.collection(`users/${habit.userid}/habits`).doc(habit.id).delete()
		history.goBack()
	}


	return (
		<div>
			<div className="flex justify-between items-center">
				<div className='text-gray-200'>
					<h1 className='text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-100 to-blue-100'>{habit.name}</h1>
				</div>
				<button style={{background: '#33333344'}} className='w-10 h-10 rounded-full p-2' onClick={deleteHabit}>
					<svg className="w-6 h-6 text-red-600 hover:text-red-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
				</button>
			</div>
			<div className="flex justify-between mt-20 text-center">
				<div>
					<h1 className='text-gray-300 text-sm uppercase tracking-wider syne flex items-center'>
						<svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
						Current Streak
					</h1>
					<h1 className={`text-${habit.color}-dark text-7xl`}>{habit.currentStreak} </h1>
				</div>
				<div>
					<h1 className='text-gray-300 text-sm uppercase tracking-wider syne flex items-center'>
						<svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>
						Best Streak
					</h1>
					<h1 className={`text-${habit.color}-dark text-7xl`}>{habit.longestStreak}</h1>
				</div>
				<div>
					<h1 className='text-gray-300 text-sm uppercase tracking-wider syne flex items-center'>
						<span>
							<svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
						</span>
						Total Check-ins
					</h1>
					<h1 className={`text-${habit.color}-dark text-7xl`}>{habit.completedOn.length}</h1>
				</div>
			</div>
			<div className='mt-12'>
				<Calendar highlight={habit.completedOn} color={habit.color}/>
			</div>
		</div>
	)
}

export default HabitDetails