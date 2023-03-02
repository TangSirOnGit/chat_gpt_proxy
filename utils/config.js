require('dotenv').config()

const PORT = process.env.PORT
const OPENAI_API_KEY=process.env.OPENAI_API_KEY
module.exports = {
  PORT,
  OPENAI_API_KEY
}