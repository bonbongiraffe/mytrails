import { React, useState, useEffect }from "react"
import TrailCard from "./TrailCard"
import NavBar from "./NavBar.js"

function Home({user, setUser, navigate}){
    const [trails, setTrails] = useState([])

useEffect(() => {
    fetch('/trails')
    .then(r => r.json())
    .then(data => setTrails(data))
},[])
const eachTrail = trails.map

    return(
        <div>
            <NavBar user={user} setUser={setUser} navigate={navigate}/>
            <TrailCard />
        </div>
    )
}

export default Home