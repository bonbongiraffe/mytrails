import {Card} from "semantic-ui-react"

function HikeCard({id, trailName, trailLocation, trailPark, difficulty, rating, review, removeHikeCard}){


function handleDelete(){
    fetch(`/hikes/${id}`,
    {method: "DELETE",})
    .then(() => removeHikeCard(id))
    
}

    return(
        <Card style={{border: '5px solid #614c33', borderRadius: '10px', backgroundColor: '#fffaed'}}>
            <div className='hike-card'>
                <div className='trail-content'>
                    {/* <div className="trailcard-image">
                        <img />
                    </div> */}
                    <div className="hike-card-info">
                        <div className='trail-name'>{trailName}</div>
                        <p className="trail-card-title">Location:</p>
                        <p className='trail-location'>{trailLocation}</p>
                        <p className="trail-card-title">Park:</p>
                        <p className='trail-park'>{trailPark}</p>
                        <p className="trail-card-title">Difficulty:</p>
                        <p className='trail-difficulty'> {'🥾'.repeat(difficulty)}</p>
                        <p className="trail-card-title">My Rating:</p>
                        <p className='trail-rating'> {'⭐️'.repeat(rating)}</p>
                        <p className='trail-review'>"{review}"</p>
                        <button className='hike-delete-button' onClick={handleDelete}>🗑</button>
                    </div>
                </div>
            </div>
        </Card>
        
    )
}

export default HikeCard