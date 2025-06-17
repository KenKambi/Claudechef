
export async function handler (event){
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

    if (!OPENROUTER_API_KEY){
        return {
            statusCode: 500,
            body: JSON.stringify({error: "API key not found!"}),
        }
    }

    const {ingredients} = JSON.parse(event.body || "{}");

    const response = await fetch ("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://kenkambi.github.io/claudechef",
      "X-Title": "Claude Chef",
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-r1:free",
      messages: [
        {
          role: "system",
          content: `You are a helpful recipe generator. Use the ingredients given to suggest a recipe. Format in markdown. Use emojis.`,
        },
        {
          role: "user",
          content: `I have ${ingredients.join(", ")}`,
        },
      ],
    }),
  })
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({ result: data.choices[0].message.content }),
  };

}