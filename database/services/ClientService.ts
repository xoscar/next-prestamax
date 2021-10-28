import { getMongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { IRawClient, ISerializedClient } from '../interfaces/IClient';
import Client from '../models/Client';
import DatabaseConnection from '../utils/DatabaseConnection';
import LoanService from './LoanService';

export type ILoginUserResponse = ISerializedClient & {
  jwt: string;
};

export default class ClientService extends DatabaseConnection {
  static clientRepository = getMongoRepository(Client);

  static async getClientById(clientId: string): Promise<Client> {
    const client = await this.clientRepository.findOne({
      _id: new ObjectId(clientId),
    });

    return client || Promise.reject(['Client not found.']);
  }

  static async getClient(userId: string, clientId: string): Promise<Client> {
    const client = await this.clientRepository.findOne({
      user_id: new ObjectId(userId),
      client_id: clientId,
    });

    return client || Promise.reject(['Client not found.']);
  }

  static async createClient(userId: string, values: IRawClient): Promise<Client> {
    const errors = Client.validateClient(values);

    if (!!errors.length) return Promise.reject(errors);

    const { name, surname } = values;
    const clientId = name.slice(0, 2).toUpperCase() + surname.slice(0, 2).toUpperCase();

    const clientList = await this.clientRepository.find({
      where: { client_id: { $regex: new RegExp(`${clientId}[0-9]`) } },
      order: {
        client_id: -1,
      },
    });

    const [{ client_id = '' } = {}] = clientList;
    const [clientIdNumber] = client_id.split('').reverse();

    const number = client_id ? +clientIdNumber + 1 : 1;

    const client = new Client({
      ...values,
      user_id: new ObjectId(userId),
      client_id: `${clientId}${number}`,
    });

    return this.clientRepository.save(client);
  }

  static async updateClient(userId: string, clientId: string, values: IRawClient): Promise<Client> {
    const errors = Client.validateClient(values);

    if (!!errors.length) return Promise.reject(errors);

    const client = await this.getClient(userId, clientId);

    const { name, surname, address, phone } = values;

    client.name = name;
    client.surname = surname;
    client.address = address;
    client.phone = phone;

    return this.clientRepository.save(client);
  }

  static async deleteClient(userId: string, clientId: string): Promise<void> {
    const client = await this.getClient(userId, clientId);

    await LoanService.deleteClientLoans(userId, client.id?.toString() as string);
    await this.clientRepository.deleteOne({
      _id: client.id,
    });
  }
}
