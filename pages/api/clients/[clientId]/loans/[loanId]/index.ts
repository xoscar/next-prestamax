import { flow } from 'lodash';
import type { NextApiResponse } from 'next';
import { ObjectID as TypedObjectID } from 'typeorm';
import { ObjectID } from 'mongodb';
import { AuthorizedNextApiRequest } from '../../../../../../database/interfaces/ICommon';
import { ISerializedLoan } from '../../../../../../database/interfaces/ILoan';
import ClientService from '../../../../../../database/services/ClientService';
import LoanService from '../../../../../../database/services/LoanService';
import { HttpMethods } from '../../../../../../enums/http';
import withApiErrorHandler from '../../../../../../middlewares/errorHandler';
import withJWTMiddleware from '../../../../../../middlewares/jwt';

const handler = async (
  req: AuthorizedNextApiRequest,
  res: NextApiResponse<ISerializedLoan | Array<ISerializedLoan>>,
): Promise<void> => {
  switch (req.method) {
    case HttpMethods.GET: {
      const {
        payload: { id },
      } = req.user;
      const { loanId } = req.query;
      const loan = await LoanService.getLoan(id as ObjectID, new ObjectID(loanId));

      return res.status(200).json(loan.serialize());
    }

    case HttpMethods.PUT: {
      const {
        payload: { id },
      } = req.user;
      const { loanId, clientId } = req.query;
      const client = await ClientService.getClient(id as TypedObjectID, clientId as string);
      const loan = await LoanService.updateLoan(client, new ObjectID(loanId), req.body);

      return res.status(200).json(loan.serialize());
    }

    case HttpMethods.DELETE: {
      const {
        payload: { id },
      } = req.user;
      const { clientId, loanId } = req.query;
      const client = await ClientService.getClient(id as TypedObjectID, clientId as string);
      await LoanService.deleteLoan(client.user_id as TypedObjectID, new ObjectID(loanId));

      return res.status(204).end();
    }

    default: {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
};

export default flow(withJWTMiddleware, withApiErrorHandler)(handler);
