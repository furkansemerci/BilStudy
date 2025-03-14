import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CreateEntry from './pages/createEntry'
import Navbar from './components/Navbar'
import EntryDetails from "./components/EntryDetails"


function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <div className='pages'>
          <Routes>
            <Route exact path="/" element={user ? <Home/> : <Navigate to="/login"/>}/>
  
            <Route exact path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
  
            <Route
                path="/signup"
                element={!user ? <Signup/> : <Navigate to='/'/>}
              />
  
            <Route path="/entry-details/:id" element={user ? <EntryDetails/> : <Navigate to="/login"/>} />
            <Route exact path="/createEntry" element={user ? <CreateEntry/> : <Navigate to="/login"/>}/>
  
          </Routes>
  
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
