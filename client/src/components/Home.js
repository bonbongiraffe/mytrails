import { React, useState, useEffect }from "react"
import TrailCard from "./TrailCard"
import '../styling/Home.css'
import { Card} from "semantic-ui-react"

function Home(){
    const [trails, setTrails] = useState([])

useEffect(() => {
    fetch('/trails')
    .then(r => r.json())
    .then(data => setTrails(data))
},[])

const eachTrail = trails.map(trail => {
    return (
        <TrailCard key ={trail.id}
                    name = {trail.name}
                    location = {trail.location}
                    park={trail.park}
                    />
    )
})

    return(
        <div className="trail-list">
            <h1 className="trail-list-header">Trails</h1>
            <Card.Group itemsPerRow={3}>
                {eachTrail}
            </Card.Group>
        </div>
    )
}

export default Home