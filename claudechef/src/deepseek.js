
//Deepseek API call function 
export async function deepseekGetRecipe(ingredients) {
  //const ingredientsString = ingredientsArray.join(",");
  // const deepseekKey = import.meta.env.VITE_AI_API_KEY;
  try {
    const aiResponse = await fetch(
      "/.netlify/functions/getRecipe",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients }),
      }
    );

    const data = await aiResponse.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    console.log("Error generating recipe!")
  }
}
