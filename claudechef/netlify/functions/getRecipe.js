import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://myclaudechef.netlify.app", // Your live site URL
    "X-Title": "Claude Chef", 
  },
});

const SYSTEM_PROMPT = `I am an ai assistant tasked with the role of generating a recipe \
based on the list of ingredints given. \
Use them plus other suggested ingredients to generate a recipe. \
Make it interesting and use emojis. \
Convert it into markdown in order to be rendered on a website page. \
Also, don't mention that you are an AI bot`;

export async function handler(event) {
  try {
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

    if (!OPENROUTER_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "API key not found!" }),
      };
    }

    const { ingredients } = JSON.parse(event.body || "{}");

    if (!Array.isArray(ingredients)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Ingredients must be an array." }),
      };
    }

    const ingredientsString = ingredients.join(", ");

    const completion = await openai.chat.completions.create({
      model: "qwen/qwen-turbo",
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
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ result: completion.choices[0].message.content }),
    };
  } catch (e) {
     console.error("Server Error:", e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error: " + e.message }),
    };
  }
}
