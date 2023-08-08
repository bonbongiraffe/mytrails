import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="header">
            <div className="left-side-nav">
                <p>My Trails</p>
            </div>
            <div className="nav-bar">
                <li className="nav-bar-list"><NavLink className="nav-bar-link" to="/">Home</NavLink></li>
                <li className="nav-bar-list"><NavLink className="nav-bar-link" to="hikes">My Hikes</NavLink></li>
                <li className="nav-bar-list"><NavLink className="nav-bar-link" to="social">Social</NavLink></li>
            </div>
        </div>

    )
}

export default NavBar