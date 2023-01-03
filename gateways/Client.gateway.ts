import Client, { TPartialClient } from '../models/Client.model';
import AuthenticatedClient from './clients/Authenticated.client';

const { get, post, getOne, put, remove } = AuthenticatedClient<TPartialClient, TPartialClient>(
  '/api/clients',
);

type TClientClient = {
  get(parameters: { search: string; pageNumber: number; pageSize: number }): Promise<Array<Client>>;
  getOne(clientId: string): Promise<Client>;
  create(values: TPartialClient): Promise<Client>;
  update(props: { clientId: string; values: TPartialClient }): Promise<Client>;
  remove(clientId: string): Promise<void>;
};

const ClientGateway: TClientClient = {
  async get({ search, pageNumber, pageSize }) {
    const { json: clientList } = await get<Array<TPartialClient>>({
      queryParams: { search, pageNumber, pageSize },
    });

    return clientList.map((rawClient) => Client(rawClient));
  },
  async getOne(clientId) {
    const { json: rawClient } = await getOne({
      id: clientId,
    });

    return Client(rawClient);
  },
  async create(values) {
    const { json: rawClient } = await post({
      body: values,
    });

    return Client(rawClient);
  },
  async update({ clientId, values }) {
    const { json: rawClient } = await put({
      body: values,
      id: clientId,
    });

    return Client(rawClient);
  },
  async remove(clientId) {
    await remove({
      id: clientId,
    });

    return;
  },
};

export default ClientGateway;
