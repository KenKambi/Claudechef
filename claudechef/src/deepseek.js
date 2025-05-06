

const systemPrompt = "I am an ai assistant tasked with the role of generating a recipe based on the list of ingredints given. Use them plus other suggested ingredients  to generate a recipe. Convert  it into maekdown in order to be rendered on a website page . "

const async function getRecipe(ingredientsArray) {

    const ingredientsString = ingredientsArray.join(",")

    try {
    const aiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer <OPENROUTER_API_KEY>",
          "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
          "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "deepseek/deepseek-r1:free",
          "messages": [
            {
              "role": "user",
              "content": systemPrompt
            },
            {
                "role": "user",
                "content": `I have ${ingredientsString} . Please give me a recipe you'd recommend I make.`
            }
          ]
        })
      });
      
      return aiResponse.choices[0].message.content
    }
    catch(error){
        console.log("error")
    };
}

