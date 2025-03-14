import { useEntriesContext } from "../hooks/useEntriesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import {useNavigate, useParams} from "react-router-dom";
import useFetch from "../hooks/useFetch";


const EntryDetails = () => {

    const {id} = useParams()
    const {entries, dispatch} = useEntriesContext()
    const {user} = useAuthContext()
    //const {data:entry, isLoading, error} = useFetch('/api/entries/' + {id})
    const navigator = useNavigate();

    const entry = entries?.find(x => x._id == id)

    if (!entry) return <p>Loading...</p>;

    console.log(entry)

    console.log(user)
  


    const handleDelete= async(id) =>{
        if(!user){
            return
        }
        const response = await fetch('/api/entries/' + id,{
            method:'DELETE',
            headers:{ 'Authorization': `Bearer ${user.token}` }
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type:'DELETE_ENTRY', payload:json})
            navigator('/')
        }
        
    }



    return(
        <div className='entry-details'>
            {entry && 
                <article>
                    <h4>{entry.title}</h4>
                    <p><strong>Author: </strong>{entry.username}</p>
                    <p>{entry.text}</p>
                    
                </article>
            }
            {(user.username==entry.username) && 
                <button onClick={() => handleDelete(entry._id)}>Delete</button>
            }
        </div>
    )

}

export default EntryDetails;