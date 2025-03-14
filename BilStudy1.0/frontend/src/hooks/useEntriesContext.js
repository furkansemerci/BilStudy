import { EntryContext } from "../context/EntryContext";
import {useContext} from 'react';


export const useEntriesContext =() =>{
    const context = useContext(EntryContext)

    if(!context){
        throw Error ('useEntriesContext must be used inside an EntriesContextProvider')
    }

    return context
}