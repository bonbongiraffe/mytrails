import UserCard from "./UserCard"
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

// const eachUser = users.filter(eachUser => eachUser.id !== user.id).map(filteredUser => {
//     return <UserCard key={filteredUser.id}
//                     name={filteredUser.username}
//                     image={filteredUser.profile_image}
//                     hikes={filteredUser.hikes}
//                     />
// })

const [search, setSearch] = useState('');
const filteredUsers = users
        .filter(eachUser => eachUser.id !== user.id) // Exclude current user
        .filter(filteredUser => filteredUser.username.toLowerCase().includes(search.toLowerCase())) // Apply search filter
        .map(filteredUser => (
            <UserCard
                key={filteredUser.id}
                name={filteredUser.username}
                image={filteredUser.profile_image}
                hikes={filteredUser.hikes}
            />
        ));


    useEffect(() => {
        document.title="My Trails | Social"
    }, [])

    return (
        <div className='user-cards-list'>
            <h1 className='user-cards-header'>Friends</h1>
            <div className="search-container">
                <input
                    className="search-input"
                    icon="search"
                    placeholder="Search friends . . ."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <Card.Group itemsPerRow={3}>
                {/* {eachUser} */}
                {filteredUsers}
            </Card.Group>
        </div>
    )
}

export default Social