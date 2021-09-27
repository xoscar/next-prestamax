import { flow } from 'lodash';
import type { NextApiResponse } from 'next';
import { ObjectID } from 'typeorm';
import { ISerializedCharge } from '../../../../database/interfaces/ICharge';
import { AuthorizedNextApiRequest } from '../../../../database/interfaces/ICommon';
import ChargeService from '../../../../database/services/ChargeService';
import ClientService from '../../../../database/services/ClientService';
import { HttpMethods } from '../../../../enums/http';
import withApiErrorHandler from '../../../../middlewares/errorHandler';
import withJWTMiddleware from '../../../../middlewares/jwt';

const handler = async (
  req: AuthorizedNextApiRequest,
  res: NextApiResponse<ISerializedCharge | Array<ISerializedCharge>>,
): Promise<void> => {
  switch (req.method) {
    case HttpMethods.GET: {
      const {
        payload: { id },
      } = req.user;
      const { clientId, paid } = req.query;
      const client = await ClientService.getClient(id as ObjectID, clientId as string);
      const charges = await ChargeService.getCharges({
        paid: paid === 'true',
        clientId: client.id as ObjectID,
      });

      return res.status(200).json(charges.map((charge) => charge.serialize()));
    }

    case HttpMethods.POST: {
      const {
        payload: { id },
      } = req.user;
      const { clientId } = req.query;
      const client = await ClientService.getClient(id as ObjectID, clientId as string);
      const charge = await ChargeService.createCharge(client, req.body);

      return res.status(200).json(charge.serialize());
    }

    default: {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
};

export default flow(withJWTMiddleware, withApiErrorHandler)(handler);
