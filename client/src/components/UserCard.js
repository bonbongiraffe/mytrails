import {Card} from "semantic-ui-react"

function UserCard({name, hikes, image}){
    console.log(hikes)
const eachHike = hikes.map(hike => {
    return <li key={hike.id}>{hike.trail.name}</li>
})
    return (
        <Card style={{border: '5px solid #614c33', backgroundColor: '#fffaed'}}>
            <div className = 'user-card'>
                <div className='user-card-content'>
                    <p className='card-username'>{name}</p>
                    <img className='social-img'src ={image} alt ={name}/>
                    <p className='user-card-title'>{name}'s Hikes:</p>
                    <ul>
                        {eachHike}
                    </ul>
                </div>
            </div>
        </Card>
    )
}

export default UserCard