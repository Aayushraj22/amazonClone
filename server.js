import express, { json, urlencoded } from 'express'
import mainRouter from './src/routes/index.js'
import dotenv from 'dotenv'
import { errorHandler } from './src/middlewares/error.middleware.js';
dotenv.config();  

const app = express()


// APPLICATION MIDDLEWARES
app.use(json())
app.use(urlencoded({extended: true}))


// API-GATEWAYS
app.use(`/api/${process.env.version}`, mainRouter)

// MUST be last middleware
app.use(errorHandler);

export default app

