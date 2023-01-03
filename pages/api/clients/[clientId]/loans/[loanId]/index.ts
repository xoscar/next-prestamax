import { flow } from 'lodash';
import type { NextApiResponse } from 'next';
import ClientRepository from '../../../../../../server/repositories/Client.repository';
import LoanRepository from '../../../../../../server/repositories/Loan.repository';
import { HttpMethods } from '../../../../../../constants/Http.constants';
import withApiErrorHandler from '../../../../../../server/middlewares/ErrorHandler.midleware';
import withJWTMiddleware from '../../../../../../server/middlewares/JWT.middleware';
import { AuthorizedNextApiRequest } from '../../../../../../server/types/Common.types';
import Loan from '../../../../../../models/Loan.model';

const handler = async (
  req: AuthorizedNextApiRequest,
  res: NextApiResponse<Loan>,
): Promise<void> => {
  const {
    payload: { id },
  } = req.auth;

  switch (req.method) {
    case HttpMethods.GET: {
      const { loanId } = req.query;
      const loan = await LoanRepository.getLoan(id?.toString() as string, loanId as string);

      return res.status(200).json(loan);
    }

    case HttpMethods.PUT: {
      const { loanId, clientId } = req.query;
      const client = await ClientRepository.getClient(id?.toString() as string, clientId as string);
      const loan = await LoanRepository.updateLoan(client, loanId as string, req.body);

      return res.status(200).json(loan);
    }

    case HttpMethods.DELETE: {
      const { clientId, loanId } = req.query;
      await ClientRepository.getClient(id?.toString() as string, clientId as string);
      await LoanRepository.deleteLoan(loanId as string);

      return res.status(204).end();
    }

    default: {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
};

export default flow(withJWTMiddleware, withApiErrorHandler)(handler);
