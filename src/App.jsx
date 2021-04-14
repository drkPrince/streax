import Habits from './screens/Habits'
import HabitDetails from './screens/HabitDetails'
import useAuth from './hooks/useAuth'

import {BrowserRouter, Route}  from 'react-router-dom';

import './styles/main.css'
import './index.css'

import {useState} from 'react'



export default function App() 
{
    const [user, logOut, handleSignIn] = useAuth()   

    const [modal, setModal] = useState(false)

    return user ? 
        <div className="overflow-hidden min-h-screen" style={{background: 'var(--main-bg)'}}>
            <BrowserRouter>
                <Route exact path='/'>
                    <nav className="flex justify-between px-20 items-center pt-12 pb-3" >
                        <h1 className='text-2xl bold text-transparent bg-clip-text tracking-wide bg-gradient-to-r from-green-500 to-gray-400 flex items-center '>
                            ..strx..
                            <svg className='fill-current text-green-400 mx-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="29"><path fill="none" d="M0 0H24V24H0z"/><path d="M21 3v2c0 9.627-5.373 14-12 14H5.243C5.08 19.912 5 20.907 5 22H3c0-1.363.116-2.6.346-3.732C3.116 16.974 3 15.218 3 13 3 7.477 7.477 3 13 3c2 0 4 1 8 0zm-8 2c-4.418 0-8 3.582-8 8 0 .362.003.711.01 1.046 1.254-1.978 3.091-3.541 5.494-4.914l.992 1.736C8.641 12.5 6.747 14.354 5.776 17H9c6.015 0 9.871-3.973 9.997-11.612-1.372.133-2.647.048-4.22-.188C13.627 5.027 13.401 5 13 5z"/></svg>
                        </h1>
                        <div className="flex space-x-4">
                            <div className='flex hover:bg-green-900 transition-all duration-300 hover:text-white px-3 py-1 text-sm rounded-full text-gray-400 '>
                                <svg className="w-7 h-7 mr-2 fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                                <button onClick={()=>setModal(true)} className='text-sm outline-none'>Add Habit</button>
                            </div>
                            <div className='flex hover:bg-indigo-700 transition-all duration-300 hover:text-white px-3 py-1 text-sm rounded-full text-gray-400 items-center'>
                                <svg className="w-6 h-6 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M5.883 18.653c-.3-.2-.558-.455-.86-.816a50.32 50.32 0 0 1-.466-.579c-.463-.575-.755-.84-1.057-.949a1 1 0 0 1 .676-1.883c.752.27 1.261.735 1.947 1.588-.094-.117.34.427.433.539.19.227.33.365.44.438.204.137.587.196 1.15.14.023-.382.094-.753.202-1.095C5.38 15.31 3.7 13.396 3.7 9.64c0-1.24.37-2.356 1.058-3.292-.218-.894-.185-1.975.302-3.192a1 1 0 0 1 .63-.582c.081-.024.127-.035.208-.047.803-.123 1.937.17 3.415 1.096A11.731 11.731 0 0 1 12 3.315c.912 0 1.818.104 2.684.308 1.477-.933 2.613-1.226 3.422-1.096.085.013.157.03.218.05a1 1 0 0 1 .616.58c.487 1.216.52 2.297.302 3.19.691.936 1.058 2.045 1.058 3.293 0 3.757-1.674 5.665-4.642 6.392.125.415.19.879.19 1.38a300.492 300.492 0 0 1-.012 2.716 1 1 0 0 1-.019 1.958c-1.139.228-1.983-.532-1.983-1.525l.002-.446.005-.705c.005-.708.007-1.338.007-1.998 0-.697-.183-1.152-.425-1.36-.661-.57-.326-1.655.54-1.752 2.967-.333 4.337-1.482 4.337-4.66 0-.955-.312-1.744-.913-2.404a1 1 0 0 1-.19-1.045c.166-.414.237-.957.096-1.614l-.01.003c-.491.139-1.11.44-1.858.949a1 1 0 0 1-.833.135A9.626 9.626 0 0 0 12 5.315c-.89 0-1.772.119-2.592.35a1 1 0 0 1-.83-.134c-.752-.507-1.374-.807-1.868-.947-.144.653-.073 1.194.092 1.607a1 1 0 0 1-.189 1.045C6.016 7.89 5.7 8.694 5.7 9.64c0 3.172 1.371 4.328 4.322 4.66.865.097 1.201 1.177.544 1.748-.192.168-.429.732-.429 1.364v3.15c0 .986-.835 1.725-1.96 1.528a1 1 0 0 1-.04-1.962v-.99c-.91.061-1.662-.088-2.254-.485z"/></svg>
                                <a className='text-sm block' href="https://github.com/drkPrince/streax" target='_blank' rel="noreferrer">Github</a>
                            </div>
                            <div className='flex hover:bg-red-700 transition-all duration-300 hover:text-white px-3 py-1 text-sm rounded-full text-gray-400 '>
                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                <button onClick={logOut} className='text-sm outline-none'>Logout</button>
                            </div>
                        </div>
                    </nav>
                    <div className='px-20 pt-4 pb-12'>
                        <Habits user={user} modal={modal} setModal={setModal} />
                    </div>
                </Route>
        
                <Route path='/:name'>
                    <div className='px-20 py-12'>
                        <HabitDetails />
                    </div>
                </Route>
            </BrowserRouter>
        </div>
    
    :

    <div className='flex justify-center items-center h-screen bg-pink-50'>
        <button className='text-white text-2xl px-4 py-2 rounded-full bg-blue-700' onClick={handleSignIn}>Sign in with Google</button>
    </div>
        
}




