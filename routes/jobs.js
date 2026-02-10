import { Router } from "express";
import { JobsController } from "../controlles/jobs";

const jobsRouter = Router()

jobsRouter.get('/', JobsController.getAll)
jobsRouter.get('/:id', JobsController.getId)
jobsRouter.post('/', JobsController)
jobsRouter.put('/:id', JobsController.update)
jobsRouter.patch('/:id', JobsController.partialUpdate)
jobsRouter.delete('/:id', JobsController.delete)
