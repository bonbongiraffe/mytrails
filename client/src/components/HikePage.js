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

    // const eachHike = hikes.filter((hike) => hike.user_id === user?.id).map(filteredHike => {
    //     return (
    //         <HikeCard   key={filteredHike.id}
    //                     id={filteredHike.id}
    //                     trailName={filteredHike.trail.name}
    //                     trailLocation={filteredHike.trail.location}
    //                     trailPark={filteredHike.trail.park}
    //                     trailImage={filteredHike.trail.image}
    //                     difficulty={filteredHike.difficulty}
    //                     rating={filteredHike.rating}
    //                     review={filteredHike.review}
    //                     favorite={filteredHike.favorite}
    //                     handleFavorite={handleFavorite}
    //                     removeHikeCard={removeHikeCard}/>
    //     )
    // })

    const [search, setSearch] = useState(''); // State for search query

    const filteredHike = hikes
    .filter(hike => hike.user_id === user?.id) // Filter by user_id
    .filter(hike => hike.trail && hike.trail.name.toLowerCase().includes(search.toLowerCase())) // Apply search filter
    .map(filteredHike => (
        <HikeCard
            key={filteredHike.id}
            id={filteredHike.id}
            trailName={filteredHike.trail.name}
            trailLocation={filteredHike.trail.location}
            trailPark={filteredHike.trail.park}
            trailImage={filteredHike.trail.image}
            difficulty={filteredHike.difficulty}
            rating={filteredHike.rating}
            review={filteredHike.review}
            favorite={filteredHike.favorite}
            handleFavorite={handleFavorite}
            removeHikeCard={removeHikeCard}
        />
    ));
    

    return (
        <div className='hike-page'>
            <div className='hike-list'>
            <h1 className="hike-header">My Hikes</h1>
            <div className="search-container">
                <input
                    className="search-input"
                    icon="search"
                    placeholder="Search your hikes . . ."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <Card.Group itemsPerRow={3}>
                {/* {eachHike} */}
                {filteredHike}
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