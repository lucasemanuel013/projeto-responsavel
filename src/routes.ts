import { Router } from "express";
import { DespesaController } from "./controllers/DespesaController";
import { ResponsavelController } from './controllers/ResponsavelController'

const routes = Router()

const responsavelController = new ResponsavelController()
const despesaController = new DespesaController()

routes.post('/responsavel', responsavelController.create)
routes.get('/responsavel', responsavelController.index)

routes.post('/despesas', despesaController.create)
routes.get('/despesas', despesaController.index)
routes.get('/despesas/:id', despesaController.show)
routes.delete('/despesas/:id', despesaController.delete)
routes.put('/despesas/:id', despesaController.update)

export { routes }