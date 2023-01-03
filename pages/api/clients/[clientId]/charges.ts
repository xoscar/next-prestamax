import { flow } from 'lodash';
import type { NextApiResponse } from 'next';
import ChargeService from '../../../../server/repositories/Charge.repository';
import ClientService from '../../../../server/repositories/Client.repository';
import { HttpMethods } from '../../../../constants/Http.constants';
import withApiErrorHandler from '../../../../server/middlewares/ErrorHandler.midleware';
import withJWTMiddleware from '../../../../server/middlewares/JWT.middleware';
import { AuthorizedNextApiRequest } from '../../../../server/types/Common.types';
import Charge from '../../../../models/Charge.model';

const handler = async (
  req: AuthorizedNextApiRequest,
  res: NextApiResponse<Charge | Charge[]>,
): Promise<void> => {
  const {
    payload: { id },
  } = req.auth;

  switch (req.method) {
    case HttpMethods.GET: {
      const { clientId, paid } = req.query;
      const client = await ClientService.getClient(id?.toString() as string, clientId as string);
      const charges = await ChargeService.getCharges({
        paid: paid === 'true',
        clientId: client.id?.toString() as string,
      });

      return res.status(200).json(charges);
    }

    case HttpMethods.POST: {
      const { clientId } = req.query;
      const client = await ClientService.getClient(id?.toString() as string, clientId as string);
      const charge = await ChargeService.createCharge(client, req.body);

      return res.status(200).json(charge);
    }

    default: {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
};

export default flow(withJWTMiddleware, withApiErrorHandler)(handler);
