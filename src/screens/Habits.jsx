import useCollection from '../hooks/useCollection'
import Habit from '../components/Habit'
import {db} from '../firebase/fbConfig'
import {motion} from 'framer-motion'
import {useState} from 'react'
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

const Habits = ({user, modal, setModal}) => 
{
    
    const habits = useCollection(`users/${user.uid}/habits`)

    const habitsVariant = {
        hidden: {x: -1000, opacity: 0},
        visible: {x: 0, opacity: 1, transition: {when: 'beforeChildren', staggerChildren: 0.2}},
    }

    const addHabit = (e) => {
        e.preventDefault()
        setModal(false)
        const habitName = e.target.elements.habitName.value
        const color = e.target.elements.color.value
        console.log(color)
        db.collection(`users/${user.uid}/habits`)
            .add({name: habitName, completedOn: [], color})
    }
    
    return habits ? (
        <>  
            <motion.div className="flex flex-col justify-around mt-8" variants={habitsVariant} animate='visible' initial='hidden'>
                <div className='bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-3 fixed bottom-8 right-16 rounded-full cursor-pointer' onClick={()=>setModal(!modal)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="rgba(255,255,255,1)"/></svg>
                </div>
                <Dialog isOpen={modal} onDismiss={()=>setModal(false)} style={{background: '#111'}} className='rounded bg-black '>
                    <form onSubmit={addHabit} className='px-12 py-4'>
                        <h2 className='text-3xl text-gray-400'>Add a new habit</h2>
                        <input type="text" name='habitName' className='h-8 w-64 block my-3 px-2 outline-none'/>
                        <label htmlFor="color" className='text-gray-300 mr-3'>Choose a color: </label>
                        <select name="color" id='color'>
                            <option>red</option>
                            <option>indigo</option>
                            <option>green</option>
                        </select>
                        <button type='submit' className='bg-green-500 py-1 px-2 text-white block my-4'>Add</button>
                        <button className='bg-red-500 py-1 px-2 text-white block' onClick={()=>setModal(false)}>Cancel</button>
                    </form>
                </Dialog>
                {habits.map(habit => <Habit habit={habit} user={user} key={habit.name}/>)}
            </motion.div>
            
        </>
    ) 
    : null
}



export default Habits