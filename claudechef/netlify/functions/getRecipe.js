const SYSTEM_PROMPT = `I am an ai assistant tasked with the role of generating a recipe \
                    based on the list of ingredints given. \
                    Use them plus other suggested ingredients to generate a recipe. \
                    Make it interesting and use emojis. \
                    Convert it into markdown in order to be rendered on a website page. \
                    Also, don't mention that you are an AI bot`;

export async function handler(event) {
  const OPENROUTER_API_KEY =  process.env.OPENROUTER_API_KEY;
  //console.log("Incoming event:", event); // 🔍 Log event
  //console.log("API KEY exists?"); // 🔍 Confirm key loaded


  if (!OPENROUTER_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key not found!" }),
    };
  }
  try {
    const { ingredients } = JSON.parse(event.body || "{}");

    if (!Array.isArray(ingredients)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Ingredients must be an array." }),
      };
    }

    const ingredientsString = ingredients.join(", ");

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://myclaudechef.netlify.app",
          "X-Title": "Claude Chef",
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
//error handling message 
    console.log("API response status:", response.status);
const data = await response.json();
console.log("API response body:", JSON.stringify(data));

    return {
      statusCode: 200,
      body: JSON.stringify({ result: data.choices[0].message.content }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error: " + e.message }),
    };
  }
}
