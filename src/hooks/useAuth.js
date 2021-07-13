import { useState, useEffect } from "react";
import { firebase, db } from "../firebase/fbConfig";

const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        return firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const userDataToBeStored = {
                    name: user.displayName,
                    id: user.uid,
                };
                db.collection("users")
                    .doc(user.uid)
                    .set(userDataToBeStored, { merge: true });
                setUser(user);
            } else setUser(false);
        });
    }, []);

    const logOut = () => firebase.auth().signOut();

    const signInWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithRedirect(provider);
    };

    const signInAnon = async () => {
        const { user } = await firebase.auth().signInAnonymously();
        makeHabitsForAnons(user.uid);
    };

    const makeHabitsForAnons = (uid) => {
        const today = new Date();
        const yesterday = new Date(today);
        const superYesterday = new Date(today);

        yesterday.setDate(yesterday.getDate() - 1);
        superYesterday.setDate(yesterday.getDate() - 2);

        const toBeAdded = [
            {
                color: "indigo",
                name: "Meditate",
                completedOn: [
                    new Date(new Date().setHours(0, 0, 0, 0)),
                    new Date(yesterday.setHours(0, 0, 0, 0)),
                ],
            },
            {
                color: "red",
                name: "Workout",
                completedOn: [new Date(yesterday.setHours(0, 0, 0, 0))],
            },
            {
                color: "orange",
                name: "Practice Gratitude",
                completedOn: [new Date(superYesterday.setHours(0, 0, 0, 0))],
            },
        ];

        toBeAdded.forEach((t) => {
            db.collection(`users/${uid}/habits`).add(t);
        });
    };

    return [user, logOut, signInWithGoogle, signInAnon];
};

export default useAuth;
