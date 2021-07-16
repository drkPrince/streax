import useCollection from "../hooks/useCollection";
import Habit from "../components/Habit";
import { db } from "../firebase/fbConfig";
import { motion } from "framer-motion";
import { Dialog } from "@reach/dialog";

import { useState, useEffect } from "react";

import { Listbox, ListboxOption } from "@reach/listbox";

const Habits = ({ user, modal, setModal }) => {
    const [completed, setCompleted] = useState(null);

    const habits = useCollection(`users/${user.uid}/habits`);

    useEffect(() => {
        if (habits) {
            let completed = 0;
            habits.forEach((h) => {
                const dates = h.completedOn;
                const actualDates = dates.map((a) => a.seconds);
                const today = new Date().setHours(0, 0, 0, 0) / 1000;
                if (actualDates.includes(today)) {
                    completed++;
                }
            });
            setCompleted(completed);
        }
    }, [habits]);

    const habitsVariant = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { when: "beforeChildren", staggerChildren: 0.1 },
        },
    };

    const addHabit = (e) => {
        e.preventDefault();
        setModal(false);
        const habitName = e.target.elements.habitName.value;
        const color = e.target.elements.color.value;
        db.collection(`users/${user.uid}/habits`).add({
            name: habitName,
            completedOn: [],
            color,
        });
    };

    return habits ? (
        <>
            <motion.div
                className="mt-3 md:mt-8"
                variants={habitsVariant}
                animate="visible"
                initial="hidden"
            >
                <Dialog
                    isOpen={modal}
                    onDismiss={() => setModal(false)}
                    style={{ background: "var(--sec-bg)" }}
                    className="rounded"
                    aria-labelledby="add a new habit"
                >
                    <form
                        autoComplete="off"
                        onSubmit={addHabit}
                        className="px-4 md:px-12 py-4"
                    >
                        <h2 className="text-3xl md:text-4xl bold text-gray-100">
                            Add a new habit
                        </h2>

                        <div className="mt-8 md:mt-12">
                            <label
                                className="text-gray-500 text-sm "
                                htmlFor="habitName"
                            >
                                Enter New Habit
                            </label>
                            <input
                                minLength="3"
                                required
                                maxLength="20"
                                type="text"
                                name="habitName"
                                className="py-1 w-full block px-2 outline-none rounded-sm bg-white placeholder-gray-700  mt-1"
                            />

                            <div className="mt-5 md:mt-6">
                                <label
                                    htmlFor="color"
                                    className="text-gray-500 text-sm"
                                >
                                    Choose a color:{" "}
                                </label>
                                <Listbox
                                    defaultValue="indigo"
                                    className="flex capitalize rounded-sm outline-none mt-1"
                                    name="color"
                                >
                                    {[
                                        "red",
                                        "indigo",
                                        "pink",
                                        "orange",
                                        "green",
                                    ].map((c) => (
                                        <ListboxOption
                                            key={c}
                                            value={c}
                                            className="flex"
                                        >
                                            <div
                                                className={`w-8 h-8 bg-${c}-dark rounded-full`}
                                            ></div>
                                            <h3 className="ml-2 capitalize">
                                                {c}
                                            </h3>
                                        </ListboxOption>
                                    ))}
                                </Listbox>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3 mt-8 text-sm md:text-base">
                            <button
                                type="submit"
                                className="bg-indigo-800 hover:bg-indigo-900 py-1 px-3 text-white rounded-sm"
                            >
                                Add new
                            </button>
                        </div>
                    </form>
                </Dialog>
                <Banner
                    className="text-base md:text-2xl"
                    total={habits.length}
                    completed={completed}
                />
                {habits.map((habit) => (
                    <Habit habit={habit} user={user} key={habit.name} />
                ))}
            </motion.div>
        </>
    ) : (
        <Loader />
    );
};

const Banner = ({ completed, total }) => {
    if (completed === 0) {
        return (
            <p className="text-yellow-800 text-center mb-8">
                No habits checked-in yet.
            </p>
        );
    } else if (completed === total) {
        return (
            <p className="text-green-400 text-center mb-8">
                Great! Everything checked-in.
            </p>
        );
    }
    return (
        <p className="text-white text-center mb-8">
            <span className="">{completed}</span> out of{" "}
            <span className="">{total}</span>{" "}
            <span className="text-gray-600">habits checked-in.</span>
        </p>
    );
};

const Loader = () => {
    return (
        <div className="min-h-screen">
            <div class="sk-chase mx-auto my-auto">
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
            </div>
        </div>
    );
};

export default Habits;
