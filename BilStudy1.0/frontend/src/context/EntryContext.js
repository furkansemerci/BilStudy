import {createContext, useReducer} from 'react'

export const EntryContext = createContext()

export const EntryReducer = (state,action) =>{

    switch(action.type){

        case 'SET_ENTRIES':
            return {
                entries: action.payload
            }
        
        case 'CREATE_ENTRY':
            return {
                entries: [action.payload, ...state.entries]
            }

        case 'DELETE_ENTRY':
            return {
                entries: state.entries.filter((e) => e._id !==action.payload._id)
            }

        default:
            return state


    }

}

export const EntriesContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(EntryReducer,{
        entries:null
    })

    return (
        <EntryContext.Provider value = {{...state,dispatch}}>
            {children}
        </EntryContext.Provider>
    )

}