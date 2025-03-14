import {useEffect} from 'react'
import { useEntriesContext } from '../hooks/useEntriesContext';
import { useAuthContext } from '../hooks/useAuthContext';

import EntryDetails from '../components/EntryDetails'
import useFetch from '../hooks/useFetch';
import EntryList from '../components/EntryList';



const Home = () => {
    
    const {entries, dispatch} = useEntriesContext()
    const {user} = useAuthContext()
    const {isLoading, error} = useFetch(`/api/entries/`)

    console.log(user)
    
    //const [isLoading, setIsLoading] = useState(true)
    //const [error, setError] = useState(null)
    
    /*useEffect(()=>{
        

        const fetchEntries = async() =>{

            const response = await fetch('api/entries',{
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_ENTRIES', payload:json})
            }

        }

        if(user){
            fetchEntries()
        }


        
    }, [dispatch, user])*/
    
    return ( 
        <div className="home">
            
            {error && <div>{error}</div>}
            {isLoading && <div>Loading..</div>}
            <h2>Homepage</h2>
            {entries && <EntryList></EntryList>}

            
        </div>
     );
}
 



export default Home;
