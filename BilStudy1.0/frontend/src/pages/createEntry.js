import {useState} from 'react'
import { useEntriesContext } from '../hooks/useEntriesContext'
import { useAuthContext } from '../hooks/useAuthContext'
import {useNavigate} from 'react-router-dom'

const CreateEntry = () =>{

    const {dispatch : entryDispatch} = useEntriesContext()
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const {user} = useAuthContext()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()


    const handleSubmit = async(e) => {
        e.preventDefault()
        setIsLoading(true)
        if(!user){
            setError('You must be logged in')
            navigate('./Login')
        }
        const username = user.username
        console.log(username)
        const entry = {title, text, username}

        const response = await fetch('/api/entries', {
            method: 'POST',
            body: JSON.stringify(entry),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        
        const json = await response.json()

        if(response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if(response.ok){
            setTitle('')
            setText('')
            setIsLoading(false)
            setEmptyFields([])
            console.log('New Workout Added', json)
            entryDispatch({type: 'CREATE_ENTRY', payload:json})
            navigate('/')
        }

        
    }




    return(
        <div className='create'>
            <h2>Add a New Entry</h2>

            <form onSubmit={handleSubmit}>

                <label>Title: </label>
                <input type="text" onChange={(e)=> setTitle(e.target.value)} value={title} required />

                <label >Text: </label>
                <textarea type="text" value={text} onChange={(e) => setText(e.target.value)}/>

                {!isLoading && <button>Submit</button>}
                {isLoading && <button disabled>Adding Entry...</button>}

            </form>
        </div>
    )


}


export default CreateEntry;