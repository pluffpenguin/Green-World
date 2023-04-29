const dotenv = require("dotenv")
dotenv.config()

const {Configuration, OpenAIApi} = require("openai")

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);

const input = "What are the most viable sustainable energy sources?";

async function get_response(prompt) {
  const response = await openai.createChatCompletion({
    "model": "gpt-3.5-turbo",
    "messages": [
      {
        "role": "user", 
        "content": prompt
      }
    ]
  })
  return response
}

get_response(input).then((response) => {
  console.log(response.data.choices[0].message.content)
})

