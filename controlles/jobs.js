import { DEFAULT } from "../config";
import { JobModel } from "../models/jobs";

//clase con propiedades estaticas
export class JobsController {
    static async getAll(req, res) {
        const { text, title, level, limit = DEFAULT.LIMIT_PAGINATION, technology, offset = DEFAULT.LIMIT_OFFSET } = req.query

        const paginatedJobs = await JobModel.getAll({ text, title, level, limit, technology, offset })

        return res.json({ data: paginatedJobs, total: filteredJobs.length, limit: limitNumber, offset: offsetNumber,
        })
    }
    static async getId(req, res) {
        const { id } = req.params

        const job = await JobModel.getById(id)
        if (!job) {
            return res.status(404).json({ error: 'job not found' })
        }
        return res.json(job)
    }
    static async create(req, res) {
        const { titulo, empresa, ubicacion, data } = req.body

        const newJob = await JobModel.create({ titulo, empresa, ubicacion, data })
        return res.status(201).json(newJob)
    }
    static async update(req, res) {
        const { id } = req.params

        const updateJob = await JobModel.updateById(id, req.body)
        if (!updateJob) {
            return res.status(404).json({
                error: 'recurso no encontrado'
            })
        }
        return res.status(200).json(updateJob)
    }
    static async partialUpdate(req, res) {
        const { id } = req.params

        const partialUpdateJob = await JobModel.partialUpdateById(id, req.body)
        if (!partialUpdateJob) {
            return res.status(400).json({
                error: 'No hay campos para actualizar'
            })
        }
        return res.status(200).json(partialUpdateJob)

    }
    static async delete(req, res) {
        const { id } = req.params

        const deleteJob = await JobModel.deleteById(id)
        if (!deleteJob) {
            return res.status(404).json({
                error: 'Trabajo no encontrado'
            })
        }
        return res.status(200).end()
    }
}
