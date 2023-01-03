import { flow } from 'lodash';
import type { NextApiResponse } from 'next';
import ClientRepository from '../../../../../../../server/repositories/Client.repository';
import LoanRepository from '../../../../../../../server/repositories/Loan.repository';
import { HttpMethods } from '../../../../../../../constants/Http.constants';
import withApiErrorHandler from '../../../../../../../server/middlewares/ErrorHandler.midleware';
import withJWTMiddleware from '../../../../../../../server/middlewares/JWT.middleware';
import PaymentRepository from '../../../../../../../server/repositories/Payment.repository';
import { AuthorizedNextApiRequest } from '../../../../../../../server/types/Common.types';
import Payment from '../../../../../../../models/Payment.model';

const handler = async (
  req: AuthorizedNextApiRequest,
  res: NextApiResponse<Payment | Payment[]>,
): Promise<void> => {
  const {
    payload: { id },
  } = req.auth;

  switch (req.method) {
    case HttpMethods.GET: {
      const { loanId } = req.query;
      const loan = await LoanRepository.getLoan(id?.toString() as string, loanId as string);

      return res.status(200).json(loan.payments);
    }

    case HttpMethods.POST: {
      const { clientId, loanId } = req.query;
      const client = await ClientRepository.getClient(id?.toString() as string, clientId as string);
      const payment = await PaymentRepository.createPayment(client, loanId as string, req.body);

      return res.status(200).json(payment);
    }

    default: {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
};

export default flow(withJWTMiddleware, withApiErrorHandler)(handler);
