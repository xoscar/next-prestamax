import Client, { FormDataClientType, RawClientType } from '../../records/Client';
import AuthenticatedClient from '../AuthenticatedClient';

const { get, post, getOne, put, remove } = AuthenticatedClient<FormDataClientType, RawClientType>(
  '/api/clients',
);

type ClientsClientType = {
  get(parameters: { search: string; pageNumber: number; pageSize: number }): Promise<Array<Client>>;
  getOne(clientId: string): Promise<Client>;
  create(values: FormDataClientType): Promise<Client>;
  update(clientId: string, values: FormDataClientType): Promise<Client>;
  remove(clientId: string): Promise<void>;
};

const ClientsClient: ClientsClientType = {
  async get({ search, pageNumber, pageSize }) {
    const { json: clientList } = await get<Array<RawClientType>>({
      queryParams: { search, pageNumber, pageSize },
    });

    return clientList.map((rawClient) => Client.createFromRawSearch(rawClient));
  },
  async getOne(clientId) {
    const { json: rawClient } = await getOne({
      id: clientId,
    });

    return Client.createFromRawSearch(rawClient);
  },
  async create(values) {
    const { json: rawClient } = await post({
      body: values,
    });

    return Client.createFromRawSearch(rawClient);
  },
  async update(clientId, values) {
    const { json: rawClient } = await put({
      body: values,
      id: clientId,
    });

    return Client.createFromRawSearch(rawClient);
  },
  async remove(clientId) {
    await remove({
      id: clientId,
    });

    return;
  },
};

export default ClientsClient;
