/* Create a config object with an API Key
Creates OpenAIApi object
response variable retrieves list of all models from OpenAI API
*/

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = openai.listModels();

/* To have ChatGPT reply to user questions,
I have to take in user input, send that input to OpenAI API
to be processed, and then use ChatGPT model to generate a response
*/

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function generateResponse(prompt) {
  const model = "text-davinci-002";
  const completions = await openai.complete({
    engine: model,
    prompt: prompt,
    maxTokens: 64,
  });
  return completions.choices[0].text;
}

async function askQuestion() {
  rl.question("How many sources of sustainable energy are there in 2023?", async (question) => {
    const response = await generateResponse(question);
    console.log("ChatGPT: " + response);
    askQuestion();
  });
}

askQuestion();
