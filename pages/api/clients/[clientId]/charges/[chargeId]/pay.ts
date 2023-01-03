import { flow } from 'lodash';
import type { NextApiResponse } from 'next';
import ChargeRepository from '../../../../../../server/repositories/Charge.repository';
import ClientRepository from '../../../../../../server/repositories/Client.repository';
import { HttpMethods } from '../../../../../../constants/Http.constants';
import withApiErrorHandler from '../../../../../../server/middlewares/ErrorHandler.midleware';
import withJWTMiddleware from '../../../../../../server/middlewares/JWT.middleware';
import { AuthorizedNextApiRequest } from '../../../../../../server/types/Common.types';
import Charge from '../../../../../../models/Charge.model';

const handler = async (
  req: AuthorizedNextApiRequest,
  res: NextApiResponse<Charge>,
): Promise<void> => {
  switch (req.method) {
    case HttpMethods.POST: {
      const {
        payload: { id },
      } = req.auth;
      const { clientId, chargeId } = req.query;
      await ClientRepository.getClient(id?.toString() as string, clientId as string);
      const charge = await ChargeRepository.payCharge(chargeId as string);

      return res.status(200).json(charge);
    }

    default: {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
};

export default flow(withJWTMiddleware, withApiErrorHandler)(handler);
