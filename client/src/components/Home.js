import TrailCard from "./TrailCard"
import NavBar from "./NavBar.js"

function Home({user, setUser, navigate}){
    return(
        <div>
            <NavBar user={user} setUser={setUser} navigate={navigate}/>
            <TrailCard />
        </div>
    )
}

export default Home