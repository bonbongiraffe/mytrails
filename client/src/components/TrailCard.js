import {Card} from "semantic-ui-react"

function TrailCard(){

    return (
        <Card >
            <div className="trailcard-image">
                <img />
            </div>
            <div className="trailcard-content">
                <div className="trail-name"></div>
                <p className="trail-location"></p>
                <p className="trail-park"></p>
            </div>
        </Card>
    )
}

export default TrailCard