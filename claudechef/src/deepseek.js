const SYSTEM_PROMPT = `I am an ai assistant tasked with the role of generating a recipe \
                    based on the list of ingredints given. \
                    Use them plus other suggested ingredients to generate a recipe. \
                    Make it interesting and use emojis. \
                    Convert it into markdown in order to be rendered on a website page. \
                    Also, don't mention that you are an AI bot`;

//Deepseek API call function 
export async function deepseekGetRecipe(ingredientsArray) {
  const ingredientsString = ingredientsArray.join(",");
  const deepseekKey = import.meta.env.VITE_AI_API_KEY;
  try {
    const aiResponse = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${deepseekKey} `,
          "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
          "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT,
            },
            {
              role: "user",
              content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make.`,
            },
          ],
        }),
      }
    );

    const data = await aiResponse.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    console.log("Error fetching data!")
  }
}
