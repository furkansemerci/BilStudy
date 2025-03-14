import { Link } from "react-router-dom";
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {

    const {logout} = useLogout()
    const {user} = useAuthContext()

    const handleLogout = () =>{
        logout()
    }

    



    return (  
       <div className="navbar">
            
             <Link to="/"><h1>BilStudy</h1></Link>
            
            
               
            <div className="links">
                    

                    {user && (
                        <div className="userButtons">
                            <span>{user.username}</span>
                            
                            <Link to="/"><a>Home</a></Link>
                            <Link to="/createEntry"><a>New Entry</a></Link>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}

                    {!user && (
                        <div className="Authenticate">
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign Up</Link>
                        </div>
                    )}
            </div>
            
       </div>
    );
}
 
export default Navbar;