import { flow } from 'lodash';
import type { NextApiResponse } from 'next';
import ClientService from '../../../../server/repositories/Client.repository';
import LoanService from '../../../../server/repositories/Loan.repository';
import { HttpMethods } from '../../../../constants/Http.constants';
import withApiErrorHandler from '../../../../server/middlewares/ErrorHandler.midleware';
import withJWTMiddleware from '../../../../server/middlewares/JWT.middleware';
import { AuthorizedNextApiRequest } from '../../../../server/types/Common.types';
import Loan from '../../../../models/Loan.model';

const handler = async (
  req: AuthorizedNextApiRequest,
  res: NextApiResponse<Loan>,
): Promise<void> => {
  switch (req.method) {
    case HttpMethods.POST: {
      const {
        payload: { id },
      } = req.auth;
      const { clientId } = req.query;
      const client = await ClientService.getClient(id?.toString() as string, clientId as string);
      const loan = await LoanService.createLoan(client, req.body);

      return res.status(200).json(loan);
    }

    default: {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
};

export default flow(withJWTMiddleware, withApiErrorHandler)(handler);
