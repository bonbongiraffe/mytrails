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

    const addNewHike = (newHike) => {
        setHikes([...hikes, newHike])
    }

    const handleFavorite = (hikeId,updatedVal) => {
        fetch(`hikes/${hikeId}`,{
            method: "PATCH",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({favorite: updatedVal})
        })
            .then( r => r.json())
            .then( updatedHike => setHikes(hikes.map(hike => {
                if (hike.id !== hikeId){
                    return hike
                } else {
                    return updatedHike
                }
            })))
    }

    useEffect(() => {
        document.title="My Trails | My Hikes"
    }, [])

    const removeHikeCard = (id) => {
        setHikes((currentHikes) =>
            currentHikes.filter((hike) => hike.id !== id)
        )
    }

    const eachHike = hikes.filter((hike) => hike.user_id === user?.id).map(filteredHike => {
        return (
            <HikeCard   key={filteredHike.id}
                        id={filteredHike.id}
                        trailName={filteredHike.trail.name}
                        trailLocation={filteredHike.trail.location}
                        trailPark={filteredHike.trail.park}
                        difficulty={filteredHike.difficulty}
                        rating={filteredHike.rating}
                        review={filteredHike.review}
                        favorite={filteredHike.favorite}
                        handleFavorite={handleFavorite}
                        removeHikeCard={removeHikeCard}/>
        )
    })

    return (
        <div className='hike-page'>
            <div className='hike-list'>
            <h1 className="hike-header">My Hikes</h1>
                <Card.Group itemsPerRow={3}>
                    {eachHike}
                </Card.Group>
            </div>
            <div className='hike-form'>
                <h1 className="hike-header">Add a Hike</h1>
                <HikeForm user={user} addNewHike={addNewHike}/>
            </div>
        </div>
    )
}

export default HikePage