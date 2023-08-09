import {useState} from "react"

function HikeForm({ user, trail=null }){
    const [formData, setFormData] = useState({difficulty:0,rating:0,review:""})

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        fetch('/hikes',{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({...formData, user_id: user.id})
        })
            .then( r => r.json())
            .then( newHike => console.log(newHike))
    }

    if (!!trail){
        setFormData({...formData, trail_id: trail.id})
    }

    return(
        <div className = "hikeForm">
            <form onSubmit={handleSubmit}>
                <label htmlFor="difficulty">Difficulty
                    <input
                        onChange= {(e)=>{setFormData({...formData, difficulty: parseInt(e.target.value)})}}
                        type="number"
                        difficulty= "difficulty"
                        placeholder="difficulty"
                        className="input-number"
                        value={formData.difficulty}
                    ></input>
                </label>
                <label htmlFor="rating">Rating
                    <input
                        onChange= {(e)=>{setFormData({...formData, rating: parseInt(e.target.value)})}}
                        type="number"
                        rating= "rating"
                        placeholder="rating"
                        className="input-number"
                        value={formData.rating}
                    ></input>
                </label>
                <label htmlFor="review">Review
                    <input
                        onChange= {(e)=>{setFormData({...formData, review: e.target.value})}}
                        type="text"
                        review= "review"
                        placeholder="review"
                        className="input-text"
                        value={formData.review}
                    ></input>
                </label>
                {trail ? 
                null
                :
                <label htmlFor="trailId">Trail Id
                    <input
                        onChange= {(e)=>{setFormData({...formData, trail_id: parseInt(e.target.value)})}}
                        type="number"
                        trailId= "trailId"
                        placeholder="trail_id"
                        className="input-number"
                        value={formData.trailId}
                    ></input>
                </label>
                }
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default HikeForm