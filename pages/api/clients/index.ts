import { flow } from 'lodash';
import type { NextApiResponse } from 'next';
import ClientRepository from '../../../server/repositories/Client.repository';
import { HttpMethods } from '../../../constants/Http.constants';
import withApiErrorHandler from '../../../server/middlewares/ErrorHandler.midleware';
import withJWTMiddleware from '../../../server/middlewares/JWT.middleware';
import { AuthorizedNextApiRequest } from '../../../server/types/Common.types';
import Client from '../../../models/Client.model';

const handler = async (
  req: AuthorizedNextApiRequest,
  res: NextApiResponse<Client>,
): Promise<void> => {
  switch (req.method) {
    case HttpMethods.POST: {
      const {
        payload: { id },
      } = req.auth;
      const client = await ClientRepository.createClient(id?.toString() as string, req.body);

      return res.status(200).json(client);
    }

    default: {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
};

export default flow(withJWTMiddleware, withApiErrorHandler)(handler);
