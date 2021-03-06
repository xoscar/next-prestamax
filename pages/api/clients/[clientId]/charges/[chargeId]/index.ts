import { flow } from 'lodash';
import type { NextApiResponse } from 'next';
import { AuthorizedNextApiRequest } from '../../../../../../database/interfaces/ICommon';
import ClientService from '../../../../../../database/services/ClientService';
import { HttpMethods } from '../../../../../../enums/http';
import withApiErrorHandler from '../../../../../../middlewares/errorHandler';
import withJWTMiddleware from '../../../../../../middlewares/jwt';
import ChargeService from '../../../../../../database/services/ChargeService';
import { ISerializedCharge } from '../../../../../../database/interfaces/ICharge';

const handler = async (
  req: AuthorizedNextApiRequest,
  res: NextApiResponse<ISerializedCharge>,
): Promise<void> => {
  switch (req.method) {
    case HttpMethods.GET: {
      const {
        payload: { id },
      } = req.user;
      const { chargeId, clientId } = req.query;
      await ClientService.getClient(id?.toString() as string, clientId as string);
      const charge = await ChargeService.getCharge(chargeId as string);

      return res.status(200).json(charge.serialize());
    }

    case HttpMethods.PUT: {
      const {
        payload: { id },
      } = req.user;
      const { chargeId, clientId } = req.query;
      const client = await ClientService.getClient(id?.toString() as string, clientId as string);
      const charge = await ChargeService.updateCharge(client, chargeId as string, req.body);

      return res.status(200).json(charge.serialize());
    }

    case HttpMethods.DELETE: {
      const {
        payload: { id },
      } = req.user;
      const { clientId, chargeId } = req.query;
      await ClientService.getClient(id?.toString() as string, clientId as string);
      await ChargeService.deleteCharge(chargeId as string);

      return res.status(204).end();
    }

    default: {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
};

export default flow(withJWTMiddleware, withApiErrorHandler)(handler);
