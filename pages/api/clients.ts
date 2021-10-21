import { flow } from 'lodash';
import { ObjectId } from 'mongodb';
import type { NextApiResponse } from 'next';
import { ISerializedClient } from '../../database/interfaces/IClient';
import { AuthorizedNextApiRequest } from '../../database/interfaces/ICommon';
import ClientService from '../../database/services/ClientService';
import ClientViewModel, { ClientResult } from '../../database/viewModel/ClientViewModel';
import { HttpMethods } from '../../enums/http';
import withApiErrorHandler from '../../middlewares/errorHandler';
import withJWTMiddleware from '../../middlewares/jwt';

const handler = async (
  req: AuthorizedNextApiRequest,
  res: NextApiResponse<ISerializedClient | Array<ISerializedClient> | ClientResult>,
): Promise<void> => {
  switch (req.method) {
    case HttpMethods.POST: {
      const {
        payload: { id },
      } = req.user;
      const client = await ClientService.createClient(id?.toString() as string, req.body);
      const stats = await ClientViewModel.getStatsForClient(client);

      return res.status(200).json({ ...client.serialize(), stats });
    }

    case HttpMethods.GET: {
      const {
        payload: { id },
      } = req.user;
      const clientList = await ClientViewModel.searchClients(id as ObjectId, req.query);

      return res.status(200).json(clientList);
    }
    default: {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
};

export default flow(withJWTMiddleware, withApiErrorHandler)(handler);
