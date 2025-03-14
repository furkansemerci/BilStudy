import { useAuthContext } from "./useAuthContext";
import { useEntriesContext } from "./useEntriesContext";

export const useLogout=() =>{
    const {dispatch: authDispatch} = useAuthContext()
    const {dispatch: entryDispatch} = useEntriesContext()

    const logout = () =>{
        localStorage.removeItem('user')
        authDispatch({type:'LOGOUT'})

        entryDispatch({type: 'SET_ENTRIES', payload:null})
    }

    return {logout}
}