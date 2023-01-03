import { flow } from 'lodash';
import type { NextApiResponse } from 'next';
import ClientRepository from '../../../../server/repositories/Client.repository';
import { HttpMethods } from '../../../../constants/Http.constants';
import withApiErrorHandler from '../../../../server/middlewares/ErrorHandler.midleware';
import withJWTMiddleware from '../../../../server/middlewares/JWT.middleware';
import { AuthorizedNextApiRequest } from '../../../../server/types/Common.types';
import Client from '../../../../models/Client.model';

const handler = async (
  req: AuthorizedNextApiRequest,
  res: NextApiResponse<Client>,
): Promise<void> => {
  const {
    payload: { id },
  } = req.auth;

  switch (req.method) {
    case HttpMethods.GET: {
      const { clientId } = req.query;
      const client = await ClientRepository.getClient(id?.toString() as string, clientId as string);

      return res.status(200).json(client);
    }

    case HttpMethods.PUT: {
      const { clientId } = req.query;
      const client = await ClientRepository.updateClient(
        id?.toString() as string,
        clientId as string,
        req.body,
      );

      return res.status(200).json(client);
    }

    case HttpMethods.DELETE: {
      const { clientId } = req.query;
      await ClientRepository.getClient(id?.toString() as string, clientId as string);
      await ClientRepository.deleteClient(id?.toString() as string, clientId as string);

      return res.status(204).end();
    }

    default: {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
};

export default flow(withJWTMiddleware, withApiErrorHandler)(handler);
