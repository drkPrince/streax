import Habits from "./screens/Habits";
import HabitDetails from "./screens/HabitDetails";
import useAuth from "./hooks/useAuth";

import { BrowserRouter, Route } from "react-router-dom";

import "./styles/main.css";
import "./styles/index.css";

import { useState } from "react";

export default function App() {
    const [user, logOut, signInWithGoogle, signInAnon] = useAuth();

    const [modal, setModal] = useState(false);

    if (user === null) {
        return (
            <div className="min-h-screen">
                <div className="sk-chase mx-auto mt-24">
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                </div>
            </div>
        );
    } else if (user === false)
        return (
            <LoginScreen
                signInWithGoogle={signInWithGoogle}
                signInAnon={signInAnon}
            />
        );
    else
        return (
            <div
                className="overflow-hidden min-h-screen"
                style={{ background: "var(--main-bg)" }}
            >
                <BrowserRouter>
                    <Route exact path="/">
                        <nav className="flex justify-between px-4 md:px-20 items-center pt-6 md:pt-12 pb-3">
                            <h1 className="text-xl md:text-3xl bold text-transparent bg-clip-text tracking-normal bg-gradient-to-r from-red-600 to-red-300 flex items-center font-bold">
                                <svg
                                    className="w-5 md:w-8 h-5 md:h-8 text-red-600 mx-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </h1>
                            <div className="flex space-x-1 md:space-x-4">
                                <div
                                    onClick={logOut}
                                    className="flex cursor-pointer  transition-all duration-300 hover:text-red-700 px-3 py-1 text-sm rounded-full text-gray-400 items-center"
                                >
                                    <svg
                                        className="w-6 h-6 md:mr-0.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    <h3 className="text-sm hidden md:block">
                                        Logout
                                    </h3>
                                </div>
                                <a
                                    className=" transition-all duration-300 hover:text-red-700 px-3 py-1 text-sm rounded-full text-gray-400 items-center text-sm flex"
                                    href="https://github.com/drkPrince/streax"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <svg
                                        className="w-6 h-6 md:mr-0.5 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M5.883 18.653c-.3-.2-.558-.455-.86-.816a50.32 50.32 0 0 1-.466-.579c-.463-.575-.755-.84-1.057-.949a1 1 0 0 1 .676-1.883c.752.27 1.261.735 1.947 1.588-.094-.117.34.427.433.539.19.227.33.365.44.438.204.137.587.196 1.15.14.023-.382.094-.753.202-1.095C5.38 15.31 3.7 13.396 3.7 9.64c0-1.24.37-2.356 1.058-3.292-.218-.894-.185-1.975.302-3.192a1 1 0 0 1 .63-.582c.081-.024.127-.035.208-.047.803-.123 1.937.17 3.415 1.096A11.731 11.731 0 0 1 12 3.315c.912 0 1.818.104 2.684.308 1.477-.933 2.613-1.226 3.422-1.096.085.013.157.03.218.05a1 1 0 0 1 .616.58c.487 1.216.52 2.297.302 3.19.691.936 1.058 2.045 1.058 3.293 0 3.757-1.674 5.665-4.642 6.392.125.415.19.879.19 1.38a300.492 300.492 0 0 1-.012 2.716 1 1 0 0 1-.019 1.958c-1.139.228-1.983-.532-1.983-1.525l.002-.446.005-.705c.005-.708.007-1.338.007-1.998 0-.697-.183-1.152-.425-1.36-.661-.57-.326-1.655.54-1.752 2.967-.333 4.337-1.482 4.337-4.66 0-.955-.312-1.744-.913-2.404a1 1 0 0 1-.19-1.045c.166-.414.237-.957.096-1.614l-.01.003c-.491.139-1.11.44-1.858.949a1 1 0 0 1-.833.135A9.626 9.626 0 0 0 12 5.315c-.89 0-1.772.119-2.592.35a1 1 0 0 1-.83-.134c-.752-.507-1.374-.807-1.868-.947-.144.653-.073 1.194.092 1.607a1 1 0 0 1-.189 1.045C6.016 7.89 5.7 8.694 5.7 9.64c0 3.172 1.371 4.328 4.322 4.66.865.097 1.201 1.177.544 1.748-.192.168-.429.732-.429 1.364v3.15c0 .986-.835 1.725-1.96 1.528a1 1 0 0 1-.04-1.962v-.99c-.91.061-1.662-.088-2.254-.485z" />
                                    </svg>
                                    <span className="hidden sm:block">
                                        Github
                                    </span>
                                </a>
                                <div
                                    onClick={() => setModal(true)}
                                    className="flex cursor-pointer  transition-all duration-300 hover:text-red-700 px-3 py-1 text-sm rounded-full text-gray-400 items-center"
                                >
                                    <svg
                                        className="w-7 h-7 mr-0 fill-current"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <h3 className="text-sm hidden md:block">
                                        Add Habit
                                    </h3>
                                </div>
                            </div>
                        </nav>
                        <div className="px-5 md:px-20 pt-4 pb-12">
                            <Habits
                                user={user}
                                modal={modal}
                                setModal={setModal}
                            />
                        </div>
                    </Route>

                    <Route path="/:name">
                        <div className="px-4 md:px-20 py-8 md:py-12">
                            <HabitDetails uid={user.uid} />
                        </div>
                    </Route>
                </BrowserRouter>
            </div>
        );
}

const LoginScreen = ({ signInWithGoogle, signInAnon }) => {
    return (
        <div className="flex flex-col-reverse md:flex-row min-h-screen bg-gradient-to-bl from-red-100 to-indigo-100 pb-12">
            <div className="w-full md:w-1/2 my-auto px-5 md:pl-12">
                <h3
                    style={{ color: "#5222d0" }}
                    className="text-3xl md:text-5xl bold"
                >
                    Conquer your habits, Crush your goals.
                </h3>
                <p className="mt-3 md:mt-5 text-base md:text-xl leading-relaxed text-gray-700">
                    We become what we repeatedly do. Streax helps you make
                    better habit and break bad ones. It is based on the 'Don't
                    break the chain' philosophy.{" "}
                </p>
                <div className="flex text-white text-xs md:text-lg mt-7 md:mt-12 space-x-2">
                    <button
                        className="px-4 py-2 rounded-full border text-gray-900 border-gray-700 transform hover:-translate-y-1 transition-all duration-300"
                        onClick={signInAnon}
                    >
                        Continue as Guest
                    </button>
                    <button
                        className="px-4 py-2 rounded-full bg-blue-700 transform hover:-translate-y-1 transition-all duration-300"
                        onClick={signInWithGoogle}
                    >
                        Sign in with Google
                    </button>
                </div>
            </div>
            <div className="w-full md:w-1/2 my-auto">
                <img
                    src={require("./styles/success.png").default}
                    alt="winning man"
                />
            </div>
        </div>
    );
};
