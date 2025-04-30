import { useState } from "react";
import Generated from "./Generated";

export default function Recipe() {
  const [ingredients, setIngredients] = useState([
    "tomatoes",
    "onions",
    "ginger",
    "garlic",
  ]);
  const [generate, setGenerate] = useState(false);

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

  function getRecipe() {
    setGenerate((prevGenerate) => !prevGenerate);
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
            {!generate ? "Get a" : "Hide"} recipe{" "}
          </button>
        </div>
      ) : undefined}

      {generate && <Generated />}
    </main>
  );
}
