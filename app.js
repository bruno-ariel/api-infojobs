import express from "express";
import { DEFAULT } from "./config.js";
import { corsMiddlewares } from "./middlewares/cors.js";
import { jobsRouter } from './routes/jobs.js'

const PORT = process.env.PORT ?? DEFAULT.PORT

const app = express();

app.use(corsMiddlewares()) // <---- cors middleware

app.use(express.json())

app.use('/jobs', jobsRouter) // <---- router con todas las rutas


if(process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => { 
    console.log(`servidor escuchado en http://localhost:${PORT}`);
});
}


export default app