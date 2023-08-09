import HikeCard from "./HikeCard"
import HikeForm from "./HikeForm"
import NavBar from "./NavBar"
import { Card} from "semantic-ui-react"
import { React, useState, useEffect }from "react"



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

            <Card.Group itemsPerRow={3}>
                {eachHike}
            </Card.Group>
        </div>
    )
}

export default HikePage