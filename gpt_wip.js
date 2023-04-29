// initializing everything
const dotenv = require("dotenv")
dotenv.config()

const {Configuration, OpenAIApi} = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);

/////////////////////////////////////////////

const energySources = [
  "wind-turbines",
  "biomass-power-plant",
  "hydro-electric-dam",
  "geo-thermal-power-plant",
  "solar-energy",
  "nuclear-power-plant"
];

async function generateText(prompt) {
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
  //response.data.choices[0].message.content to access string
}

const energySourceTemplate = {
  name: "",
  description: "",
  pros: "",
  cons: "",
  cost: "",
  efficiency: "",
  future: "",
  location: ""
};

async function getEnergySourceData(name) {
  const descriptionPrompt = `Can you describe in two sentences, the sustainable energy resource ${name} and how it generates energy?`;
  const descriptionResponse = await generateText(descriptionPrompt);
  const description = descriptionResponse.data.choices[0].message.content;
  const energySource = { ...energySourceTemplate, name, description };
  
  const adjustment = "Please explain it in a way so a middle schooler can understand it in 2-3 sentences. Make sure not to include anything about 'As an AI language model'. ";
  
  const prosResponse = await generateText(`What are the pros of ${name}? ` + adjustment);
  energySource.pros = prosResponse.data.choices[0].message.content;

  const consResponse = await generateText(`What are the cons of ${name}? ` + adjustment);
  energySource.cons = consResponse.data.choices[0].message.content;

  const costResponse = await generateText(`How much does it cost to build ${name}?`);
  energySource.cost = costResponse.data.choices[0].message.content;

  const efficiencyResponse = await generateText(`How efficient is ${name}? ` + adjustment);
  energySource.efficiency = efficiencyResponse.data.choices[0].message.content;

  const futureResponse = await generateText(`What is the future of ${name}?` + adjustment);
  energySource.future = futureResponse.data.choices[0].message.content;

  const locationResponse = await generateText(`Where should ${name} be built?` + adjustment);
  energySource.location = locationResponse.data.choices[0].message.content;

  return energySource;
}


(async () => {
  for (const energySource of energySources) {
    const data = await getEnergySourceData(energySource);
    console.log(data);
  }
})();
