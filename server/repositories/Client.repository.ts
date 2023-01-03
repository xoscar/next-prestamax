import Client, { TPartialClient } from '../../models/Client.model';
import { PrismaClient } from '@prisma/client';
import prisma from '../utils/PrismaClient';
import { TSearchQuery, TSearchRepository } from '../types/Search.types';

export type ClientRepository = PrismaClient['client'] &
  TSearchRepository<Client> & {
    getClientById(id: string): Promise<Client>;
    getClient(userId: string, clientId: string): Promise<Client>;
    getClients(userId: string): Promise<Client[]>;
    createClient(userId: string, values: TPartialClient): Promise<Client>;
    updateClient(userId: string, clientId: string, values: TPartialClient): Promise<Client>;
    deleteClient(userId: string, clientId: string): Promise<void>;
  };

const ClientRepository = (): ClientRepository => ({
  ...prisma.client,
  async getClientById(id) {
    const client = await this.findFirst({
      where: { id },
      include: {
        loans: {
          orderBy: { created: 'desc' },
        },
        charges: {
          orderBy: { created: 'desc' },
        },
      },
    });

    return client ? Client(client) : Promise.reject(['Client not found.']);
  },

  async getClient(userId, id) {
    const client = await this.findFirst({
      where: {
        userId,
        id,
      },
      include: {
        loans: {
          orderBy: { created: 'desc' },
        },
        charges: {
          orderBy: { created: 'desc' },
        },
      },
    });

    return client ? Client(client) : Promise.reject(['Client not found.']);
  },

  async getClients(userId) {
    const clientList = await prisma.client.findMany({
      where: {
        userId,
      },
    });

    return clientList.map((client) => Client(client));
  },

  async createClient(userId: string, values: TPartialClient): Promise<Client> {
    const errors = Client.validate(values);

    if (!!errors.length) return Promise.reject(errors);

    const { name = '', surname = '' } = values;
    const clientId = name.slice(0, 2).toUpperCase() + surname.slice(0, 2).toUpperCase();

    const clientList = await this.findMany({
      where: { clientId: { contains: clientId, mode: 'insensitive' } },
      orderBy: { clientId: 'desc' },
    });

    const [lastClient = Client()] = clientList;

    const { clientId: lastClientId = '' } = lastClient;
    const [clientIdNumber] = lastClientId.split('').reverse();

    const number = lastClientId ? +clientIdNumber + 1 : 1;

    const client = Client({
      ...values,
      userId,
      clientId: `${clientId}${number}`,
    });

    const { loans, charges, id, ...save } = client;

    const rawClient = await this.create({ data: save });

    return Client(rawClient);
  },

  async updateClient(userId: string, clientId: string, values: TPartialClient): Promise<Client> {
    const errors = Client.validate(values);

    if (!!errors.length) return Promise.reject(errors);

    const client = await this.getClient(userId, clientId);

    const { name, surname, address, phone } = values;

    const rawClient = await this.update({
      where: { id: client.id },
      data: { name, surname, address, phone },
    });

    return Client(rawClient);
  },

  async deleteClient(userId: string, clientId: string): Promise<void> {
    const client = await this.getClient(userId, clientId);

    await this.delete({
      where: {
        id: client.id,
      },
    });
  },

  async search(userId: string, { take, skip, search }: TSearchQuery) {
    const clientList = await this.findMany({
      where: {
        userId,
        OR: [
          {
            clientId: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            surname: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },
      take,
      skip,
      orderBy: { created: 'desc' },
      include: {
        loans: {
          orderBy: { created: 'desc' },
        },
        charges: {
          orderBy: { created: 'desc' },
        },
      },
    });

    return clientList.map((rawClient) => Client(rawClient));
  },
});

export default ClientRepository();
