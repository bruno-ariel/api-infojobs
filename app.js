import express from "express";
import { corsMiddlewares } from "./middlewares/cors.js";
import { jobsRouter } from './routes/jobs.js'


const app = express();

app.use(corsMiddlewares())
app.use(express.json())
app.use('/jobs', jobsRouter)


export default app