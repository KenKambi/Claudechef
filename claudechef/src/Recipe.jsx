import { useState } from "react";

export default function Recipe() {
  const [ingredients, setIngredients] = useState([]);
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

  //console.log(typeof(ingredients))

  function getRecipe() {
    setGenerate((prevGenerate) => !prevGenerate);
  }
  console.log(generate);

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
          <button onClick={getRecipe}> {!generate ? "Get a" : "Hide"} recipe </button>
        </div>
      ) : null}

      {generate && <div id="recipeOutput">
        <h2 id="recipeTitle">Recipe Name</h2>

        <p id="recipeDescription">
          A delicious twist on your everyday meal 🍽️✨ – easy to make and hard
          to forget!
        </p>

        <h3>Ingredients</h3>
        <ul id="ingredientList">
          <li>Tomatoes</li>
          <li>Onions</li>
          <li>Garlic</li>
          <li>Suggested: Olive oil</li>
        </ul>

        <h3>Preparation</h3>
        <ol id="preparationSteps">
          <li>Chop all vegetables finely.</li>
          <li>Heat olive oil in a pan and sauté garlic until golden.</li>
          <li>Add onions and cook until translucent.</li>
          <li>Add tomatoes and simmer for 15 minutes.</li>
        </ol>

        <h3>How to Serve & Enjoy</h3>
        <p id="serveTips">
          Serve hot with a slice of toasted bread 🥖 or over freshly cooked
          pasta 🍝. Top it with a sprinkle of parmesan 🧀 and enjoy with a glass
          of wine or your favorite drink! 🍷😋
        </p>
      </div>}
    </main>
  );
}
