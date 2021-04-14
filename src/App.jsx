import Habits from './screens/Habits'
import HabitDetails from './screens/HabitDetails'
import useAuth from './hooks/useAuth'

import {BrowserRouter, Route}  from 'react-router-dom';

import './styles/main.css'
import './index.css'



export default function App() 
{
    const [user, logOut, handleSignIn] = useAuth()   

    return user ? 
        <div className="px-20 py-16 overflow-hidden min-h-screen" style={{background: '#09090a'}}>
            <BrowserRouter>
                <Route exact path='/'>
                    <div className="flex justify-between items-center">
                        <h1 className='text-4xl syne text-transparent bg-clip-text thin tracking-wide bg-gradient-to-r from-gray-500 to-gray-400'>Welcome, {user.displayName.split(' ')[0]}</h1>
                        <div className='flex border border-red-900 hover:bg-red-700 transition-all duration-300 hover:text-white px-3 py-1 text-sm rounded-full text-red-400 my-3'>
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                            <button onClick={logOut} className=''>Log Out</button>
                        </div>
                    </div>
                    <Habits user={user}/>
                </Route>
        
                <Route path='/:name'>
                    <HabitDetails />
                </Route>
            </BrowserRouter>
        </div>
    
    :

    <div className='flex justify-center items-center h-screen bg-pink-50'>
        <button className='text-white text-2xl px-4 py-2 rounded-full bg-blue-700' onClick={handleSignIn}>Sign in with Google</button>
    </div>
        
}




