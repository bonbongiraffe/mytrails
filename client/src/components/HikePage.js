import HikeCard from "./HikeCard"
import HikeForm from "./HikeForm"
import { React, useState, useEffect }from "react"

function HikePage({user}){
    const [hikes, setHikes] = useState([])

useEffect(() => {
    fetch('/hikes')
        .then(r => r.json())
        .then(data => setHikes(data))
},[])
    return (
        <div>
            {/* <HikeCard /> */}
            <HikeForm user={user}/>
        </div>
    )
}

export default HikePage