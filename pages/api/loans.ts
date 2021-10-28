import { flow } from 'lodash';
import type { NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { AuthorizedNextApiRequest } from '../../database/interfaces/ICommon';
import { ISerializedLoan } from '../../database/interfaces/ILoan';
import { HttpMethods } from '../../enums/http';
import withApiErrorHandler from '../../middlewares/errorHandler';
import withJWTMiddleware from '../../middlewares/jwt';
import LoanViewModel from '../../database/viewModel/LoanViewModel';

const handler = async (
  req: AuthorizedNextApiRequest,
  res: NextApiResponse<ISerializedLoan | Array<ISerializedLoan>>,
): Promise<void> => {
  switch (req.method) {
    case HttpMethods.GET: {
      const {
        payload: { id },
      } = req.user;

      const loanList = await LoanViewModel.searchLoans(id as ObjectId, req.query);

      return res.status(200).json(loanList);
    }
    default: {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
};

export default flow(withJWTMiddleware, withApiErrorHandler)(handler);
