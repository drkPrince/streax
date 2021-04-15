import useCollection from '../hooks/useCollection'
import Habit from '../components/Habit'
import {db} from '../firebase/fbConfig'
import {motion} from 'framer-motion'
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

import {useState, useEffect} from 'react'


import {
    Listbox,
    ListboxOption,
} from "@reach/listbox";


const Habits = ({user, modal, setModal}) => 
{
    const [completed, setCompleted] = useState(null)
    
    const habits = useCollection(`users/${user.uid}/habits`)

    useEffect(() => {
        if(habits){
            let completed = 0
            habits.forEach(h => {
                const dates = h.completedOn
                const actualDates = dates.map(a => a.seconds)
                const today = new Date().setHours(0, 0, 0, 0)/1000
                if(actualDates.includes(today)){
                    completed++
                }
            })
            setCompleted(completed)
        }
    }, [habits])

    const habitsVariant = {
        hidden: {x: -1000, opacity: 0},
        visible: {x: 0, opacity: 1, transition: {when: 'beforeChildren', staggerChildren: 0.2}},
    }

    const addHabit = (e) => {
        e.preventDefault()
        setModal(false)
        const habitName = e.target.elements.habitName.value
        const color = e.target.elements.color.value
        db.collection(`users/${user.uid}/habits`)
            .add({name: habitName, completedOn: [], color})
    }
    
    return habits ? (
        <>  
            <motion.div className="flex flex-col justify-around mt-8" variants={habitsVariant} animate='visible' initial='hidden'>
                <Dialog isOpen={modal} onDismiss={()=>setModal(false)} style={{background: '#111'}} className='rounded' aria-labelledby='add a new habit'>
                    <form onSubmit={addHabit} className='px-12 py-4'>
                        <h2 className='text-4xl bold text-gray-100'>Add a new habit</h2>

                        <input minLength='3' required maxLength='20' type="text" name='habitName' placeholder='Enter a habit name' className='h-8 w-full block px-4 outline-none rounded-sm bg-white placeholder-gray-700 mt-12 '/>

                        <div className='mt-6'>
                            <label htmlFor="color" className='text-gray-300'>Choose a color: </label>
                            <Listbox defaultValue="indigo" className='flex capitalize rounded-sm' name='color'>
                                {['red', 'indigo', 'pink', 'orange', 'green'].map(c => 
                                    <ListboxOption key={c} value={c} className='flex'>
                                        <div className={`w-8 h-8 bg-${c}-dark rounded-full`}></div>
                                        <h3 className='ml-2 capitalize'>{c}</h3>
                                    </ListboxOption>)
                                }
                            </Listbox>
                        </div>
                        <div className="flex justify-end space-x-3 mt-8">
                            <button type='submit' className='bg-indigo-800 py-1 px-3 text-white rounded-full'>Add new</button>
                            <button className='border border-red-600 py-1 px-3 text-red-600 rounded-full' onClick={()=>setModal(false)}>Cancel</button>
                        </div>
                    </form>
                </Dialog>
                <Banner total={habits.length} completed={completed} username={user.displayName || 'Captain'} />
                {habits.map(habit => <Habit habit={habit} user={user} key={habit.name}/>)}
            </motion.div>
            
        </>
    ) 
    : <Loader />
}


const Banner = ({completed, total, username}) => 
{
    const name = username.split(' ')[0]

    if(completed === 0){
        return <p className='text-2xl text-center text-yellow-800 mb-8'>No habits checked-in yet, {name}.</p>
    }

    else if(completed === total){
        return <p className='text-2xl text-center text-green-400 mb-8'>Noice!, All habits checked-in for today, {name}</p>
    }
    return (<p className='text-2xl text-center text-white mb-8'>
                <span className='text-2xl'>{completed}</span> out of <span className='text-2xl'>{total}</span> <span className='text-gray-600'>habits checked-in for today.</span>
            </p>)
}





const Loader = () => {
    return (
        <div className="spinner">
          <div className="cube1"></div>
          <div className="cube2"></div>
        </div>
    )
}

export default Habits

