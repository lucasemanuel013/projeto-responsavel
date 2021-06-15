import { getCustomRepository } from 'typeorm'
import { ResponsavelRepository } from '../repositories/ResponsavelRepository'

interface IResponsavelCreate {
  nome: string;
  telefone: string;
}

interface IClientsShow {
  id: string
}

interface IClientsUpdate {
  id: string
  cliente: string;
  telefone: string;
  email: string
}

class ResponsavelServices {

  async create({ nome, telefone }: IResponsavelCreate) {

    const responsavelRepository = getCustomRepository(ResponsavelRepository)

    const verificarNome = await responsavelRepository.findOne({
      nome
    })

    if (verificarNome) {
      throw new Error('Esse nome já foi cadastrado!')
    }

    const responsavel = responsavelRepository.create({
      nome,
      telefone
    })

    await responsavelRepository.save(responsavel)

    return responsavel
  }

  async index() {
    const responsavelRepository = getCustomRepository(ResponsavelRepository)

    const responsaveis = await responsavelRepository.find()

    return responsaveis;
  }
/*
  //async show({ id: string }) {
  async show({ id }: IClientsShow) {
    const clientsRepository = getCustomRepository(ClientsRepository)

    const clients = await clientsRepository.findOne({ id })

    console.log(clients)

    if (!clients) {
      throw new Error('User id not found!!')
    }

    return clients;
  }
*/
/*
  async delete({ id }: IClientsShow) {
    const clientsRepository = getCustomRepository(ClientsRepository)

    const clients = await clientsRepository.findOne({ id })

    if (!clients) {
      throw new Error('User id not found!!')
    }

    return await clientsRepository.delete({ id })
  }
*/
/*
  async update({ id, cliente, telefone, email }: IClientsUpdate) {
    const clientsRepository = getCustomRepository(ClientsRepository)

    let clients = await clientsRepository.findOne({ id })

    // quando não encontra o id -> clients = undefined (false)
    // quando encontra o id -> clients = objeto (id, cliente, telefone, email) - (true)

    if (!clients) {
      throw new Error('Client id not found!!')
    }

    await clientsRepository.update(
      id, {
      cliente,
      telefone,
      email
    })

    clients = await clientsRepository.findOne({ id })

    return clients

  }
*/
}

export { ResponsavelServices }