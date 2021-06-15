import { getCustomRepository } from 'typeorm'
import { DespesaRepository } from '../repositories/DespesaRepository'
import { ResponsavelRepository } from '../repositories/ResponsavelRepository'

interface IDespesaCreate {
  data_compra: Date;
  local_compra: string;
  valor: number;
  id_responsavel: string;
}

interface IDespesaUpdate {
  id: string;
  data_compra: Date;
  local_compra: string;
  valor: number;
  id_responsavel: string;
}

interface IDespesaShow {
  id: string
}

class DespesaServices {
  async create({ data_compra, local_compra, valor, id_responsavel }: IDespesaCreate) {
    const despesaRepository = getCustomRepository(DespesaRepository)
    const responsavelRepository = getCustomRepository(ResponsavelRepository)
    
    const procurarResponsavel = await responsavelRepository.findOne({
      id: id_responsavel
    })

    if (!procurarResponsavel) {
      throw new Error('Nenhum responsável encontrado com esse id')
    }

    const ordemServico = despesaRepository.create({
      data_compra,
      local_compra,
      valor,
      id_responsavel
    })

    await despesaRepository.save(ordemServico)

    return ordemServico
  }
  async index() {
    const despesaRepository = getCustomRepository(DespesaRepository)

    const ordemServico = await despesaRepository.find({
      relations: ['responsavel']
    })

    return ordemServico
  }

  async show({ id }: IDespesaShow) {
    const despesaRepository = getCustomRepository(DespesaRepository)
    
    const despesas = await despesaRepository.findOne(id, {
      relations: ['responsavel']
    })

    if (!despesas) {
      throw new Error('Nenhuma despesa foi encontrada com esse id')
    }


    return despesas
  }

  
  async delete({ id }: IDespesaShow) {
    const despesaRepository = getCustomRepository(DespesaRepository)

    const despesa = await despesaRepository.findOne({ id })

    if (!despesa) {
      throw new Error('Nenhuma despesa foi encontrada com esse id')
    }

    return await despesaRepository.delete({ id })
  }

  async update({ id, data_compra, local_compra, valor, id_responsavel }: IDespesaUpdate) {
    const despesaRepository = getCustomRepository(DespesaRepository)
    const responsavelRepository = getCustomRepository(ResponsavelRepository)
    
    const procurarResponsavel = await responsavelRepository.findOne({
      id: id_responsavel
    })

    if (!procurarResponsavel) {
      throw new Error('Nenhum responsável encontrado com esse id')
    }

    despesaRepository.update(id, {
      data_compra,
      local_compra,
      valor,
      id_responsavel
    })

    const despesa = despesaRepository.findOne(id)
    return despesa
  }
}

export { DespesaServices }