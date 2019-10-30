process.stdout.write('\033c');

const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()

// CONFIG AND ENVIRONMENT LOADING FROM .env FILE
let config = require('./.env')
const environment = process.env.NODE_ENV
config = config[environment]
if (!config) {
  throw new Error(`❌ Invalid ${environment} environment`)
}

// MIDDLEWARES
app.use(cors())
app.use(morgan('combined'))
app.use(express.json())



// NONGOOSE
mongoose.connect(
  config.mongoURL + config.mongoDBName, 
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  err => { if (err) { throw new Error(err) } console.info('💾  Mongoose is connected') }
)

// ROUTING
const apiRouter = require('./routes')
app.use('/api',  apiRouter)


// Init server
app.listen(config.port, (err) => {
  if (err) {
    throw new Error(err)
  }
  console.info('\n\n' + '>'.repeat(40))
  console.info('💻  Reboot Server Live')
  console.info(`📡  PORT: http://localhost:${config.port}`)
  console.info('>'.repeat(40) + '\n\n')
})