import { NavLink } from "react-router-dom";
import '../styling/NavBar.css';
import mytrails from '../myTrails.png'

function NavBar( { user, setUser, navigate } ) {    

    const handleLogout = () => {
    fetch("/logout",{
      method: "DELETE"
    })
      .then( r => {
        if (r.ok) {
          setUser(null)
          navigate('/')
        }
      })
    }

    return (
        <div className="header">
            <div className="left-side-nav">
                <img className="my-trails" src={mytrails} alt='My Trails' height={100}/>
            </div>
            <div className="center-nav">
                {user ? <><p>Welcome, {user.username}</p><img /></> : null}
            </div>
            <div className="nav-bar">
                <li className="nav-bar-list"><NavLink className="nav-bar-link" to="home">Home</NavLink></li>
                <li className="nav-bar-list"><NavLink className="nav-bar-link" to="social">Social</NavLink></li>
                <li className="nav-bar-list"><NavLink className="nav-bar-link" to="hikes">My Hikes</NavLink></li>
                <li className="nav-bar-list"><button className="nav-bar-link" onClick={handleLogout}>Logout</button></li>
            </div>
        </div>

    )
}

export default NavBar