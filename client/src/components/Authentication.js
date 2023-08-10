import { useState, useEffect } from "react"
import '../styling/Auth.css'
import mytrails from '../myTrails.png'

function Authentication({ setUser, navigate }){

    useEffect(() => {
        document.title="My Trails"
    }, [])

    const [ isLogin, setIsLogin ] = useState(0) // if 1 we'll fetch to .../login, if 2, we'll fetch to .../signup
    const [ formData, setFormData ] = useState({username:"",password:""}) // holds login form data

    function handleSubmit(e){
        e.preventDefault()
        const route = isLogin === 1 ? "login" : "signup"
        fetch(`/${route}`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })
            .then( r => r.json())
            .then( user => {
                if (user)
                    setFormData({username:"",password:""})
                setUser(user)
                navigate('home')
            })
    }

    return(
        <div className="authentication">
            <p className="welcome">Welcome to</p>
            <img className='my-trails'src={mytrails} alt="My Trails" height={175}/>
            <p className="continue">To continue, please Login or Signup.</p>
            {isLogin === 0 ? 
            <div className="login-or-signup">
                <button onClick={(e)=>{setIsLogin(1)}}>Login</button>
                <button onClick={(e)=>{setIsLogin(2)}}>Signup</button>
            </div>
            :
            <div className="form-div">
                <form className="login-signup-form" onSubmit={handleSubmit}>
                    <label htmlFor="username">username:</label>
                        <input 
                            onChange= {(e)=>{setFormData({...formData, username: e.target.value})}}
                            type="text"
                            name= "username"
                            placeholder="username"
                            className="input-text"
                            value={formData.username}
                        ></input>
                    <label htmlFor="password">password:</label>
                        <input 
                            onChange= {(e)=>{setFormData({...formData, password: e.target.value})}}
                            type="password"
                            name= "password"
                            placeholder="password"
                            className="input-text"
                            value={formData.password}
                        ></input>
                    <button className="submit-btn" type="submit">{isLogin === 1 ? "Login" : "Signup"}</button>
                </form>
            </div>
            }
        </div>
    )
}

export default Authentication