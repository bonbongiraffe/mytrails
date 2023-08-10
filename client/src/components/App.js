import '../styling/App.css';
import { React, useState, useEffect }from "react"
import { Route, Routes, useNavigate } from "react-router-dom";
import Authentication from "./Authentication";
import Home from "./Home"
import HikePage from "./HikePage"
import Social from "./Social"
import NavBar from "./NavBar"

function App() {
  const [ user, setUser ] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    fetchUser()
  },[])

  const fetchUser = () => {
    fetch("/authorized")
      .then( r => {
        if (r.ok) {
          r.json().then( user => setUser(user) )
        }
      })
  }

  return (
    <div className="App">
      {user ? <NavBar user={user} setUser={setUser} navigate={navigate}/> : null}
      <Routes>
        <Route path='/' element={<Authentication  setUser={setUser} navigate={navigate}/>}></Route>
        <Route path='home' element={<Home />} />
        <Route path='hikes' element={<HikePage user = {user}/>} />
        <Route path='social' element={<Social user = {user}/>} />
      </Routes>
    </div>
  );
}

export default App;
