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

// take in user input 
const readline = require("readline");

// allow user to input questions via command line and receive responses
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// use OpenAI API to generate response
// completion with highest probability is returned as string
async function generateResponse(prompt) {
  const model = "text-davinci-002";
  const completions = await openai.complete({
    engine: model,
    prompt: prompt,
    maxTokens: 64,
  });
  return completions.choices[0].text;
}

// prompt user to input question, generate response, print response
// to console, then calls askquestion again to prompt for another question
async function askQuestion() {
  rl.question("How many sources of sustainable energy are there in 2023?", async (question) => {
    const response = await generateResponse(question);
    console.log("ChatGPT: " + response);
    askQuestion();
  });
}

askQuestion();
