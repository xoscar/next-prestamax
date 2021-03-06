import { flow } from 'lodash';
import type { NextApiResponse } from 'next';
import { AuthorizedNextApiRequest } from '../../../../../../database/interfaces/ICommon';
import { ISerializedPayment } from '../../../../../../database/interfaces/IPayment';
import ClientService from '../../../../../../database/services/ClientService';
import LoanService from '../../../../../../database/services/LoanService';
import { HttpMethods } from '../../../../../../enums/http';
import withApiErrorHandler from '../../../../../../middlewares/errorHandler';
import withJWTMiddleware from '../../../../../../middlewares/jwt';
import PaymentService from '../../../../../../database/services/PaymentService';

const handler = async (
  req: AuthorizedNextApiRequest,
  res: NextApiResponse<ISerializedPayment | Array<ISerializedPayment>>,
): Promise<void> => {
  switch (req.method) {
    case HttpMethods.GET: {
      const {
        payload: { id },
      } = req.user;
      const { loanId } = req.query;
      const loan = await LoanService.getLoan(id?.toString() as string, loanId as string);

      return res.status(200).json(loan.getPayments().map((payment) => payment.serialize()));
    }

    case HttpMethods.POST: {
      const {
        payload: { id },
      } = req.user;
      const { clientId, loanId } = req.query;
      await ClientService.getClient(id?.toString() as string, clientId as string);
      const payment = await PaymentService.createPayment(
        id?.toString() as string,
        loanId as string,
        req.body,
      );

      return res.status(200).json(payment.serialize());
    }

    default: {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
};

export default flow(withJWTMiddleware, withApiErrorHandler)(handler);
