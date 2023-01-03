import { flow } from 'lodash';
import type { NextApiResponse } from 'next';
import { HttpMethods } from '../../../../../../../../constants/Http.constants';
import withApiErrorHandler from '../../../../../../../../server/middlewares/ErrorHandler.midleware';
import withJWTMiddleware from '../../../../../../../../server/middlewares/JWT.middleware';
import Payment from '../../../../../../../../models/Payment.model';
import ClientRepository from '../../../../../../../../server/repositories/Client.repository';
import PaymentService from '../../../../../../../../server/repositories/Payment.repository';
import { AuthorizedNextApiRequest } from '../../../../../../../../server/types/Common.types';

const handler = async (
  req: AuthorizedNextApiRequest,
  res: NextApiResponse<Payment>,
): Promise<void> => {
  const {
    payload: { id },
  } = req.auth;

  switch (req.method) {
    case HttpMethods.GET: {
      const { loanId, paymentId } = req.query;
      const payment = await PaymentService.getPayment(
        id?.toString() as string,
        loanId as string,
        paymentId as string,
      );

      return res.status(200).json(payment);
    }

    case HttpMethods.PUT: {
      const { loanId, paymentId, clientId } = req.query;
      const client = await ClientRepository.getClient(id?.toString() as string, clientId as string);
      const payment = await PaymentService.updatePayment(
        client,
        loanId as string,
        paymentId as string,
        req.body,
      );

      return res.status(200).json(payment);
    }

    case HttpMethods.DELETE: {
      const { paymentId, loanId, clientId } = req.query;
      const client = await ClientRepository.getClient(id?.toString() as string, clientId as string);
      await PaymentService.deletePayment(client, loanId as string, paymentId as string);

      return res.status(204).end();
    }

    default: {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
};

export default flow(withJWTMiddleware, withApiErrorHandler)(handler);
