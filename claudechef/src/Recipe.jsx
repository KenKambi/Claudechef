import { useState } from "react";
import Generated from "./Generated";
import { deepseekGetRecipe } from "./deepseek";

export default function Recipe() {
  const [ingredients, setIngredients] = useState([]);
  const [generate, setGenerate] = useState("");
  const [loading, setLoading] = useState(true)

  const ing = ingredients.map((ingredient) => {
    return <li key={ingredient}> {ingredient} </li>;
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

 async function getRecipe() {
   // setGenerate((prevGenerate) => !prevGenerate);
    setLoading(false)
    const ans = await deepseekGetRecipe(ingredients)
    setGenerate(ans)
    setLoading(true)
  }

  return (
    <main className="main-container">
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

      <div>  </div>

      {ingredients.length <= 3 && (
        <p> Enter a list of at least three (3) ingredients above ...</p>
      )}

      {ingredients.length > 0 && <h1>Ingredients on hand...</h1>}

      <ol>{ing}</ol>

      {ingredients.length > 3 ? (
        <div className="generate-container">
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={getRecipe}>
            {!generate ? "Get a" : "Regenerate"} recipe{" "}
          </button>
        </div>
      ) : undefined}

      {!loading ? <img className="loading" src="src/Circles-menu-3.gif" alt="Loading..." /> : ""}

      {generate ?  <Generated generate = {generate} /> : ""}
    </main>
  );
}
