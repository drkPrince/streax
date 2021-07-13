import { format, sub, eachDayOfInterval, isSameDay } from "date-fns";
import { summary } from "date-streaks";
import CheckIn from "./CheckIn";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Tooltip from "@reach/tooltip";
import "@reach/tooltip/styles.css";

const Habit = ({ habit, user }) => {
    const { dates, streak, cleanDates } = renderDates(
        habit.completedOn,
        habit.color
    );

    const variant = {
        hidden: { x: -20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { type: "tween", ease: "easeOut" },
        },
    };

    return (
        <motion.div
            className={`mb-6 shadow-md px-3 md:px-6 py-2 md:py-5 border-l-2 border-${habit.color}-dark rounded-sm relative`}
            variants={variant}
            style={{ background: "var(--sec-bg)" }}
        >
            <div className="flex justify-between items-center mb-1 md:mb-2">
                <div className="flex items-center">
                    <Link
                        to={{
                            pathname: `/${habit.id}`,
                            state: { ...habit, ...streak, userid: user.uid },
                        }}
                    >
                        <span className="text-lg md:text-xl text-white  hover:text-red-600 transition-colors duration-500 sp">
                            {habit.name}
                        </span>
                    </Link>
                    <div>
                        {streak.currentStreak === streak.longestStreak &&
                        streak.currentStreak !== 0 ? (
                            <Tooltip label="This is your best streak yet. Keep going!">
                                <svg
                                    className="w-3 h-3 md:w-5 md:h-5 ml-2 text-yellow-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                            </Tooltip>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
            <div className="grid gap-x-2 grid-cols-12">
                <div
                    className={`grid grid-cols-6 sm:grid-cols-8 gap-x-2 col-span-12 sm:col-span-10`}
                >
                    {dates}
                </div>
                <div className="col-span-2 pt-5 items-center">
                    <div className="flex justify-center col-span-12 absolute top-3.5 right-5 sm:static">
                        <CheckIn
                            habit={habit}
                            user={user}
                            cleanDates={cleanDates}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const renderDates = (completedDates, color) => {
    const bg = `bg-${color}-dark`;
    const border = `border-${color}-dark`;

    const popVariant = {
        hidden: { opacity: 0, scale: 1 },
        visible: {
            opacity: 1,
            scale: [1.7, 1],
            transition: { type: "spring", duration: 0.4 },
        },
    };

    const cleanDates = completedDates.map((c) =>
        new Date(c.seconds * 1000).toDateString()
    );
    const today = new Date();
    const daysInterval = eachDayOfInterval({
        start: sub(today, { days: 7 }),
        end: today,
    });
    // const datesForStreaks = completedDates.map(cd => new Date(cd.seconds*1000))
    const streak = summary(cleanDates);
    const dates = daysInterval.map((d) => {
        const itsToday = isSameDay(today, d);
        const day = itsToday ? (
            <h1 className="text-xs md:text-sm text-white mb-2">Today</h1>
        ) : (
            <h1 className="text-xs md:text-sm mb-2 text-gray-600">
                {format(d, "EE")}
            </h1>
        );
        return cleanDates.includes(d.toDateString()) ? (
            itsToday ? (
                <div
                    key={d}
                    className="flex flex-col justify-center items-center mt-2 day"
                >
                    {day}
                    <motion.p
                        className={`${bg} rounded-full text-xs md:text-sm w-6 md:w-10 h-6 md:h-10 flex items-center justify-center text-white`}
                        variants={popVariant}
                        initial="hidden"
                        animate="visible"
                    >
                        <svg
                            className="w-4 md:w-8"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path
                                d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                                fill="white"
                            />
                        </svg>
                    </motion.p>
                </div>
            ) : (
                <div
                    key={d}
                    className="flex flex-col justify-center items-center mt-2 opacity-90 day"
                >
                    {day}
                    <p
                        className={`${bg} rounded-full text-sm md:text-base w-6 md:w-10 h-6 md:h-10 flex items-center justify-center text-white`}
                    >
                        <span className="text-xs md:text-base">
                            {format(d, "d")}
                        </span>
                    </p>
                </div>
            )
        ) : (
            <div
                key={d}
                className="flex flex-col justify-center items-center mt-2 opacity-95 day"
            >
                {day}
                <p
                    className={`border ${border} rounded-full text-sm md:text-base w-6 md:w-10 h-6 md:h-10 flex items-center justify-center text-${color}-dark`}
                >
                    <span className="text-xs md:text-base">
                        {format(d, "d")}
                    </span>
                </p>
            </div>
        );
    });
    return { dates, streak, cleanDates };
};

export default Habit;

/* 
<div className='flex flex-col  text-left col-span-7'>
    <h1 className='text-xs md:text-sm text-gray-400'>Streak</h1>
    <h1 className={`text-${habit.color}-dark text-5xl pt-2 flex`}>
        {streak.currentStreak}
        <span>{streak.currentStreak===streak.longestStreak? <span className='text-sm md:text-base text-gray-500 inline-block'>✨</span> : '' }</span>
    </h1>
</div>

 */

// to={{pathname: `/${habit.name}`, state: {...habit, ...streak, userid: user.uid} }}
