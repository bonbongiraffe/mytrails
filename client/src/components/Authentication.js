import { useState, useEffect } from "react"
import '../styling/Auth.css'

function Authentication({ setUser, navigate }){

    useEffect(() => {
        document.title="My Trails"
    }, [])

    const [ isLogin, setIsLogin ] = useState(0) // if 1 we'll fetch to .../login, if 2, we'll fetch to .../signup
    const [ formData, setFormData ] = useState({username:"",password:"", profile_image: null}) // holds login form data

    function handleSubmit(e){
        e.preventDefault()
        const route = isLogin === 1 ? "login" : "signup"

        let requestBody;
        let contentType;

        if(isLogin === 1){
            requestBody = JSON.stringify(formData);
            contentType = "application/json";
        } else {
            const formdata = new FormData();
            formdata.append('username', formData.username);
            formdata.append('password', formData.password);
            if (formData.image){
                formdata.append('image', formData.image);
            }
            requestBody = formdata;

            contentType = undefined
        }
        fetch(`/${route}`,{
            method: "POST",
            headers: contentType ? {"Content-Type": contentType} : {},
            body: requestBody
        })
            .then( r => {
                if (r.ok) {
                    return r.json()
                } else {
                    throw new Error('Request failed')
                }
            })
            .then( user => {
                if (user)
                    setFormData({username:"",password:""})
                setUser(user)
                navigate('home')
            })
            .catch( error => {
                console.log("Invalid login")
                setFormData({username:"",password:""})
            })
    }

    return(
        <div className="authentication">
            <p className="welcome">Welcome to My Hikes!</p>
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
                        {isLogin === 2 ? <div className='signup-image-upload'>
                            <label htmlFor='profile_image'>Profile Image:</label>
                            <input 
                                type="file"
                                name="image"
                                onChange={(e) => {setFormData({...formData, image: e.target.files[0]})}}/>
                        </div> : null}
                    <button className="submit-btn" type="submit">{isLogin === 1 ? "Login" : "Signup"}</button>
                </form>
            </div>
            }
        </div>
    )
}

export default Authentication