import {Card} from "semantic-ui-react"

function TrailCard({key, name, location, park}){

    return (
        <Card >
            <div className="trail-card">
                <div className="trailcard-image">
                    <img />
                </div>
                <div className="trailcard-content">
                    <div className="trail-name">{name}</div>
                    <p className="trail-location">{location}</p>
                    <p className="trail-park">{park}</p>
                </div>
            </div>
        </Card>
    )
}

export default TrailCard