import {useState, useEffect} from 'react'
import {firebase, db} from '../firebase/fbConfig'

const useAuth = () => 
{
    const [user, setUser] = useState(null)
    useEffect(() => 
    {   
        return firebase.auth().onAuthStateChanged(user => {
            if(user) {
                const userDataToBeStored = {dp: user.photoURL, name: user.displayName, id: user.uid}
                db.collection('users')
                    .doc(user.uid)
                    .set(userDataToBeStored, {merge: true})
                setUser(user)    
            }
            else setUser(null)
        })
            
    }, [])

    const logOut = () => firebase.auth().signOut()

    const handleSignIn = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();    
        await firebase.auth().signInWithRedirect(provider)
    }

    return [user, logOut, handleSignIn]
    
}

export default useAuth