
//Deepseek API call function 
export async function deepseekGetRecipe(ingredients) {
  
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
