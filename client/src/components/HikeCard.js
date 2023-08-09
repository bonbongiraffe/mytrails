import {Card} from "semantic-ui-react"

function HikeCard({trailName, trailLocation, trailPark, difficulty, rating, review}){
    return(
        <Card>
            <div className='hike-card'>
                <div className="trailcard-image">
                    <img />
                </div>
                <div className='trail-content'>
                    <div className='trail-name'>{trailName}</div>
                    <p className='trail-location'>{trailLocation}</p>
                    <p className='trail-park'>{trailPark}</p>
                    <p className='trail-difficulty'>{difficulty}</p>
                    <p className='trail-rating'>{rating}</p>
                    <p className='trail-review'>{review}</p>
                </div>
            </div>
        </Card>
        
    )
}

export default HikeCard