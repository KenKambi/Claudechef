import { useEffect, useRef, useState } from "react";
import Generated from "./Generated";
import { deepseekGetRecipe } from "./deepseek";
import loadingGif from "./assets/Circles-menu-3.gif";

export default function Recipe() {
  const [ingredients, setIngredients] = useState([]);
  const [generate, setGenerate] = useState("");
  const [loading, setLoading] = useState(false);
  const recipeSection = useRef(null)

  const ing = ingredients.map((ingredient, index) => {
    return <li key={index} > {ingredient} <span></span> <button onClick={() => {removeIngredient(index)}}> Delete </button> </li>;
  });

  function handleIngredient(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newerIng = formData.get("ingredient");

    setIngredients(function (prevIng) {
      return [...prevIng, newerIng];
    });

    event.target.reset();
  }

//Function to remove an item on the list
  function removeIngredient (itemRemove){
    setIngredients((prevIng) => {
     return prevIng.filter( (_, index)=> index !== itemRemove)
    })
  }

  async function getRecipe() {
   
    setLoading(true);
    const ans = await deepseekGetRecipe(ingredients);
    setGenerate(ans);
    setLoading(false);
  }

  useEffect(() => {
    if (generate !== "" && recipeSection !== null){
      recipeSection.current.scrollIntoView({behavior : "smooth"})
    }
  }, [generate])

  return (
    <main className="main-container">
      <section>
      <form className="entry-container" onSubmit={handleIngredient}>
        <label htmlFor="ingredient">
          <input
            name="ingredient"
            type="text"
            placeholder="Eg. Tomatoes"
            required
          />
        </label>
        <button> &#43; Add ingredient</button>
      </form>
      </section>


      
      {ingredients.length <= 3 && (
        <p> Enter a list of at least four (4) ingredients above ...</p>
      )}

      {ingredients.length > 0 && <h1>Ingredients on hand...</h1>}

      <ol>{ing}</ol>

      {ingredients.length > 3 ? (
        <div ref={recipeSection} className="generate-container">
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={getRecipe}>
            {!generate ? "Get a" : "Regenerate"} recipe{" "}
          </button>
        </div>
      ) : undefined}

      {loading ? (
        <div className="loading">
          {" "}
          <img src={loadingGif} alt="Loading..." />{" "}
        </div>
      ) : (
        ""
      )}

      {generate ? <Generated generate={generate} /> : ""}
    </main>
  );
}
