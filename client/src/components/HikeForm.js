import useState from "react"

function HikeForm({ user, trail=null }){
    const [formData, setFormData] = useState({difficulty:0,rating:0,review:"",trailId:trail.get(id)})

    const handleSubmit = () => {
        fetch('hikes',{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({...formData})
        })
            .then( r => r.json())
            .then( newHike => console.log(newHike))
    }

    return(
        <div className = "hikeForm">
            <form onSubmit={handleSubmit}>
                <label htmlFor="difficulty">Difficulty
                    <input
                        onChange= {(e)=>{setFormData({...formData, difficulty: e.target.value})}}
                        type="number"
                        difficulty= "difficulty"
                        placeholder="difficulty"
                        className="input-number"
                        value={formData.difficulty}
                    ></input>
                </label>
                <label htmlFor="rating">Rating
                    <input
                        onChange= {(e)=>{setFormData({...formData, rating: e.target.value})}}
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
                {formData.trailId ? 
                <label htmlFor="trailId">Trail Id
                    <input
                        onChange= {(e)=>{setFormData({...formData, trailId: e.target.value})}}
                        type="text"
                        trailId= "trailId"
                        placeholder="trailId"
                        className="input-text"
                        value={formData.trailId}
                    ></input>
                </label>
                :
                null }
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default HikeForm