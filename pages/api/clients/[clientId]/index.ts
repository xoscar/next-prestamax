import { flow } from 'lodash';
import type { NextApiResponse } from 'next';
import { ObjectID } from 'typeorm';
import { ISerializedClient } from '../../../../database/interfaces/IClient';
import { AuthorizedNextApiRequest } from '../../../../database/interfaces/ICommon';
import ClientService from '../../../../database/services/ClientService';
import { HttpMethods } from '../../../../enums/http';
import withApiErrorHandler from '../../../../middlewares/errorHandler';
import withJWTMiddleware from '../../../../middlewares/jwt';

const handler = async (
  req: AuthorizedNextApiRequest,
  res: NextApiResponse<ISerializedClient | Array<ISerializedClient>>,
): Promise<void> => {
  switch (req.method) {
    case HttpMethods.GET: {
      const {
        payload: { id },
      } = req.user;
      const { clientId } = req.query;
      const client = await ClientService.getClient(id as ObjectID, clientId as string);

      return res.status(200).json(client.serialize());
    }

    case HttpMethods.PUT: {
      const {
        payload: { id },
      } = req.user;
      const { clientId } = req.query;
      const client = await ClientService.updateClient(id as ObjectID, clientId as string, req.body);

      return res.status(200).json(client.serialize());
    }

    case HttpMethods.DELETE: {
      const {
        payload: { id },
      } = req.user;
      const { clientId } = req.query;
      await ClientService.getClient(id as ObjectID, clientId as string);
      await ClientService.deleteClient(id as ObjectID, clientId as string);

      return res.status(204).end();
    }

    default: {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
};

export default flow(withJWTMiddleware, withApiErrorHandler)(handler);
