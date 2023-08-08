import { useEffect,useState } from "React"

function Authentication(){
    const [ isLogin, setIsLogin ] = useState(False)
    const [ formData, setFormData ] = useState({username:"",password:""})

    function handleSubmit(){

    }

    return(
        <div class="authentication">
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">username</label>
                    <input 
                        onChange= {handleName}
                        type="text"
                        username= "username"
                        placeholder="username"
                        className="input-text"
                        value={formData.name}
                    ></input>
            </form>
        </div>
    )
}

export default Authentication