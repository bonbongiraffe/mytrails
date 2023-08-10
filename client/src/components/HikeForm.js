import { useState, useEffect } from "react"
import '../styling/Hike.css'

function HikeForm({ user, trail=null, addNewHike }){
    const [ formData, setFormData ] = useState({difficulty:0,rating:0,review:""})
    const [ inputTrail, setInputTrail  ] = useState("")
    const [ trailNames, setTrailNames ] = useState([])
    // const [ selectedTrail, setSelectedTrail ] = useState(null)

    useEffect(() => {
        fetch('/trails')
            .then(r => r.json())
            .then(trails => setTrailNames(trails.map(trail => trail.name)))
    },[])

    const handleTabPress = (e) => {
        const matchingTrail = trailNames.find((trail) =>
            trail.toLowerCase().startsWith(inputTrail.toLowerCase())
        )
        // console.log(trailNames.indexOf(inputTrail)+1)
        // console.log(matchingTrail)
        if (e.key === 'Tab'){
            e.preventDefault()
            setInputTrail(matchingTrail)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //console.log(formData)
        fetch('/hikes',{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({...formData, user_id: user.id,
                trail_id: trailNames.indexOf(inputTrail)+1
            })
        })
            .then( r => r.json())
            .then( newHike => addNewHike(newHike))
    }

    if (!!trail){
        setFormData({...formData, trail_id: trail.id})
    }

    return(
        <div className = "hikeForm">
            <form onSubmit={handleSubmit}>
                <label htmlFor="difficulty">Difficulty:
                    <input
                        onChange= {(e)=>{setFormData({...formData, difficulty: parseInt(e.target.value)})}}
                        type="range"
                        className="input-range"
                        min={0}
                        max={5}
                        step={1}
                        value={formData.difficulty}
                    ></input>
                </label>
                <label htmlFor="rating">Rating:
                    <input
                        style={{}}
                        onChange= {(e)=>{setFormData({...formData, rating: parseInt(e.target.value)})}}
                        type="range"
                        className="input-range"
                        min={0}
                        max={5}
                        step={1}
                        value={formData.rating}
                    ></input>
                </label>
                <label htmlFor="review">Review:
                    <input
                        onChange= {(e)=>{setFormData({...formData, review: e.target.value})}}
                        type="text"
                        review= "review"
                        placeholder="Write your comments here..."
                        className="input-text"
                        value={formData.review}
                    ></input>
                </label>
                {trail ? 
                null
                :
                <label htmlFor="trailId">Trail Name:
                    <input
                        onChange={(e) => setInputTrail(e.target.value)}
                        onKeyDown={handleTabPress}
                        type="text"
                        placeholder="Trail name here..."
                        className="input-text"
                        value={inputTrail}
                    ></input>
                </label>
                }
                {trailNames.includes(inputTrail) ? <button type="submit" className="submit-btn">Submit</button> : <><p id="incomplete" className="incomplete-c">Incomplete Form.</p><p id="incomplete">To submit a hike, please fill out the form in its entirety with a valid trail name.</p></> }
            </form>
        </div>
    )
}

export default HikeForm