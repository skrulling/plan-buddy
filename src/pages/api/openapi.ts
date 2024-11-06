import { promises as fs } from 'fs';
import type { APIRoute } from "astro";
import OpenAI from "openai";
import { schema, systemMessage } from "../../utils/strings";

export const POST: APIRoute = async ({ request }) => {

  // return await debugMode();

  try {

    const openai = new OpenAI({ apiKey: import.meta.env.OPENAI_API_KEY });
    const data = await request.formData();
    const distance = data.get("distance");
    const level = data.get("level");
    const duration = data.get("duration");

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: `${systemMessage} ${schema}` },
        { role: "user", content: `target distance: ${distance}. My running level:${level}. The training plan duration should be: ${duration}` }
      ],
      // model: "gpt-4o",
      model: "gpt-4o-mini",
      // model: "gpt-3.5-turbo",
      response_format: { type: "json_object" }
    });

    console.log(completion)
    const answer = completion.choices[0];
    // // Define the directory where the file will be saved
    // const dir = './responses';
    // // Define the full path for the file
    // const filePath = path.join(dir, 'openai_response.json');
    // // Save the response to a file for debugging
    // try {
    //   // Ensure the directory exists
    //   await fs.mkdir(dir, { recursive: true });
    //   // Write the file
    //   await fs.writeFile(filePath, JSON.stringify({ message: answer }), 'utf8');
    //   console.log(`Response saved to ${filePath}`);
    // } catch (error) {
    //   console.error('Error saving the response:', error);
    //   // Return an error response or handle it appropriately
    // }
    return new Response(
      JSON.stringify({
        message: answer
      }),
      { status: 200 }
    );
  } catch (error) {

    return new Response(
      JSON.stringify({
        message: error
      }),
      { status: 500 }
    );
  }
  // Do something with the data, then return a success response
};

async function debugMode() {
  // Define the path for the file from which the response will be read
  const filePath = './responses/openai_response.json';

  try {
    // Read the file
    const fileContents = await fs.readFile(filePath, 'utf8');
    // Parse the JSON content of the file
    const answer = JSON.parse(fileContents).message;

    // Return the content of the file as the response
    return new Response(
      JSON.stringify({
        message: answer
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error reading the response file:', error);
    // Return an error response or handle it appropriately
    return new Response(
      JSON.stringify({
        error: 'Failed to read the response file'
      }),
      { status: 500 }
    );
  }
}
