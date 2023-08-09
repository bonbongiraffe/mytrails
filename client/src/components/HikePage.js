import HikeCard from "./HikeCard"
import HikeForm from "./HikeForm"
import { React, useState, useEffect }from "react"
import {Card} from "semantic-ui-react"
import '../styling/Hike.css'



function HikePage({user}){
    const [hikes, setHikes] = useState([])

useEffect(() => {
    fetch('/hikes')
    .then(r => r.json())
    .then(data => 
        setHikes(data))
}, [])
console.log(user)
console.log(hikes)

useEffect(() => {
    document.title="My Trails | My Hikes"
}, [])

const eachHike = hikes.filter((hike) => hike.user_id === user.id).map(filteredHike => {
    return (
        <HikeCard   key = {filteredHike.id}
                    trailName={filteredHike.trail.name}
                    trailLocation={filteredHike.trail.location}
                    trailPark={filteredHike.trail.park}
                    difficulty={filteredHike.difficulty}
                    rating={filteredHike.rating}
                    review={filteredHike.review}/>
    )
})


    return (
        <div className='hike-list'>
            <h1 className="hike-list-header">My Hikes</h1>
            <Card.Group itemsPerRow={3}>
                {eachHike}
            </Card.Group>
        </div>
    )
}

export default HikePage