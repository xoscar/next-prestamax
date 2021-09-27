import { flow } from 'lodash';
import type { NextApiResponse } from 'next';
import { ObjectID as TypeObjectId } from 'typeorm';
import { ObjectID } from 'mongodb';
import { ISerializedCharge } from '../../../../../../database/interfaces/ICharge';
import { AuthorizedNextApiRequest } from '../../../../../../database/interfaces/ICommon';
import ChargeService from '../../../../../../database/services/ChargeService';
import ClientService from '../../../../../../database/services/ClientService';
import { HttpMethods } from '../../../../../../enums/http';
import withApiErrorHandler from '../../../../../../middlewares/errorHandler';
import withJWTMiddleware from '../../../../../../middlewares/jwt';

const handler = async (
  req: AuthorizedNextApiRequest,
  res: NextApiResponse<ISerializedCharge | Array<ISerializedCharge>>,
): Promise<void> => {
  switch (req.method) {
    case HttpMethods.POST: {
      const {
        payload: { id },
      } = req.user;
      const { clientId, chargeId } = req.query;
      const client = await ClientService.getClient(id as TypeObjectId, clientId as string);
      const charge = await ChargeService.payCharge(client, new ObjectID(chargeId));

      return res.status(200).json(charge.serialize());
    }

    default: {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
};

export default flow(withJWTMiddleware, withApiErrorHandler)(handler);
