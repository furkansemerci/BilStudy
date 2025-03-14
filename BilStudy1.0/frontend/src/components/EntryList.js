import {Link} from 'react-router-dom'
import { useEntriesContext } from '../hooks/useEntriesContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const EntryList = () => {

    const {entries} = useEntriesContext()
    console.log("Entries:", entries);
    console.log("Type of Entries:", typeof entries);


    return(

        <div className='entry-list'>
            {entries && entries.map((entry)=>(
                <div className="entry-preview" key={entry._id}>
                    <Link to={`/entry-details/${entry._id}`}>
                        <h2>{entry.title}</h2>
                        <p>Written by {entry.username}</p>
                        <p>{formatDistanceToNow(new Date(entry.createdAt), {addSuffix: true})}</p>

                    </Link>
                </div>

            ))}
        </div>

    )

}

export default EntryList;