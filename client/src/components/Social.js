import { useEffect }from "react"
import UserCard from "./UserCard"
import NavBar from "./NavBar.js"

function Social(){

    useEffect(() => {
        document.title="My Trails | Social"
    }, [])

    return (
        <div>
            <UserCard />
        </div>
    )
}

export default Social