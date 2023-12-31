import {Card} from "semantic-ui-react"
import '../styling/Home.css'

function TrailCard({name, location, park, image}){

    return (
        <Card style={{border: '5px solid #614c33', borderRadius: '10px', backgroundColor: '#fffaed'}}>
            <div className="trail-card">
                <div className="trailcard-content">
                    <p className="trail-name">{name}</p>
                    <div className="trailcard-image">
                        <img className='trail-pic'src={image} alt={name} />
                    </div>
                    <div className="trail-card-info">
                        <p className="trail-card-title">Location:</p>
                        <p className="trail-location">{location}</p>
                        <p className="trail-card-title">Park:</p>
                        <p className="trail-park">{park}</p>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default TrailCard