import UserCard from "./UserCard"
import NavBar from "./NavBar.js"
import '../styling/Social.css'
import {Card} from "semantic-ui-react"
import { React, useState, useEffect }from "react"

function Social({user}){
const [users, setUsers] = useState([])

useEffect(() => {
    fetch('/users')
    .then(r => r.json())
    .then(data => setUsers(data))
}, [])

const eachUser = users.filter(eachUser => eachUser.id !== user.id).map(filteredUser => {
    return <UserCard key={filteredUser.id}
                    name={filteredUser.username}
                    hikes={filteredUser.hikes}
                    />
})

    useEffect(() => {
        document.title="My Trails | Social"
    }, [])

    return (
        <div className='user-cards-list'>
            <h1 className='user-cards-header'>Friends</h1>
            <Card.Group itemsPerRow={3}>
                {eachUser}
            </Card.Group>
        </div>
    )
}

export default Social