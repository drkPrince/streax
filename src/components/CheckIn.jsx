import {db} from '../firebase/fbConfig'
import {isSameDay} from 'date-fns'
import {motion} from 'framer-motion'
import {useState} from 'react'



const CheckIn = ({habit, cleanDates, user}) => 
{
	const todayMidnightInString = new Date(new Date().setHours(0, 0, 0, 0)).toDateString()
	const [done, setDone] = useState(cleanDates.includes(todayMidnightInString) ? true : false)

	const checkIn = () => {
		if(cleanDates.includes(todayMidnightInString)){
			const todayRemoved = habit.completedOn.filter(d => !isSameDay(new Date(d.seconds*1000), new Date()))
			db.collection(`users/${user.uid}/habits`)
        		.doc(habit.id)
        		.set({name: habit.name, completedOn: todayRemoved}, {merge: true})
			setDone(false)
		}

		else {
	    	db.collection(`users/${user.uid}/habits`)
	    		.doc(habit.id)
	    		.set({name: habit.name, completedOn: [...habit.completedOn, new Date(new Date().setHours(0, 0, 0, 0))]}, {merge: true})
			setDone(true)
		}
    }


	return (
		<div className=''>
            <motion.div className={`rounded-full bg-gray-700 w-9 md:w-16 h-4 md:h-7 flex items-center ${done ? 'justify-end' : 'justify-start'}`}>
                <motion.div layout transition={{type: 'spring', stiffness: 700, damping: 30}} className={`rounded-full w-6 md:w-10 h-6 md:h-10 flex justify-center items-center ${done ? 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500' : 'bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600'}`} onClick={checkIn}>
                    <svg className='w-4 md:w-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" fill='white'/></svg>
                </motion.div>
            </motion.div>
        </div>
	)
}

export default CheckIn