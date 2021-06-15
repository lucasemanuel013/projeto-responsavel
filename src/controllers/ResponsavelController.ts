import { Request, Response } from 'express'
import { ResponsavelServices } from '../services/ResponsavelServices'

class ResponsavelController {
  async create(request: Request, response: Response) {
    try {
      const { nome, telefone } = request.body

      if (!nome || !telefone) {
        return response.json({ message: 'Envie todos os dados corretamente. Envie no corpo da requisição: nome, telefone' })
      }

      const responsavelServices = new ResponsavelServices()
      const responsavel = await responsavelServices.create({
        nome,
        telefone
      })
      
      return response.json(responsavel)

    } catch (error) {
      return response.json({ message: error.message })
    }
  }

  async index(request: Request, response: Response) {
    const responsavelServices = new ResponsavelServices()
    const responsaveis = await responsavelServices.index()
    return response.json(responsaveis)
  }

}

export { ResponsavelController }