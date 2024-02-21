import type { APIRoute } from "astro";
import OpenAI from "openai";


export const POST: APIRoute = async ({ request }) => {
  const openai = new OpenAI({apiKey: import.meta.env.OPENAI_API_KEY});
  const data = await request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-4-turbo-preview",
    response_format: { type: "json_object" }
  });
  console.log(completion)
  const answer = completion.choices[0];
    return new Response(
      JSON.stringify({
        message: answer
      }),
      { status: 200 }
    );
  // Do something with the data, then return a success response
};