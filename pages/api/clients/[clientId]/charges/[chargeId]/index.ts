import { flow } from 'lodash';
import type { NextApiResponse } from 'next';
import { ObjectID as TypedObjectID } from 'typeorm';
import { ObjectID } from 'mongodb';
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
      await ClientService.getClient(id as TypedObjectID, clientId as string);
      const charge = await ChargeService.getCharge(chargeId as unknown as TypedObjectID);

      return res.status(200).json(charge.serialize());
    }

    case HttpMethods.PUT: {
      const {
        payload: { id },
      } = req.user;
      const { chargeId, clientId } = req.query;
      const client = await ClientService.getClient(id as TypedObjectID, clientId as string);
      const charge = await ChargeService.updateCharge(client, new ObjectID(chargeId), req.body);

      return res.status(200).json(charge.serialize());
    }

    case HttpMethods.DELETE: {
      const {
        payload: { id },
      } = req.user;
      const { clientId, chargeId } = req.query;
      await ClientService.getClient(id as TypedObjectID, clientId as string);
      await ChargeService.deleteCharge(new ObjectID(chargeId));

      return res.status(204).end();
    }

    default: {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
};

export default flow(withJWTMiddleware, withApiErrorHandler)(handler);
