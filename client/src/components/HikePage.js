import HikeCard from "./HikeCard"
import HikeForm from "./HikeForm"
import NavBar from "./NavBar"
import { Card} from "semantic-ui-react"
import { React, useState, useEffect }from "react"



function HikePage(){
    const [hikes, setHikes] = useState([])

useEffect(() => {
    fetch('/hikes')
    .then(r => r.json())
    .then(data => setHikes(data))
})
    return (
        <div>
            <HikeCard />
            <HikeForm />
        </div>
    )
}

export default HikePage