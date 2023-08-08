import '../styling/App.css';
import {React, useState, useEffect }from "react"
import {Route, Routes} from "react-router-dom";
import Authentication from "./Authentication";
import Home from "./Home"
import HikePage from "./HikePage"
import Social from "./Social"

function App() {
  const [ user, setUser ] = useState({})

  useEffect(()=>{
    fetchUser()
  },[])

  const fetchUser = () => {
    fetch("http://localhost:5555/authorized")
      .then( r => {
        if (r.ok)
          r.json()
      })
      .then( user => console.log(user) )
  }

  return (
    <div className="App">
      <Authentication setUser={setUser}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='hikes' element={<HikePage />} />
        <Route path='social' element={<Social />} />
      </Routes>
    </div>
  );
}

export default App;
