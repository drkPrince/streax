import {format, sub, eachDayOfInterval, isSameDay} from 'date-fns'
import {summary} from 'date-streaks';
import CheckIn from './CheckIn'
import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'


import Tooltip from "@reach/tooltip";
import "@reach/tooltip/styles.css";

const Habit = ({habit, user}) => 
{
	const {dates, streak, cleanDates} = renderDates(habit.completedOn, habit.color)

    const variant = {
        hidden: {x: -200, opacity: 0},
        visible: {x: 0, opacity: 1, transition: {type: 'tween', ease: 'easeOut'}}
    }

	return (
		<motion.div className={`mb-6 shadow-md px-6 py-5 border-l-2 border-${habit.color}-dark rounded-sm`} variants={variant} style={{background: 'var(--sec-bg)'}}>
            <div className='flex items-center  mb-2'>
                <Link to={{pathname: `/${habit.name}`, state: {...habit, ...streak, userid: user.uid} }} >
                    <span className=' text-2xl text-transparent bg-clip-text bg-gradient-to-r from-red-100 to-blue-100 bold'>
                        {habit.name}
                    </span>
                </Link>
                <div>
                    {(streak.currentStreak===streak.longestStreak) && streak.currentStreak!==0
                        ? 
                        <Tooltip label="This is your best streak yet. Keep going!">
                            <svg className="w-5 h-5 ml-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </Tooltip>
                        :
                         ''}
                </div>
            </div>
            <div className="grid gap-x-16 grid-cols-12">
                <div className='flex justify-between col-span-10 '>
                    {dates}
                </div>
                <div className="col-span-2 pt-2 grid grid-cols-12 items-center gap-x-1">
                    <div className='flex justify-center col-span-12'>
                        <CheckIn habit={habit} user={user} cleanDates={cleanDates}/>
                    </div>
                </div>
            </div>
        </motion.div>
	)
}

const renderDates = (completedDates, color) => 
{
    const popVariant = {
        hidden: {opacity: 0, scale: 1},
        visible: {opacity: 1, scale: [1.7, 1], transition: {type: 'spring', duration: 0.4}}
    }

    const cleanDates = completedDates.map(c => new Date(c.seconds * 1000).toDateString())
    const today = new Date()
    const tenDaysInterval = eachDayOfInterval({start: sub(today, {days: 7}), end: today})
    // const datesForStreaks = completedDates.map(cd => new Date(cd.seconds*1000))
    const streak = summary(cleanDates)
    const dates = tenDaysInterval.map(d => 
    {
        const itsToday = isSameDay(today, d)
    	const day = itsToday ? <h1 className='text-sm text-white mb-2'>Today</h1> : <h1 className='text-sm mb-2 text-gray-600'>{format(d, 'EE')}</h1>
        return cleanDates.includes(d.toDateString()) 
            ? 
                itsToday ? 
                    <div key={d} className='flex flex-col justify-center items-center mt-2'>
                        {day}
                        <motion.p className={`bg-${color}-dark rounded-full text-sm w-10 h-10 flex items-center justify-center text-white`} variants={popVariant} initial='hidden' animate='visible'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" fill='white'/></svg>
                        </motion.p>
                    </div>
                    : 
                    <div key={d} className='flex flex-col justify-center items-center mt-2 opacity-90'>
                        {day}
                        <p className={`bg-${color}-dark rounded-full text-sm w-10 h-10 flex items-center justify-center text-white`}>
                            {format(d, 'd')}
                        </p>
                    </div>
            : 
                <div key={d} className='flex flex-col justify-center items-center mt-2 opacity-95'>
                    {day}
                    <p className={`border  border-${color}-dark text-gray-700 rounded-full text-sm w-10 h-10 flex items-center justify-center`}>{format(d, 'd')}</p>
                </div>
    })
    return {dates, streak, cleanDates}
}


export default Habit


/* 
<div className='flex flex-col  text-left col-span-7'>
    <h1 className='text-sm text-gray-400'>Streak</h1>
    <h1 className={`text-${habit.color}-dark text-5xl pt-2 flex`}>
        {streak.currentStreak}
        <span>{streak.currentStreak===streak.longestStreak? <span className='text-base text-gray-500 inline-block'>✨</span> : '' }</span>
    </h1>
</div>

 */



// to={{pathname: `/${habit.name}`, state: {...habit, ...streak, userid: user.uid} }}