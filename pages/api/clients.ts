import { flow } from 'lodash';
import type { NextApiResponse } from 'next';
import { ObjectID } from 'typeorm';
import { ISerializedClient } from '../../database/interfaces/IClient';
import { AuthorizedNextApiRequest } from '../../database/interfaces/ICommon';
import ClientService from '../../database/services/ClientService';
import ClientViewModel from '../../database/viewModel/ClientViewModel';
import { HttpMethods } from '../../enums/http';
import withApiErrorHandler from '../../middlewares/errorHandler';
import withJWTMiddleware from '../../middlewares/jwt';

const handler = async (
  req: AuthorizedNextApiRequest,
  res: NextApiResponse<ISerializedClient | Array<ISerializedClient>>,
): Promise<void> => {
  switch (req.method) {
    case HttpMethods.POST: {
      const {
        payload: { id },
      } = req.user;
      const client = await ClientService.createClient(id as ObjectID, req.body);

      return res.status(200).json(client.serialize());
    }

    case HttpMethods.GET: {
      const {
        payload: { id },
      } = req.user;
      const userId = id as ObjectID;
      const clientList = await ClientViewModel.searchClients(userId, req.query);

      return res.status(200).json(clientList);
    }
    default: {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
};

export default flow(withJWTMiddleware, withApiErrorHandler)(handler);
