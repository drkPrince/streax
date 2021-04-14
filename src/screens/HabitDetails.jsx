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
					<h1 className='text-5xl text-gray-200'>{habit.name}</h1>
				</div>
				<button style={{background: '#33333344'}} className='w-10 h-10 rounded-full p-2' onClick={deleteHabit}>
					<svg className="w-6 h-6 text-red-600 hover:text-red-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
				</button>
			</div>
			<div className="flex justify-between mt-20 text-center">
				<div>
					<h1 className='text-gray-300 text-sm uppercase tracking-wider syne'>Current Streak</h1>
					<h1 className={`text-${habit.color}-dark text-7xl`}>{habit.currentStreak} </h1>
				</div>
				<div>
					<h1 className='text-gray-300 text-sm uppercase tracking-wider syne'>Best Streak</h1>
					<h1 className={`text-${habit.color}-dark text-7xl`}>{habit.longestStreak}</h1>
				</div>
				<div>
					<h1 className='text-gray-300 text-sm uppercase tracking-wider syne'>Total Check-ins</h1>
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