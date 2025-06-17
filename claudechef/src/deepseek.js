const SYSTEM_PROMPT = `I am an ai assistant tasked with the role of generating a recipe \
                    based on the list of ingredints given. \
                    Use them plus other suggested ingredients to generate a recipe. \
                    Make it interesting and use emojis. \
                    Convert it into markdown in order to be rendered on a website page. \
                    Also, don't mention that you are an AI bot`;

//Deepseek API call function 
export async function deepseekGetRecipe(ingredientsArray) {
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
        body: JSON.stringify({ ingredients: ingredientsArray }),
      }
    );

    const data = await aiResponse.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    console.log("Error generating recipe!")
  }
}
