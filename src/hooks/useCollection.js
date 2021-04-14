import {db} from '../firebase/fbConfig'
import {useState, useEffect} from 'react'

const useCollection = (path) => 
{
	const [docs, setDocs] = useState(null)

    useEffect(() => 
    {
    	return db.collection(path)
    		.onSnapshot(snap => {
    			const documents = []
    			snap.forEach(doc => documents.push({id: doc.id, ...doc.data()}))
    			setDocs(documents)
    		})

    }, [path])

	return docs
}

export default useCollection