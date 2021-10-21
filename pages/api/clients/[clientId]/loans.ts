import { flow } from 'lodash';
import type { NextApiResponse } from 'next';
import { AuthorizedNextApiRequest } from '../../../../database/interfaces/ICommon';
import { ISerializedLoan } from '../../../../database/interfaces/ILoan';
import ClientService from '../../../../database/services/ClientService';
import LoanService from '../../../../database/services/LoanService';
import { HttpMethods } from '../../../../enums/http';
import withApiErrorHandler from '../../../../middlewares/errorHandler';
import withJWTMiddleware from '../../../../middlewares/jwt';

const handler = async (
  req: AuthorizedNextApiRequest,
  res: NextApiResponse<ISerializedLoan | Array<ISerializedLoan>>,
): Promise<void> => {
  switch (req.method) {
    case HttpMethods.POST: {
      const {
        payload: { id },
      } = req.user;
      const { clientId } = req.query;
      const client = await ClientService.getClient(id?.toString() as string, clientId as string);
      const loan = await LoanService.createLoan(client, req.body);

      return res.status(200).json(loan.serialize());
    }

    default: {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
};

export default flow(withJWTMiddleware, withApiErrorHandler)(handler);
