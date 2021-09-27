import { flow } from 'lodash';
import type { NextApiResponse } from 'next';
import { ObjectID as TypedObjectID } from 'typeorm';
import { ObjectID } from 'mongodb';
import { AuthorizedNextApiRequest } from '../../../../../../../../database/interfaces/ICommon';
import { HttpMethods } from '../../../../../../../../enums/http';
import withApiErrorHandler from '../../../../../../../../middlewares/errorHandler';
import withJWTMiddleware from '../../../../../../../../middlewares/jwt';
import PaymentService from '../../../../../../../../database/services/PaymentService';
import { ISerializedPayment } from '../../../../../../../../database/interfaces/IPayment';

const handler = async (
  req: AuthorizedNextApiRequest,
  res: NextApiResponse<ISerializedPayment | Array<ISerializedPayment>>,
): Promise<void> => {
  switch (req.method) {
    case HttpMethods.GET: {
      const {
        payload: { id },
      } = req.user;
      const { loanId, paymentId } = req.query;
      const payment = await PaymentService.getPayment(
        id as TypedObjectID,
        new ObjectID(loanId),
        new ObjectID(paymentId),
      );

      return res.status(200).json(payment.serialize());
    }

    case HttpMethods.PUT: {
      const {
        payload: { id },
      } = req.user;
      const { loanId, paymentId } = req.query;
      const payment = await PaymentService.updatePayment(
        id as TypedObjectID,
        new ObjectID(loanId),
        new ObjectID(paymentId),
        req.body,
      );

      return res.status(200).json(payment.serialize());
    }

    case HttpMethods.DELETE: {
      const {
        payload: { id },
      } = req.user;
      const { paymentId, loanId } = req.query;
      await PaymentService.deletePayment(
        id as TypedObjectID,
        new ObjectID(loanId),
        new ObjectID(paymentId),
      );

      return res.status(204).end();
    }

    default: {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
};

export default flow(withJWTMiddleware, withApiErrorHandler)(handler);
