import express, { json, urlencoded } from 'express'
import mainRouter from './src/routes/index.js'
import dotenv from 'dotenv'
import { errorHandler } from './src/middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
dotenv.config();  

const app = express()


// APPLICATION MIDDLEWARES
app.use(json())
app.use(urlencoded({extended: true}))
app.use(cookieParser())


// API-GATEWAYS
app.use(`/api/${process.env.version}`, mainRouter)

// MUST be last middleware
app.use(errorHandler);

export default app

