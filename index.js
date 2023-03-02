const express = require("express");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const cors = require('cors')
const app = express();
app.use(express.json())
app.use(middleware.requestLogger)
app.use(cors())
app.use(express.static('build'))

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: config.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/prompt/", async (request, response) => {

  const paramMap = request.body;
  const promtContent=paramMap.prompt;
  console.log(`promtContent:${promtContent}`)
  const aiResponse = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: promtContent,
    temperature: 0,
    max_tokens: 1024,
  });
//   console.log(aiResponse.data);
if(aiResponse.data.choices){
    response.json(aiResponse.data.choices);
}else{
    response.json(aiResponse.data.error);
}
  
});

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
