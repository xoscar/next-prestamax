import { flow } from 'lodash';
import type { NextApiResponse } from 'next';
import ClientService from '../../../../../../server/repositories/Client.repository';
import { HttpMethods } from '../../../../../../constants/Http.constants';
import withApiErrorHandler from '../../../../../../server/middlewares/ErrorHandler.midleware';
import withJWTMiddleware from '../../../../../../server/middlewares/JWT.middleware';
import ChargeRepository from '../../../../../../server/repositories/Charge.repository';
import { AuthorizedNextApiRequest } from '../../../../../../server/types/Common.types';
import Charge from '../../../../../../models/Charge.model';

const handler = async (
  req: AuthorizedNextApiRequest,
  res: NextApiResponse<Charge>,
): Promise<void> => {
  const {
    payload: { id },
  } = req.auth;

  switch (req.method) {
    case HttpMethods.GET: {
      const { chargeId, clientId } = req.query;
      await ClientService.getClient(id?.toString() as string, clientId as string);
      const charge = await ChargeRepository.getCharge(chargeId as string);

      return res.status(200).json(charge);
    }

    case HttpMethods.PUT: {
      const { chargeId, clientId } = req.query;
      const client = await ClientService.getClient(id?.toString() as string, clientId as string);
      const charge = await ChargeRepository.updateCharge(client, chargeId as string, req.body);

      return res.status(200).json(charge);
    }

    case HttpMethods.DELETE: {
      const { clientId, chargeId } = req.query;
      await ClientService.getClient(id?.toString() as string, clientId as string);
      await ChargeRepository.deleteCharge(chargeId as string);

      return res.status(204).end();
    }

    default: {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
};

export default flow(withJWTMiddleware, withApiErrorHandler)(handler);
