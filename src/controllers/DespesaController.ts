import { Request, Response } from 'express'
import { DespesaServices } from '../services/DespesaServices'

class DespesaController {

  async create(request: Request, response: Response) {
    try {
      const { data_compra, local_compra, valor, id_responsavel } = request.body

      if (!data_compra || !local_compra || !valor || !id_responsavel) {
        return response.json({ message: 'Envie todos os dados corretamente. Envie no corpo da requisição: data_compra, local_compra, valor, id_responsavel' })
      }

      const despesaServices = new DespesaServices()

      const despesa = await despesaServices.create({
        data_compra,
        local_compra,
        valor,
        id_responsavel
      })

      return response.json(despesa)
    } catch (error) {
      return response.json({ message: error.message })
    }
  }

  async index(request: Request, response: Response) {
    const despesaServices = new DespesaServices()
    const despesas = await despesaServices.index()
    return response.json(despesas)
  }

  async show(request: Request, response: Response) {
    try {
      const { id } = request.params
      const despesaServices = new DespesaServices()
      const despesas = await despesaServices.show({id})
      return response.json(despesas)
    } catch (error) {
      return response.json({ message: error.message })
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params
      const despesaServices = new DespesaServices()
      await despesaServices.delete({id})

      return response.json({ message: 'Despesa deletada com sucesso' })
    } catch (error) {
      return response.json({ message: error.message })
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { data_compra, local_compra, valor, id_responsavel } = request.body
      const { id } = request.params;

      if (!data_compra || !local_compra || !valor || !id_responsavel) {
        return response.json({ message: 'Envie todos os dados corretamente. Envie no corpo da requisição: data_compra, local_compra, valor, id_responsavel' })
      }

      const despesaServices = new DespesaServices()
      
      const despesa = await despesaServices.update({
        id,
        data_compra,
        local_compra,
        valor,
        id_responsavel
      })

      return response.json(despesa)
    } catch (error) {
      return response.json({ message: error.message })
    }
  }

}

export { DespesaController }