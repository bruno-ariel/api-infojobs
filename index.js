import express from "express";
import cors from "cors";
import jobs from "./jobs.json" with { type: "json" };
import { DEFAULT } from "./config.js";
import crypto from "node:crypto";

const PORT = process.env.PORT ?? DEFAULT.PORT;

const app = express();

const ACCEPTED_ORIGINS = [
    "http://localhost:3000",
    "http://midu.dev",
    "http://localhost:5173",
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error("origen no permitido"));
        },
    }),
);

app.use(express.json());

// Alternativa 2 para traer un fichero

// import { readFileSync } from 'node:fs'

// const jobs = JSON.parse(readFileSync('./jobs.json', 'utf-8'))

app.use((req, res, next) => {
    const timeString = new Date().toLocaleDateString();

    console.log(`[${timeString}]${req.method} ${req.url}`);
    next();
});

// Alternativa 3 para traer un fichero solo cuando se lo necesita

/* app.get('/get-jobs', async (req,res)=>{
    const {default : jobs} = await import('./jobs.json', {with: {type: 'json'}})
    return res.json(jobs)
}) */

// En get-single-job tenemos un parámetro DINÁMICO que recuperamos asi req.params
// Los parametros que me esta devolviendo son cadenas de texto STRINGS

// Idempotente: porque el sistema queda igual si llamas varias veces
app.get("/jobs/:id", (req, res) => {
    const { id } = req.params;

    const job = jobs.find((job) => job.id === id);

    if (!job) {
        return res.status(404).json({ error: "job not found" });
    }

    return res.json(job);
});

app.post("/jobs", (req, res) => {
    const { titulo, empresa, ubicacion, data, id } = req.body;

    const newJob = {
        id: crypto.randomUUID(),
        titulo,
        empresa,
        ubicacion,
        data,
    };

    jobs.push(newJob);

    return res.status(201).json(newJob);
});

app.put("/jobs/:id", (req, res) => {
    const { id } = req.params;

    const index = jobs.findIndex((job) => job.id === id);
    if (index === -1) {
        return res.status(404).json({
            error: "El trabajo que quieres modificar no fue encontrado",
        });
    }
    const updateJob = {
        ...req.body,
        id,
    };

    jobs[index] = updateJob;
    return res.status(200).json(updateJob);
});

app.patch("/jobs/:id", (req, res) => {
    const { id } = req.params;

    const job = jobs.find((job) => job.id === id);
    if (!job) {
        return res.status(404).json({
            error: "No encontrado",
        });
    }

    Object.assign(job, {
        ...req.body,
    });

    return res.json(job);
});

app.delete("/jobs/:id", (req, res) => { });

app.get("/health", (req, res) => {
    return res.json({
        status: "ok",
        uptime: process.uptime(),
    });
});

app.get("/jobs", (req, res) => {
    const {
        text,
        title,
        level,
        limit = DEFAULT.LIMIT_PAGINATION,
        technology,
        offset = DEFAULT.LIMIT_OFFSET,
    } = req.query;

    let filteredJobs = jobs;

    if (text) {
        const searchTerm = text.toLocaleLowerCase();
        filteredJobs = filteredJobs.filter(
            (job) =>
                job.titulo.toLocaleLowerCase().includes(searchTerm) ||
                job.descripcion.toLocaleLowerCase().includes(searchTerm),
        );
    }

    if (technology) {
        filteredJobs = filteredJobs.filter((job) =>
            job.technology.includes(technology),
        );
    }

    const limitNumber = Number(limit);
    const offsetNumber = Number(offset);

    const paginatedJobs = filteredJobs.slice(
        offsetNumber,
        offsetNumber + limitNumber,
    );

    // Terminar los filtros y mejorar el código con las cosas comentadas

    return res.json({
        data: paginatedJobs,
        total: filteredJobs.length,
        limit: limitNumber,
        offset: offsetNumber,
    });
});

// Filtrar empleos
// Grandes ventajas que tiene express, los query params
// A diferencia de node Js nativo que teniamos que pasar la url manualmente transformarla
// en un Objeto Search Params, express ya te lo da todo masticado en un objeto React rect.query

app.listen(PORT, () => {
    console.log(`servidor escuchado en http://localhost:${PORT}`);

    /* const previusHomeMiddleware = (req,res,next) =>{
            console.log('Ejecutando el middleware previo a la ruta / ')
            next()
        } */

    /* app.get('/', previusHomeMiddleware ,(req, res)=>{
            res.send('Hello Word!')
        }) */
});
