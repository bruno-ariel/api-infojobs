import { Router } from "express";

import { JobsController } from "../controllers/jobs.js";

const jobsRouter = Router()

jobsRouter.get('/', JobsController.getAll)
jobsRouter.get('/:id', JobsController.getId)
jobsRouter.post('/', JobsController.create)
jobsRouter.put('/:id', JobsController.update)
jobsRouter.patch('/:id', JobsController.partialUpdate)
jobsRouter.delete('/:id', JobsController.delete)

export {jobsRouter}