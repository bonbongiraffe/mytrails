import { React, useState, useEffect }from "react"
import TrailCard from "./TrailCard"
import NavBar from "./NavBar.js"

function Home(){
    const [trails, setTrails] = useState([])

useEffect(() => {
    fetch('/trails')
    .then(r => r.json())
    .then(data => setTrails(data))
},[])

const eachTrail = trails.map

    return(
        <div>
            <TrailCard />
        </div>
    )
}

export default Home