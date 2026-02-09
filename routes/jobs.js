import { Router } from "express";
import { JobsController } from "../jobs";

const jobsRouter = Router()

jobsRouter.get('/', JobsController.getAll)
jobsRouter.get('/:id', JobsController.getId)
jobsRouter.post('/', JobsController)

// Hacer >> 

jobsRouter.put('/:id', JobsController.update)
jobsRouter.patch('/:id', JobsController.partialUpdate)
jobsRouter.delete('/:id', JobsController.delete)
