import {Card} from "semantic-ui-react"

function TrailCard({name, location, park}){

    return (
        <Card >
            <div className="trailcard-image">
                <img />
            </div>
            <div className="trailcard-content">
                <div className="trail-name">{name}</div>
                <p className="trail-location">{location}</p>
                <p className="trail-park">{park}</p>
            </div>
        </Card>
    )
}

export default TrailCard