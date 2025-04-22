import { useState } from "react"


export default function Recipe (){

    const [ingredients, setIngredients] = useState([])

    const ing = ingredients.map((ingredient) => { 
        return <li key={ingredient}> {ingredient} </li>
    })

    function handleIngredient (event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const newerIng = formData.get("ingredient") 
        
        setIngredients(function (prevIng) {
            return [...prevIng, newerIng ]
        })
        
        event.target.reset()
        
    }
  

    return(
        <main className="main-container">
            <form className="entry-container" onSubmit={handleIngredient}>
                <label htmlFor="ingredient">
                    <input  name="ingredient" type="text" placeholder="Eg. Tomatoes" required/>
                </label>
                <button > &#43; Add ingredient</button> 
            </form>
            <h1>Ingredients on hand...</h1>
            <ol>
                {ing}
            </ol>

            <div className="generate-container">
                <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button> Get a recipe </button>
            </div>
        </main>
    )
}